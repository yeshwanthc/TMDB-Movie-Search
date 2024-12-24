import { type Movie } from "@/types/movies";
import { Card, CardContent } from "@/Components/ui/card";

interface MovieListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  if (!movies) {
    return (
      <p className="text-center text-muted-foreground mt-4">No movies found</p>
    );
  }

  return (
    <div className="space-y-2">
      {movies.map((movie) => (
        <Card key={movie.id}>
          <CardContent className="p-4">
            <div className="font-medium">{movie.title}</div>
            {movie.release_date && (
              <div className="text-sm text-muted-foreground">
                {new Date(movie.release_date).getFullYear()}
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {movie.overview}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
