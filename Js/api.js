const WATCHMODE_API_KEY = "ETql0PmOls46PHjCwmXNPNsOlxwNQHNPfTXVCBbR";

// Default -> Fetch Data From API
async function getWatchmodeMovie(id) {

    try {

        const response = await fetch(
            `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${WATCHMODE_API_KEY}`
        );

        if (!response.ok)
            throw new Error();

        return await response.json();

    }
    catch {

        return null;

    }
}

// FallBack -> Find Data Locally
async function getCachedMovie(id) {

    const cacheKey =
        `watchmode_${id}`;

    const cached =
        localStorage.getItem(cacheKey);

    if (cached)
        return JSON.parse(cached);

    const movie =
        await getWatchmodeMovie(id);

    if (movie) {

        localStorage.setItem(
            cacheKey,
            JSON.stringify(movie)
        );

    }

    return movie;
}