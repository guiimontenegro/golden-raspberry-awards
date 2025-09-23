import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MoviesList from "../MoviesList";
import * as moviesApi from "../../../api/moviesApi";
import { describe, it, vi, beforeEach, expect } from "vitest";
import type { Movie, PaginatedResponse } from "../../../types";
import '@testing-library/jest-dom';

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockData: PaginatedResponse<Movie> = {
  content: [
    {
        id: 1, year: 2020, title: "Movie A", winner: true,
        studios: [],
        producers: []
    },
    {
        id: 2, year: 2021, title: "Movie B", winner: false,
        studios: [],
        producers: []
    },
  ],
  totalPages: 2,
  totalElements: 2,
  number: 0,
  size: 10,
};


describe("MoviesList", () => {
  it("renderiza filmes corretamente", async () => {
    vi.spyOn(moviesApi, "fetchMovies").mockResolvedValue(mockData);

    render(<MoviesList />);

    await waitFor(() => {
      expect(screen.getByText("Movie A")).toBeInTheDocument();
      expect(screen.getByText("Movie B")).toBeInTheDocument();
    });
  });

  it("filtra por ano corretamente", async () => {
    const spy = vi.spyOn(moviesApi, "fetchMovies").mockResolvedValue(mockData);
    render(<MoviesList />);
    const input = screen.getByPlaceholderText("Filter by year");
    fireEvent.change(input, { target: { value: "2020" } });

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(0, 10, 2020, undefined);
    });
  });

  it("filtra por winner corretamente", async () => {
    const spy = vi.spyOn(moviesApi, "fetchMovies").mockResolvedValue(mockData);
    render(<MoviesList />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "true" } });

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(0, 10, undefined, true);
    });
  });
});
