import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // para simular digitar e clicar
import Dashboard from "../../Dashboard";
import * as moviesApi from "../../../api/moviesApi";
import { describe, it, vi, beforeEach, expect } from "vitest";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Dashboard", () => {
  it("renderiza painéis corretamente", async () => {
    vi.spyOn(moviesApi, "fetchYearsWithMultipleWinners").mockResolvedValue({
      years: [{ year: 2020, winnerCount: 2 }],
    });

    vi.spyOn(moviesApi, "fetchStudiosWithWinCount").mockResolvedValue({
      studios: [{ name: "Studio A", winCount: 3 }],
    });

    vi.spyOn(moviesApi, "fetchMaxMinWinIntervalForProducers").mockResolvedValue({
      min: [],
      max: [],
    });

    vi.spyOn(moviesApi, "fetchWinnersByYear").mockResolvedValue([
      {
        id: 1,
        year: 2020,
        title: "Movie A",
        studios: [],
        producers: [],
        winner: true,
      },
    ]);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Golden Raspberry Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Studio A")).toBeInTheDocument();
      expect(screen.getByText("2020")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search by year");
    await userEvent.type(input, "2020");
    const button = screen.getByRole("button", { name: /Buscar/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Movie A")).toBeInTheDocument();
    });
  });
});
