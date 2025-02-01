import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Movies = () => {
  useEffect(() => {
    document.body.classList.add("bg-dark", "text-light");
    return () => {
      document.body.classList.remove("bg-dark", "text-light");
    };
  }, []);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const searchMovies = async (query, pageNum, reset = false) => {
    const url = query
      ? `${import.meta.env.VITE_API_BASE_URL}/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${query}&page=${pageNum}`
      : `${import.meta.env.VITE_API_BASE_URL}/movie/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }&page=${pageNum}`;

    try {
      setIsLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      setMovies((prev) => (reset ? data.results : [...prev, ...data.results]));
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle initial load and search
  useEffect(() => {
    setPage(1);
    searchMovies(searchTerm, 1, true);
  }, [searchTerm]);

  // Handle load more
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    searchMovies(searchTerm, page + 1);
  };

  return (
    <div className="container mt-4 bg-dark text-light min-vh-100">
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-4">
          <input
            type="text"
            className="form-control bg-white border-secondary"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {movies.map((movie) => (
          <div
            key={`${movie.id}-${movies.indexOf(movie)}`}
            className="col mb-4"
          >
            <div
              className="card h-100 shadow bg-secondary text-light"
              style={{
                background:
                  "linear-gradient(to right, #1a1a1a, #2d2d2d, #404040)",
              }}
            >
              <img
                src={
                  movie.poster_path
                    ? `${import.meta.env.VITE_IMAGE_BASE_URL}${
                        movie.poster_path
                      }`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                className="card-img-top"
                alt={movie.title}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-white fw-bold">{movie.title}</h5>
                <p className="card-text text-info fw-bold">
                  {movie.release_date}
                  <span className="float-end text-white">
                    ⭐ {movie.vote_average}
                  </span>
                </p>
                <p className="card-text text-light">
                  {movie.overview.substring(0, 100)}...
                </p>
              </div>
              <div className="card-footer bg-dark text-light d-flex justify-content-center">
                <Link
                  to={`/movie/${movie.id}`}
                  className="btn btn-primary w-50"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="text-center my-4">
          <ClipLoader color="#0d6efd" size={50} />
        </div>
      )}

      {!hasMore && (
        <div className="text-center my-4 text-light">
          No more movies to load
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="text-center my-4">
          <button
            className="btn btn-info bg-gradient text-dark fw-bold"
            onClick={handleLoadMore}
          >
            Load More Movies...
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
