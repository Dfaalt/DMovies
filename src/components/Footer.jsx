import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-4">
      <div className="container">
        <div className="row g-4">
          {/* About Section */}
          <div className="col-md-4">
            <h5 className="text-warning">DMovies</h5>
            <p className="text-secondary">
              Your premier destination for exploring the world of movies.
              Discover new releases, classics, and everything in between.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/" className="text-white text-decoration-none">
                  (Coming Soon)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-5">
            <h5 className="text-warning">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaEnvelope className="me-2 text-primary" />
                <a
                  href="mailto:dfaalt1101@gmail.com"
                  className="text-white text-decoration-none"
                >
                  info@dmovies.com
                </a>
              </li>
              <li className="mb-2">
                <FaPhone className="me-2 text-primary" />
                <span className="text-white">+62...</span>
              </li>
              <li className="mt-3">
                <a
                  href="https://github.com/Dfaalt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white me-3"
                >
                  <FaGithub size={25} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ilham-maulana1101/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <FaLinkedin size={25} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top border-secondary mt-4 pt-3">
          <p className="text-center text-secondary mb-0">
            © {new Date().getFullYear()} DMovies. All rights reserved.
            <br />
            Powered by TMDB API
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
