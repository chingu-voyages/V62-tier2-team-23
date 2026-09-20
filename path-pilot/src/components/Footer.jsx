import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="padding-block-700 bg-neutral-900 text-neutral-100">
            <div className="footerContainer">
                <div className="even-columns">
                    <div>
                        <Link to="/">
                            <img
                                src="src/images/logo.png"
                                alt="pathPilot logo"
                        /></Link>
                        <Link to="/">
                            <p className="text-decoration:none text-neutral-100">| Github Repo</p>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}