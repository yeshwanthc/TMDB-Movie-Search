"use client";

import { useState } from "react";
import { type Movie } from "@/types/movies";
import { SearchForm } from "@/Components/SearchForm";
import { MovieList } from "@/Components/MovieList";
import { formatQueryParam } from "@/app/lib/utils";

export default function TMDBSearch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //api key from .env.local file
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleSearch = async (query: string) => {
    if (!query) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formattedQuery = formatQueryParam(query);

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${formattedQuery}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">TMDB Movie Search</h1>
      <SearchForm onSearch={handleSearch} isLoading={loading} />
      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}
