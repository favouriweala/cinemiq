"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCinemiqMovie, CinemiqMovie } from "../lib/cinemiq";

interface Props {
  id: number;
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function readFavorites(): CinemiqMovie[] {
  try {
    const raw = localStorage.getItem("cinemiqFavorites");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CinemiqMovie[];
  } catch {
    return [];
  }
}

function writeFavorites(items: CinemiqMovie[]) {
  try {
    localStorage.setItem("cinemiqFavorites", JSON.stringify(items));
  } catch {
    // ignore
  }
}

export default function CinemiqMovieDetails({ id }: Props) {
  const { data, loading, error } = useCinemiqMovie(id);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    try {
      const favs = readFavorites();
      setSaved(favs.some((m) => m.id === id));
    } catch {
      setSaved(false);
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!data) return;

    const favs = readFavorites();
    const exists = favs.some((m) => m.id === data.id);

    if (exists) {
      const filtered = favs.filter((m) => m.id !== data.id);
      writeFavorites(filtered);
      setSaved(false);
    } else {
      // store a trimmed movie object
      const toSave: CinemiqMovie = {
        id: data.id,
        title: data.title,
        poster_path: data.poster_path,
        release_date: data.release_date,
        overview: data.overview,
        vote_average: data.vote_average,
      };
      writeFavorites([toSave, ...favs]);
      setSaved(true);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-300">Loading movie…</div>;
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-400">Error loading movie: {error}</p>
      </div>
    );
  }

  if (!data) {
    return <div className="py-20 text-center text-slate-300">Movie not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div className="col-span-1">
        <div className="w-full rounded-lg overflow-hidden bg-slate-800">
          {data.poster_path ? (
            <div className="relative w-full h-0" style={{ paddingBottom: "150%" }}>
              <Image
                src={`${IMAGE_BASE}${data.poster_path}`}
                alt={data.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-slate-400">No image</div>
          )}
        </div>
      </div>

      <div className="col-span-2">
        <h1 className="text-2xl font-bold text-white">{data.title}</h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-slate-400">
          <div>Release: {data.release_date ?? "—"}</div>
          <div>Rating: {data.vote_average?.toFixed(1) ?? "—"}</div>
        </div>

        <p className="mt-4 text-slate-200 leading-relaxed">{data.overview}</p>

        <div className="mt-6">
          <button
            onClick={toggleFavorite}
            aria-pressed={saved}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            {saved ? "Remove from Favorites" : "Save to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
