import { Link, useLocation } from "react-router-dom";
import "./index.css";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="Navigation">
      <div className="Navigation__container">
        <div className="Navigation__title">🎤 노래방 탐색기 🎵</div>
        <div className="Navigation__tabs">
          <Link
            to="/"
            className={`Navigation__link ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            <span className="Navigation__icon">🔍</span>
            <span className="Navigation__text">검색</span>
          </Link>
          <Link
            to="/liked"
            className={`Navigation__link ${
              location.pathname === "/liked" ? "active" : ""
            }`}
          >
            <span className="Navigation__icon">❤️</span>
            <span className="Navigation__text">좋아요</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
