
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

    document.getElementById(
        "moviePlot"
    ).textContent =
        movie.Plot;

    document.getElementById(
        "moviePoster"
    ).src =
        movie.Poster;

    document.getElementById(
        "playerFrame"
    ).src =
        `https://embedmaster.link/movie/${imdbID}`;

})();