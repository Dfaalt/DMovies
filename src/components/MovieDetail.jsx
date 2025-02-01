import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Badge } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import MovieTrailer from "./MovieTrailer";
import MovieCast from "./MovieCast";

const MovieDetail = () => {
  useEffect(() => {
    document.body.classList.add("bg-dark", "text-light");
    return () => {
      document.body.classList.remove("bg-dark", "text-light");
    };
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/movie/${id}?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );

        if (!response.ok) {
          throw new Error("Movie not found");
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <ClipLoader color="#0d6efd" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h3>Error: {error}</h3>
        <Button onClick={() => navigate("/")} variant="primary">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <Container className="bg-dark text-light py-4 min-vh-100">
      <Button
        onClick={() => navigate(-1)}
        variant="outline-light"
        className="mb-4"
      >
        &larr; Back
      </Button>

      <Row
        className="bg-secondary bg-opacity-25 p-4 rounded shadow-sm"
        style={{
          background: "linear-gradient(to right, #1a1a1a, #2d2d2d, #404040)",
        }}
      >
        <Col md={4}>
          <img
            src={
              movie.poster_path
                ? `${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            className="img-fluid rounded border border-light mb-2"
            alt={movie.title}
          />
        </Col>

        <Col md={8}>
          <h1 className="mb-3 text-light fw-bold">{movie.title}</h1>
          <div className="mb-3">
            <Badge bg="dark" className="me-2 text-light">
              Release Date: {movie.release_date}
            </Badge>
            <Badge bg="dark" className="me-2 text-warning">
              ⭐ {movie.vote_average}/10
            </Badge>
            <Badge bg="dark" className="text-info">
              Runtime: {movie.runtime} mins
            </Badge>
          </div>

          {/* <h4 className="mt-3 text-light">Genres</h4> */}
          <div className="mb-4">
            {movie.genres.map((genre) => (
              <Badge key={genre.id} bg="light" className="me-2 text-dark">
                {genre.name}
              </Badge>
            ))}
          </div>

          <h4 className="mt-3 text-light">Production Companies</h4>
          <div className="mb-3">
            <Row className="g-3">
              {movie.production_companies.map((company) => (
                <Col xs={6} md={4} lg={3} key={company.id}>
                  <div className="d-flex flex-column align-items-center text-center">
                    {company.logo_path ? (
                      <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}${
                          company.logo_path
                        }`}
                        alt={company.name}
                        className="img-fluid mb-2 bg-light p-1 rounded"
                        style={{ maxHeight: "50px", width: "auto" }}
                      />
                    ) : (
                      <div className="mb-2 text-light opacity-75">
                        [No Logo]
                      </div>
                    )}
                    <span className="small text-light">{company.name}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <h4 className="text-light mt-4">Overview</h4>
          <p className="lead text-light">{movie.overview}</p>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary text-light"
            >
              Official Website
            </a>
          )}

          {/* Movie Trailer */}
          <MovieTrailer movieId={id} />
        </Col>

        {/* Movie Cast */}
        <div className="mt-3">
          <MovieCast movieId={id} />
        </div>
      </Row>
    </Container>
  );
};

export default MovieDetail;
