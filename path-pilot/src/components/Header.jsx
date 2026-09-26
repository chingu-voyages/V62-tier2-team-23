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
              <button className="button | display-sm-none display-md-inline-flex">
                <Link to="/">Home</Link>
              </button>
            </ul>
          </nav>
          <button className="button | display-sm-none display-md-inline-flex">
            Login
          </button>
          <button className="button | display-sm-none display-md-inline-flex">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
