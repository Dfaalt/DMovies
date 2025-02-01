import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
      }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          DfaaltMovies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white fw-bold"
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noreferrer"
              >
                About TMDB API
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
