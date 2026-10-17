import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        const name = username.trim();
        const newErrors = { username: "", password: "" };

        if (name === "") {
            newErrors.username = "Please enter your username.";
        }

        if (password === "") {
            newErrors.password = "Please enter your password.";
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
        if (hasErrors) {
            return;
        }

        // LocalStorage here WEAAaaaaaaaaaaaaaaM
        console.log("Login is valid!", { username: name });
        navigate("/");
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <h1 className="auth-title fw-bold mb-2">Welcome back</h1>
                        <p className="auth-subtitle text-muted mb-0">
                            Log in to pick up your learning path where you left off.
                        </p>
                    </div>

                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="loginUsername" className="form-label fw-semibold">
                            Username
                        </label>
                        <input
                            id="loginUsername"
                            className={`form-control auth-input ${errors.username ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="Your username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label fw-semibold">
                            Password
                        </label>
                        <input
                            id="loginPassword"
                            className={`form-control auth-input ${errors.password ? "is-invalid" : ""}`}
                            type={showPassword ? "text" : "password"}
                            placeholder="Your password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    {/* Show password */}
                    <div className="form-check mb-4">
                        <input
                            id="loginShowPassword"
                            className="form-check-input"
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                        />
                        <label htmlFor="loginShowPassword" className="form-check-label small">
                            Show password
                        </label>
                    </div>

                    <button type="submit" className="button auth-submit">
                        Log in
                    </button>

                    <p className="auth-footer-text text-muted small mb-0">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </section>
        </main>
    );
}