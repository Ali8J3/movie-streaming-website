const params = new URLSearchParams(window.location.search);

const type = params.get("type") || "movie";

const wrapper = document.querySelector(".list-wrapper");

async function getTitles() {

    let query = "";

    if (type === "movie") {

        query =
            "types=movie";

    } else {

        query =
            "types=tv_series";

    }

    const data =
        await fetchWithCache(
            `https://api.watchmode.com/v1/list-titles/?apiKey=${WATCHMODE_API_KEY}&${query}&limit=40`,
            `list_${type}`
        );

    return data.titles || [];

}

async function getPoster(imdbID) {

    if (!imdbID)
        return "https://placehold.co/300x450";

    const data =
        await fetchWithCache(
            `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}`,
            `poster_${imdbID}`
        );

    return data?.Poster &&
        data.Poster !== "N/A"
            ? data.Poster
            : "https://placehold.co/300x450";
}

(async () => {

    document.title =
        type === "movie"
            ? "New Movies"
            : "New Series";

    const titles =
        await getTitles();

    wrapper.innerHTML = "";

    for (const movie of titles) {

        const poster =
            await getPoster(
                movie.imdb_id
            );

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "movie-card";

        card.innerHTML = `
            <img
                src="${poster}"
                alt="${movie.title}"
            >

            <div class="movie-title">
                ${movie.title}
            </div>
        `;

        card.onclick = () => {

            location.href =
                `play.html?imdb=${movie.imdb_id}`;

        };

        wrapper.appendChild(card);

    }

})();