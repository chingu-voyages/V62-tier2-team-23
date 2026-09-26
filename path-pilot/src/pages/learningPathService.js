export async function generateLearningPath(userData) {

    // 1. Send userData to API

    // 2. Check if response succeeded

    // 3. Convert response to JSON

    // 4. Validate response structure

    // 5. Return generated learning path


    const response = await fetch("/api/generate-path", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data;
}
