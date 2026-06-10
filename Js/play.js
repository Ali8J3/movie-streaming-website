
const params =
    new URLSearchParams(
        window.location.search
    );

const imdbID =
    params.get("imdb");

async function getMovie() {

    return await fetchWithCache(
        `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}&plot=full`,
        `movie_${imdbID}`
    );

}

(async () => {

    if (!imdbID) return;

    const movie =
        await getMovie();

    document.title =
        movie.Title;

    document.getElementById(
        "movieTitle"
    ).textContent =
        movie.Title;

    document.getElementById(
        "movieMeta"
    ).textContent =
        `${movie.Year} • ${movie.Runtime} • ${movie.imdbRating}`;

        
    let faPlot;

    try {

        faPlot =
            await translateText(movie.Plot);

    } catch (error) {

        console.error(
            "Translation failed:",
            error
        );

        faPlot =
            movie.Plot;
    }

    document.getElementById(
        "moviePlot"
    ).textContent =
       faPlot;

    document.getElementById(
        "moviePoster"
    ).src =
        movie.Poster;

    // document.getElementById(
    //     "playerFrame"
    // ).src =
    //     `https://embedmaster.link/movie/${imdbID}`;

})();

async function translateText(text) {

    const response =
        await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fa`
        );

    if (!response.ok) {

        throw new Error(
            `HTTP ${response.status}`
        );

    }

    const data =
        await response.json();

    if (
        !data.responseData ||
        !data.responseData.translatedText
    ) {

        throw new Error(
            "Invalid translation response"
        );

    }

    return data.responseData.translatedText;
}