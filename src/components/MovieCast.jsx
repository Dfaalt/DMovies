import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/movie/${movieId}/credits?api_key=${import.meta.env.VITE_API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to load cast");
        const data = await response.json();

        // Ambil 10 cast member pertama
        const mainCast = data.cast.slice(0, 10);
        setCast(mainCast);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <ClipLoader color="#0d6efd" size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4">Error loading cast: {error}</div>
    );
  }

  if (cast.length === 0) {
    return (
      <div className="alert alert-info mt-4">No cast information available</div>
    );
  }

  return (
    <div className="mt-4">
      <h4>Top Cast</h4>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {cast.map((member) => (
          <div key={member.id} className="col">
            <div className="card h-100 shadow-sm bg-dark bg-gradient text-light">
              <img
                src={
                  member.profile_path
                    ? `${import.meta.env.VITE_IMAGE_BASE_URL}${
                        member.profile_path
                      }`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                className="card-img-top"
                alt={member.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6 className="card-title mb-0">{member.name}</h6>
                <p className="card-text text-light small mt-1">
                  as {member.character || "Unknown"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
