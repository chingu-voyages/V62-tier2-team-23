import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="primary-header">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/">
            <img
              className="site-logo"
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

          <div className="nav-actions">
            <nav
              className="primary-navigation"
              id="primary-navigation"
            >
              <ul
                aria-label="Primary"
                role="list"
                className="nav-list"
              >
                <li>
                  <Link to="/" className="button | display-sm-none display-md-inline-flex">
                    Home
                  </Link>
                </li>
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
      </div>
    </header>
  );
}