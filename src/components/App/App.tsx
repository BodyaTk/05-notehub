import { useState } from 'react';
import Loader from '../Loader/Loader';
import SearchBar from '../SearchBar/SearchBar';
import { getMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import toast from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [arrFilms, setArrFilms] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const fetchArrFilms = async (searchFilms: string) => {
    try {
      setIsLoader(true);
      setIsError(false);
      const newArrFilms = await getMovies(searchFilms);
      if (newArrFilms.length === 0) {
        toast.error('No movies found for your request.');
      }

      setArrFilms(newArrFilms);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={fetchArrFilms} />
      {isLoader && <Loader />}
      {isError && <ErrorMessage />}
      {arrFilms.length > 0 && (
        <MovieGrid movies={arrFilms} onSelect={movie => setSelectedMovie(movie)} />
      )}
      {selectedMovie && <MovieModal onClose={() => setSelectedMovie(null)} movie={selectedMovie} />}
    </>
  );
}
