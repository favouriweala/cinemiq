import { env } from "process";
const TMDB_BASE = "https://api.themoviedb.org/3";

export interface CinemiqMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string;
  vote_average: number;
}

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  if (!key) throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
  return key;
}

function mapToCinemiqMovie(m: any): CinemiqMovie {
  return {
    id: Number(m.id),
    title: m.title ?? m.name ?? "",
    poster_path: m.poster_path ?? null,
    release_date: m.release_date ?? m.first_air_date ?? null,
    overview: m.overview ?? "",
    vote_average: Number(m.vote_average ?? 0),
  };
}

/**
 * Fetch trending movies from TMDB.
 * Throws on fatal errors; otherwise returns an array of `CinemiqMovie`.
 */
export async function fetchCinemiqTrending(): Promise<CinemiqMovie[]> {
  const key = getApiKey();
  const url = `${TMDB_BASE}/trending/movie/day?api_key=${encodeURIComponent(key)}`;

  const res = await fetch(url);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`TMDB fetch error (${res.status}): ${msg}`);
  }

  const json = await res.json();
  if (!json || !Array.isArray(json.results)) return [];
  return json.results.map(mapToCinemiqMovie);
}

/**
 * Fetch a single movie by TMDB id.
 * Throws on fatal errors; otherwise returns `CinemiqMovie`.
 */
export async function fetchCinemiqMovieById(id: number): Promise<CinemiqMovie> {
  if (!id || Number.isNaN(Number(id))) throw new Error("Invalid movie id");
  const key = getApiKey();
  const url = `${TMDB_BASE}/movie/${encodeURIComponent(String(id))}?api_key=${encodeURIComponent(
    key
  )}`;

  const res = await fetch(url);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`TMDB fetch error (${res.status}): ${msg}`);
  }

  const json = await res.json();
  return mapToCinemiqMovie(json);
}

/**
 * Fetch top-rated movies from TMDB.
 * Throws on fatal errors; otherwise returns an array of `CinemiqMovie`.
 */
export async function fetchCinemiqTopRated(): Promise<CinemiqMovie[]> {
  const key = getApiKey();
  const url = `${TMDB_BASE}/movie/top_rated?api_key=${encodeURIComponent(key)}`;

  const res = await fetch(url);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`TMDB fetch error (${res.status}): ${msg}`);
  }

  const json = await res.json();
  if (!json || !Array.isArray(json.results)) return [];
  return json.results.map(mapToCinemiqMovie);
}
