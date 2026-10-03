import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="primary-header">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/">
            <img
              src="src/images/logo.png"
              alt="logo"
            />
          </Link>
          <button
            className="mobile-nav-toggle"
            aria-controls="primary-navigation"
            aria-expanded="false"
          >
            <img
              className="icon-hamburger"
              src="images/icon-hamburger.svg"
              alt=""
              aria-hidden="true"
            />
            <img
              className="icon-close"
              src="images/icon-close.svg"
              alt=""
              aria-hidden="true"
            />
            <span className="visually-hidden">
              Menu
            </span>
          </button>
          <nav
            className="primary-navigation"
            id="primary-navigation"
          >
            <ul
              aria-label="Primary"
              role="list"
              className="nav-list"
            >
              <Link to="/" className="button | display-sm-none display-md-inline-flex">
                Home
              </Link>
            </ul>
          </nav>
          <Link to="/login" className="button | display-sm-none display-md-inline-flex">
            Login
          </Link>
          <Link to="/signup" className="button | display-sm-none display-md-inline-flex">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
