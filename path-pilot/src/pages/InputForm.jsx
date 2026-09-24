import { useState } from "react";
export default function InputForm() {
    const [careerGoal, setCareerGoal] = useState("");
    const [SkillLevel, setSkillLevel] = useState("");

    const [studyTime, setStudyTime] = useState("");
    const [studyTimeUnit, setStudyTimeUnit] = useState("");

    const [timeframe, setTimeframe] = useState("");
    const [timeframeUnit, setTimeframeUnit] = useState("");

    const [error, setError] = useState("");
    const [skillError, setSkillError] = useState("");
    const [studyTimeError, setStudyTimeError] = useState("");
    const [timeframeError, setTimeframeError] = useState("");
    function handleSubmit(e) {
        e.preventDefault();

        let isValid = true;

        const goal = careerGoal.trim();
        const hours = Number(studyTime);
        const duration = Number(timeframe);

        // Clear previous messages before checking this submission.
        setError("");
        setSkillError("");
        setStudyTimeError("");
        setTimeframeError("");

        // 1. Career Goal
        if (goal === "") {
            setError("Please enter a career goal.");
            isValid = false;
        } else if (goal.length < 2 || goal.length > 50) {
            setError("Career goal must be between 2 and 50 characters.");
            isValid = false;
        }

        // 2. Skill Level
        if (!["Beginner", "Intermediate", "Advanced"].includes(SkillLevel)) {
            setSkillError("Please select your current skill level.");
            isValid = false;
        }

        // 3. Available Study Time
        if (studyTime.trim() === "") {
            setStudyTimeError("Please enter your available study time.");
            isValid = false;
        } else if (!Number.isInteger(hours) || hours < 1) {
            setStudyTimeError("Study time must be a whole number of at least 1.");
            isValid = false;
        } else if (!["hours/day", "hours/week"].includes(studyTimeUnit)) {
            setStudyTimeError("Please select a study time unit.");
            isValid = false;
        } else if (studyTimeUnit === "hours/day" && hours > 24) {
            setStudyTimeError("Study time cannot exceed 24 hours per day.");
            isValid = false;
        } else if (studyTimeUnit === "hours/week" && hours > 168) {
            setStudyTimeError("Study time cannot exceed 168 hours per week.");
            isValid = false;
        }

        // 4. Target Timeframe
        if (timeframe.trim() === "") {
            setTimeframeError("Please enter your target timeframe.");
            isValid = false;
        } else if (!Number.isInteger(duration) || duration < 1) {
            setTimeframeError("Timeframe must be a whole number of at least 1.");
            isValid = false;
        } else if (!["days", "weeks", "months", "years"].includes(timeframeUnit)) {
            setTimeframeError("Please select a timeframe unit.");
            isValid = false;
        }

        // Stop here if any field failed validation.
        if (!isValid) {
            return;
        }
        const userData = {
            careerGoal: goal,
            skillLevel: SkillLevel,
            studyTime: hours,
            studyTimeUnit,
            timeframe: duration,
            timeframeUnit,
        };
        // Only reached when every field is valid and print the object.
        console.log("Form is valid!", userData);

        const userDataJSON =JSON.stringify(userData);

    }

    return (
        <main className="container-fluid min-vh-100 d-flex justify-content-center align-items-start py-5 bg-light">
            <section className="card shadow-sm border-0 rounded-4 w-100" style={{ maxWidth: "650px" }}>
                <div className="card-body p-4 p-md-5">

                    <form onSubmit={handleSubmit} noValidate>

                        <div className="mb-4">
                            <h2 className="fw-bold mb-2">Tell us about your goals</h2>
                            <p className="text-muted mb-0">
                                Let us create a personalized learning path for you.
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Career Goal:
                            </label>

                            <input
                                className={`form-control ${error ? "is-invalid" : ""}`}
                                type="text"
                                placeholder="e.g. Frontend Developer, Data scientist"
                                value={careerGoal}
                                onChange={(e) => setCareerGoal(e.target.value)}
                            />

                            {error && (
                                <div className="invalid-feedback">
                                    {error}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Current Skill Level
                            </label>

                            <select
                                className={`form-select ${skillError ? "is-invalid" : ""}`}
                                value={SkillLevel}
                                onChange={(e) => setSkillLevel(e.target.value)}
                            >
                                <option value="">
                                    Select your current skill level
                                </option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>

                            {skillError && (
                                <div className="invalid-feedback">
                                    {skillError}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Available Study Time
                            </label>

                            <div className="row g-2">
                                <div className="col-md-5">
                                    <input
                                        className={`form-control ${studyTimeError ? "is-invalid" : ""}`}
                                        type="number"
                                        min="1"
                                        placeholder="e.g. 5"
                                        value={studyTime}
                                        onChange={(e) => setStudyTime(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-7">
                                    <select
                                        className={`form-select ${studyTimeError ? "is-invalid" : ""}`}
                                        value={studyTimeUnit}
                                        onChange={(e) => setStudyTimeUnit(e.target.value)}
                                    >
                                        <option value="">Select unit</option>
                                        <option value="hours/day">Hours per day</option>
                                        <option value="hours/week">Hours per week</option>
                                    </select>
                                </div>
                            </div>

                            {studyTimeError && (
                                <div className="text-danger small mt-1">
                                    {studyTimeError}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Target Timeframe
                            </label>

                            <div className="row g-2">
                                <div className="col-md-5">
                                    <input
                                        className={`form-control ${timeframeError ? "is-invalid" : ""}`}
                                        type="number"
                                        min="1"
                                        placeholder="e.g. 3"
                                        value={timeframe}
                                        onChange={(e) => setTimeframe(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-7">
                                    <select
                                        className={`form-select ${timeframeError ? "is-invalid" : ""}`}
                                        value={timeframeUnit}
                                        onChange={(e) => setTimeframeUnit(e.target.value)}
                                    >
                                        <option value="">Select unit</option>
                                        <option value="days">Days</option>
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                        <option value="years">Years</option>
                                    </select>
                                </div>
                            </div>

                            {timeframeError && (
                                <div className="text-danger small mt-1">
                                    {timeframeError}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-info text-white w-100 fw-semibold py-2"
                        >
                            Generate My Learning Path
                        </button>

                    </form>

                </div>
            </section>
        </main>
    );
}