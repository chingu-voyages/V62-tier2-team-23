import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="padding-block-700 bg-neutral-900 text-neutral-100">
            <div className="container footer-inner">
                <Link to="/">
                    <img
                        className="footer-logo"
                        src="src/images/logo.png"
                        alt="pathPilot logo"
                    />
                </Link>

                <span className="footer-divider" aria-hidden="true"></span>

                <Link to="https://github.com/chingu-voyages/V62-tier2-team-23" className="footer-link">
                    Github Repo
                </Link>
            </div>
        </footer>
    );
}