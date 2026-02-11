"use client";

import { useEffect, useState } from "react";
import type { CinemiqMovie } from "./cinemiq";
import { fetchCinemiqTrending, fetchCinemiqMovieById } from "./cinemiq";

type ApiResult<T> = {
  data?: T;
  error?: string;
  loading: boolean;
};

export function useCinemiqTrending() {
  const [state, setState] = useState<ApiResult<CinemiqMovie[]>>({ loading: true });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true });

    fetchCinemiqTrending()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false });
      })
      .catch((err: any) => {
        if (!cancelled) setState({ error: err?.message ?? String(err), loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useCinemiqMovie(id?: number | null) {
  const [state, setState] = useState<ApiResult<CinemiqMovie>>({ loading: Boolean(id) });

  useEffect(() => {
    if (!id) {
      setState({ loading: false, data: undefined });
      return;
    }

    let cancelled = false;
    setState({ loading: true });

    fetchCinemiqMovieById(id)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false });
      })
      .catch((err: any) => {
        if (!cancelled) setState({ error: err?.message ?? String(err), loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
