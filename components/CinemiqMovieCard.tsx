import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { CinemiqMovie } from "../lib/cinemiq";

// style: add hover effect to CinemiqMovieCard
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

interface Props {
  movie: CinemiqMovie;
  className?: string;
}

const Card = styled.article`
  width: 100%;
  max-width: 220px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg,#071427, #071725);
  color: #e6eef8;
  box-shadow: 0 6px 18px rgba(2,6,23,0.45);
  transition: transform 240ms cubic-bezier(.2,.9,.2,1), box-shadow 240ms ease, opacity 160ms ease;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 18px 50px rgba(2,6,23,0.6);
  }
`;

const Poster = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 150%;
  background: linear-gradient(180deg,#0b1220, #071425);
`;

const Content = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h3`
  font-size: 1rem;
  line-height: 1.2;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Meta = styled.div`
  font-size: 0.85rem;
  color: #9fb0c8;
`;

const DetailsLink = styled.span`
  display: inline-block;
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: linear-gradient(90deg,#2563eb,#7c3aed);
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(124,58,237,0.28);
  }
`;

export default function CinemiqMovieCard({ movie, className }: Props) {
  const posterSrc = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : undefined;

  return (
    <Card className={className} aria-label={movie.title}>
      <Poster>
        {posterSrc ? (
          <Image
            src={posterSrc}
            alt={movie.title}
            fill
            sizes="(max-width: 480px) 100vw, 220px"
            style={{ objectFit: "cover" }}
          />
        ) : null}
      </Poster>

      <Content>
        <Title>{movie.title}</Title>
        <Meta>{movie.release_date ?? "Unknown release"}</Meta>

        <Link href={`/movie/${movie.id}`}>
          <DetailsLink>View Details</DetailsLink>
        </Link>
      </Content>
    </Card>
  );
}
