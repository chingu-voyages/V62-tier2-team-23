export function validateLearningPathInput({
    careerGoal,
    skillLevel,
    studyTime,
    studyTimeUnit,
    timeframe,
    timeframeUnit,
}) {
    let isValid = true;

    const errors = {
        careerGoal: "",
        skillLevel: "",
        studyTime: "",
        timeframe: "",
    };

    const goal = careerGoal.trim();
    const hours = Number(studyTime);
    const duration = Number(timeframe);

    // Career Goal
    if (goal === "") {
        errors.careerGoal = "Please enter a career goal.";
        isValid = false;
    } else if (goal.length < 2 || goal.length > 50) {
        errors.careerGoal =
            "Career goal must be between 2 and 50 characters.";
        isValid = false;
    }

    // Skill Level
    if (!["Beginner", "Intermediate", "Advanced"].includes(skillLevel)) {
        errors.skillLevel = "Please select your current skill level.";
        isValid = false;
    }

    // Study Time
    if (studyTime.trim() === "") {
        errors.studyTime = "Please enter your available study time.";
        isValid = false;
    } else if (!Number.isInteger(hours) || hours < 1) {
        errors.studyTime =
            "Study time must be a whole number of at least 1.";
        isValid = false;
    } else if (!["hours/day", "hours/week"].includes(studyTimeUnit)) {
        errors.studyTime = "Please select a study time unit.";
        isValid = false;
    } else if (studyTimeUnit === "hours/day" && hours > 24) {
        errors.studyTime = "Study time cannot exceed 24 hours per day.";
        isValid = false;
    } else if (studyTimeUnit === "hours/week" && hours > 168) {
        errors.studyTime = "Study time cannot exceed 168 hours per week.";
        isValid = false;
    }

    // Timeframe
    if (timeframe.trim() === "") {
        errors.timeframe = "Please enter your target timeframe.";
        isValid = false;
    } else if (!Number.isInteger(duration) || duration < 1) {
        errors.timeframe =
            "Timeframe must be a whole number of at least 1.";
        isValid = false;
    } else if (!["days", "weeks", "months", "years"].includes(timeframeUnit)) {
        errors.timeframe = "Please select a timeframe unit.";
        isValid = false;
    }

    const userData = isValid
        ? {
              careerGoal: goal,
              skillLevel,
              studyTime: hours,
              studyTimeUnit,
              timeframe: duration,
              timeframeUnit,
          }
        : null;

    return {
        isValid,
        errors,
        userData,
    };
}