import { Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import MovieDetail from "./components/MovieDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;