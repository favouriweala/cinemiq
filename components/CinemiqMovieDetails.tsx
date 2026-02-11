"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCinemiqMovie } from "../lib/cinemiq.client";
import type { CinemiqMovie } from "../lib/cinemiq";

// style: convert movie details to styled-components (responsive, mobile-first)
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

const Wrapper = styled.div`
  max-width: 920px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 320px 1fr;
    align-items: start;
  }
`;

const PosterCard = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg,#071427,#071725);
  box-shadow: 0 6px 24px rgba(2,6,23,0.45);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 8px;
`;

const Meta = styled.div`
  margin-top: 6px;
  color: #9fb0c8;
  font-size: 0.95rem;
  display: flex;
  gap: 16px;
`;

const Overview = styled.p`
  margin-top: 16px;
  color: #dbeefc;
  line-height: 1.6;
`;

const FavoriteButton = styled.button`
  margin-top: 18px;
  padding: 10px 14px;
  border-radius: 10px;
  background: linear-gradient(90deg,#4f46e5,#7c3aed);
  color: white;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(124,58,237,0.2); }
`;

const LoadingState = styled.div`
  padding: 5rem 0;
  text-align: center;
  color: #9fb0c8;
  font-weight: 500;
`;

const ErrorState = styled.div`
  padding: 5rem 0;
  text-align: center;
  color: #ff7b7b;
  font-weight: 600;
`;

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
    return <LoadingState>Loading movie…</LoadingState>;
  }

  if (error) {
    return (
      <ErrorState>
        Error loading movie: {error}
      </ErrorState>
    );
  }

  if (!data) {
    return <LoadingState>Movie not found.</LoadingState>;
  }

  return (
    <Wrapper>
      <PosterCard>
        {data.poster_path ? (
          <div style={{ position: "relative", width: "100%", paddingBottom: "150%" }}>
            <Image src={`${IMAGE_BASE}${data.poster_path}`} alt={data.title} fill style={{ objectFit: "cover" }} />
          </div>
        ) : (
          <div style={{ width: "100%", height: 320, display: "flex", alignItems: "center", justifyContent: "center", color: "#9fb0c8" }}>No image</div>
        )}
      </PosterCard>

      <div>
        <Title>{data.title}</Title>
        <Meta>
          <div>Release: {data.release_date ?? "—"}</div>
          <div>Rating: {data.vote_average?.toFixed(1) ?? "—"}</div>
        </Meta>

        <Overview>{data.overview}</Overview>

        <FavoriteButton onClick={toggleFavorite} aria-pressed={saved}>
          {saved ? "Remove from Favorites" : "Save to Favorites"}
        </FavoriteButton>
      </div>
    </Wrapper>
  );
}
