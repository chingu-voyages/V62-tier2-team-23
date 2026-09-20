
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <main>
        <section className="padding-block-900">
            <div className="container">
                <div className="even-columns">
                    <div className="flow">
                        <h1 className="fs-primary-heading fw-bold">
                            Turn Your Goals into a
                            Personalized Learning
                            Journey
                        </h1>
                        <p>
                            Use AI for a
                            step-by-step learning
                            path that fits your
                            goals, curent skills and
                            schedule. Obtain a
                            bespoken plan and reach
                            your career goals
                            faster.
                        </p>
                        <Link to="/inputForm" className="button">
                            Generate Your Learning
                            Path
                        </Link>
                    </div>
                    <div>
                        <img
                            src="/src/images/groupPhoto.png"
                            alt="groupPhoto"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="carousel | padding-block-700">
            <h2
            className="fs-secondary-heading fw-bold"
            >
            Your Learning Path
            </h2>
            
            {/* Carousel here */}
            <div className="carousel-container">
            
                {/* Slides */}
                <div className="carousel-slide">
                    <img src="src/images/yourGoal.png" alt="your goal" />
                </div>
                
                <div className="carousel-slide">
                    <img src="src/images/yourSkill.png" alt="your skill" />
                </div>
                
                <div className="carousel-slide">
                    <img src="src/images/aiGuidance.png" alt="ai ai guidance" />
                </div>

                <div className="carousel-slide">
                    <img src="src/images/yourPath.png" alt="your path" />
                </div>
            </div>
        </section>
    </main>
    )
}