import { describe, it, expect, vi, beforeEach } from "vitest";
import type { PaginatedResponse, Movie } from "../../types";
import {
  fetchMovies,
  fetchYearsWithMultipleWinners,
  fetchStudiosWithWinCount,
  fetchMaxMinWinIntervalForProducers,
  fetchWinnersByYear,
} from "../moviesApi";

interface FetchMockResponse<T> extends Response {
  json: () => Promise<T>;
  ok: boolean;
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("moviesApi", () => {
  const mockPaginatedMovies: PaginatedResponse<Movie> = {
    content: [
      {
        id: 171,
        year: 2013,
        title: "Movie 43",
        winner: true,
        studios: [],
        producers: [],
      },
      {
        id: 172,
        year: 2013,
        title: "After Earth",
        winner: false,
        studios: [],
        producers: [],
      },
    ],
    totalPages: 1,
    totalElements: 2,
    number: 0,
    size: 10,
  };

  it("fetchMovies chama a API com parâmetros corretos", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockPaginatedMovies,
    } as FetchMockResponse<PaginatedResponse<Movie>>);

    const result = await fetchMovies(0, 10, 2013, true);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("page=0&size=10&year=2013&winner=true")
    );
    expect(result).toEqual(mockPaginatedMovies);
  });

  it("fetchMovies lança erro quando res.ok é falso", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as FetchMockResponse<unknown>);

    await expect(fetchMovies()).rejects.toThrow("Erro ao buscar filmes");
  });

  it("fetchYearsWithMultipleWinners retorna dados", async () => {
    const data = { years: [{ year: 2020, winnerCount: 2 }] };
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => data,
    } as FetchMockResponse<typeof data>);

    const result = await fetchYearsWithMultipleWinners();
    expect(result).toEqual(data);
  });

  it("fetchStudiosWithWinCount retorna dados", async () => {
    const data = { studios: [{ name: "Studio A", winCount: 3 }] };
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => data,
    } as FetchMockResponse<typeof data>);

    const result = await fetchStudiosWithWinCount();
    expect(result).toEqual(data);
  });

  it("fetchMaxMinWinIntervalForProducers retorna dados", async () => {
    const data = { min: [], max: [] };
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => data,
    } as FetchMockResponse<typeof data>);

    const result = await fetchMaxMinWinIntervalForProducers();
    expect(result).toEqual(data);
  });

  it("fetchWinnersByYear retorna dados", async () => {
    const data = [
      {
        id: 171,
        year: 2013,
        title: "Movie 43",
        studios: [],
        producers: [],
        winner: true,
      },
      {
        id: 172,
        year: 2013,
        title: "After Earth",
        studios: [],
        producers: [],
        winner: false,
      },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => data,
    } as FetchMockResponse<typeof data>);

    const result = await fetchWinnersByYear(2013);
    expect(result).toEqual(data);
  });
});
