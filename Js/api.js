const WATCHMODE_API_KEY = "ETql0PmOls46PHjCwmXNPNsOlxwNQHNPfTXVCBbR";
const OMDB_KEY = "a3d3c727";

async function fetchWithCache(url, cacheKey) {

    const cached =
        localStorage.getItem(cacheKey);

    if (cached) {

        const data = JSON.parse(cached);

        const age =
            Date.now() - data.timestamp;

        const oneDay =
            24 * 60 * 60 * 1000;

        if (age < oneDay)
            return data.value;
    }

    const response =
        await fetch(url);

    const value =
        await response.json();

    localStorage.setItem(
        cacheKey,
        JSON.stringify({
            timestamp: Date.now(),
            value
        })
    );

    return value;
}