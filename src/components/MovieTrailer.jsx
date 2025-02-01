import { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

const MovieTrailer = ({ movieId }) => {
  const [trailers, setTrailers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/movie/${movieId}/videos?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        )
        
        if (!response.ok) throw new Error('Failed to load trailers')
        const data = await response.json()
        
        const youtubeTrailers = data.results.filter(
          video => video.site === 'YouTube' && video.type === 'Trailer'
        )
        
        setTrailers(youtubeTrailers)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTrailers()
  }, [movieId])

  if (loading) {
    return (
      <div className="text-center my-4">
        <ClipLoader color="#0d6efd" size={30} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4">
        Error loading trailers: {error}
      </div>
    )
  }

  if (trailers.length === 0) {
    return (
      <div className="alert alert-info mt-4">
        No trailers available for this movie
      </div>
    )
  }

  return (
    <div className="mt-4">
      <h4>Trailer</h4>
      <div className="ratio ratio-16x9">
        <iframe
          src={`https://www.youtube.com/embed/${trailers[0].key}`}
          title="YouTube trailer"
          allowFullScreen
          className="rounded shadow"
        ></iframe>
      </div>

      {trailers.length > 1 && (
        <div className="row mt-3 g-3">
          {trailers.slice(1).map((trailer) => (
            <div key={trailer.id} className="col-md-6">
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube trailer"
                  allowFullScreen
                  className="rounded shadow"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieTrailer