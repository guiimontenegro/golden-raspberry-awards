import type { Movie, PaginatedResponse } from "../types";

const BASE_URL = "https://challenge.outsera.tech/api/movies";

export async function fetchMovies(
  page = 0,
  size = 10,
  year?: number,
  winner?: boolean
): Promise<PaginatedResponse<Movie>> {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  if (year) params.append("year", String(year));
  if (winner !== undefined) params.append("winner", String(winner));

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error("Erro ao buscar filmes");
  return res.json();
}

export async function fetchYearsWithMultipleWinners() {
  const res = await fetch(`${BASE_URL}/yearsWithMultipleWinners`);
  return res.json();
}

export async function fetchStudiosWithWinCount() {
  const res = await fetch(`${BASE_URL}/studiosWithWinCount`);
  return res.json();
}

export async function fetchMaxMinWinIntervalForProducers() {
  const res = await fetch(`${BASE_URL}/maxMinWinIntervalForProducers`);
  return res.json();
}

export async function fetchWinnersByYear(year: number) {
  const res = await fetch(`${BASE_URL}/winnersByYear?year=${year}`);
  return res.json();
}
