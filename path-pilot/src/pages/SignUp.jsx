import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        const name = username.trim();
        const newErrors = { username: "", password: "", confirmPassword: "" };

        if (name === "") {
            newErrors.username = "Please enter a username.";
        } else if (name.length < 3 || name.length > 20) {
            newErrors.username = "Username must be between 3 and 20 characters.";
        }

        if (password === "") {
            newErrors.password = "Please enter a password.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }

        if (confirmPassword === "") {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
        if (hasErrors) {
            return;
        }

        
        console.log("Sign up is valid!", { username: name });
        // localStorage stuff here Weaaaaaaaaaaam
        navigate("/"); 
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <h1 className="auth-title fw-bold mb-2">Create your account</h1>
                        <p className="auth-subtitle text-muted mb-0">
                            Sign up to save your learning path and track your progress.
                        </p>
                    </div>

                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fw-semibold">
                            Username
                        </label>
                        <input
                            id="username"
                            className={`form-control auth-input ${errors.username ? "is-invalid" : ""}`}
                            type="text"
                            placeholder="e.g. pathpilot_user"
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
                        <label htmlFor="password" className="form-label fw-semibold">
                            Password
                        </label>
                        <input
                            id="password"
                            className={`form-control auth-input ${errors.password ? "is-invalid" : ""}`}
                            type={showPassword ? "text" : "password"}
                            placeholder="At least 8 characters"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    {/* Confirm password */}
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label fw-semibold">
                            Confirm password
                        </label>
                        <input
                            id="confirmPassword"
                            className={`form-control auth-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                            type={showPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && (
                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                        )}
                    </div>

                    {/* Show password */}
                    <div className="form-check mb-4">
                        <input
                            id="showPassword"
                            className="form-check-input"
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                        />
                        <label htmlFor="showPassword" className="form-check-label small">
                            Show passwords
                        </label>
                    </div>

                    <button type="submit" className="button auth-submit">
                        Register
                    </button>

                    <p className="auth-footer-text text-muted small mb-0">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </form>
            </section>
        </main>
    );
}