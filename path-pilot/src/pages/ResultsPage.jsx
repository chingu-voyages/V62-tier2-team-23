import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const STATUS = {
    completed: { label: "Completed", badge: "bg-success", marker: "bg-success" },
    "in-progress": { label: "In progress", badge: "bg-primary", marker: "bg-primary" },
    "not-started": { label: "Not started", badge: "bg-secondary", marker: "bg-secondary" },
};

function StatusMarker({ status, number }) {
    return (
        <span
            className={`d-inline-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0 ${STATUS[status].marker}`}
            style={{ width: "28px", height: "28px", fontSize: "0.8rem" }}
            aria-hidden="true"
        >
            {status === "completed" ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M3 8.5l3.5 3.5L13 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                number
            )}
        </span>
    );
}

function RightArrow() {
    return (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ResultsPage() {
    const { state } = useLocation();
    const [completedIds, setCompletedIds] = useState([]);
    const pageStyle = { backgroundColor: "#e8f3ff", minHeight: "70vh" };

    // Opened directly without generating a path first
    if (!state || !state.steps) {
        return (
            <main
                className="container-fluid d-flex justify-content-center align-items-start py-5"
                style={pageStyle}
            >
                <section
                    className="card border-0 rounded-4 shadow-sm w-100 bg-white"
                    style={{ maxWidth: "650px" }}
                >
                    <div className="card-body p-4 text-center">
                        <h2 className="fw-bold fs-5 mb-3">No learning path yet</h2>
                        <Link to="/inputForm" className="button">
                            Generate Your Learning Path
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    const { userData } = state;

    // Works out each step's status from which ones have been completed, if any.
    const firstOpen = state.steps.find((s) => !completedIds.includes(s.id));
    const steps = state.steps.map((step) => {
        let status = "not-started";
        if (completedIds.includes(step.id)) status = "completed";
        else if (firstOpen && step.id === firstOpen.id) status = "in-progress";
        return { ...step, status };
    });

    const completedCount = completedIds.length;
    const percent = Math.round((completedCount / steps.length) * 100);

    function toggleStep(id) {
        setCompletedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    return (
        <main
            className="container-fluid d-flex justify-content-center align-items-start py-5"
            style={pageStyle}
        >
            <section
                className="card border-0 rounded-4 shadow-sm w-100 bg-white"
                style={{ maxWidth: "650px" }}
            >
                <div className="card-body p-4">
                    {/* Progress summary */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="fw-bold mb-0 text-primary-400" style={{ maxWidth: "none", opacity: 1 }}>
                            {completedCount} of {steps.length} steps completed
                        </p>
                        <p className="fw-bold mb-0 text-primary-400" style={{ maxWidth: "none", opacity: 1 }}>
                            {percent}% completed
                        </p>
                    </div>

                    <div
                        className="progress mb-4"
                        role="progressbar"
                        aria-label="Learning path progress"
                        aria-valuenow={percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ height: "6px" }}
                    >
                        <div
                            className="progress-bar"
                            style={{ width: `${percent}%`, backgroundColor: "var(--clr-accent-400)" }}
                        />
                    </div>

                    {/* Goal summary */}
                    <div className="border rounded-2 p-3 mb-4 d-flex justify-content-between align-items-center gap-3 flex-wrap">
                        <div>
                            <h2 className="fw-bold fs-6 mb-1">{userData.careerGoal}</h2>
                            <p className="small fw-semibold mb-0" style={{ maxWidth: "none" }}>
                                {userData.skillLevel}, {userData.studyTime} {userData.studyTimeUnit}
                            </p>
                        </div>

                        <Link to="/inputForm" className="button">
                            Generate New Path
                        </Link>
                    </div>

                    {/* Steps */}
                    <h3 className="fw-bold fs-6 mb-1">Your Learning Path</h3>
                    <p className="small text-muted mb-3" style={{ maxWidth: "none" }}>
                        Click a step to mark it as complete.
                    </p>

                    <ol className="list-unstyled d-grid gap-3 mb-0">
                        {steps.map((step) => {
                            const { label, badge } = STATUS[step.status];
                            const isDone = step.status === "completed";

                            return (
                                <li key={step.id}>
                                    <button
                                        type="button"
                                        className="btn w-100 text-start border rounded-2 px-3 py-3 d-flex align-items-center gap-3"
                                        onClick={() => toggleStep(step.id)}
                                        aria-pressed={isDone}
                                        aria-current={step.status === "in-progress" ? "step" : undefined}
                                    >
                                        <StatusMarker status={step.status} number={step.id} />

                                        <span className="fw-semibold flex-grow-1 small">
                                            <span className="me-3">{step.id}.</span>
                                            {step.title}
                                        </span>

                                        <span className={`badge ${badge} fw-semibold`}>{label}</span>

                                        <span className="text-muted d-inline-flex" style={{ width: "12px" }}>
                                            {isDone && <RightArrow />}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>
        </main>
    );
}