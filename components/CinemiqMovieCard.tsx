import Image from "next/image";
import Link from "next/link";
import { CinemiqMovie } from "../lib/cinemiq";

interface Props {
  movie: CinemiqMovie;
  className?: string;
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function CinemiqMovieCard({ movie, className }: Props) {
  const posterSrc = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : undefined;

  return (
    <article
      className={`w-56 rounded-lg overflow-hidden bg-slate-900 text-slate-50 shadow-lg transform transition-transform duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl flex flex-col ${className ?? ""}`}
      aria-label={movie.title}
    >
      <div className="relative w-full h-80 bg-gradient-to-b from-slate-800 to-slate-900">
        {posterSrc ? (
          <Image
            src={posterSrc}
            alt={movie.title}
            fill
            sizes="(max-width: 480px) 100vw, 220px"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
        <div className="text-xs text-slate-400">{movie.release_date ?? "Unknown release"}</div>

        <Link href={`/movie/${movie.id}`} className="mt-2 inline-block px-3 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow hover:-translate-y-0.5 transition-transform">
          View Details
        </Link>
      </div>
    </article>
  );
}
