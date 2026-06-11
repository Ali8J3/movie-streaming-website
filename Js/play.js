const params =
    new URLSearchParams(
        window.location.search
    );

const imdbID =
    params.get("imdb");

const loadingScreen =
    document.getElementById(
        "loadingScreen"
    );

function showLoading() {

    loadingScreen?.classList.remove(
        "hidden"
    );

    document
        .getElementById(
            "header-container"
        )
        ?.classList.add("hidden");

    document
        .getElementById(
            "container"
        )
        ?.classList.add("hidden");
}

function hideLoading() {

    loadingScreen?.classList.add(
        "hidden"
    );

    document
        .getElementById(
            "header-container"
        )
        ?.classList.remove("hidden");

    document
        .getElementById(
            "container"
        )
        ?.classList.remove("hidden");
}

(async function init() {

    showLoading();

    try {

        if (!imdbID)
            return;

        const movie =
            await getMovie();

        console.log(movie);

        document.getElementById(
            "BG-Poster"
        ).src =
            movie.Poster;

        document.getElementById(
            "watchBtn"
        ).href =
            `stream.html?imdb=${imdbID}`;

        document.title =
            movie.Title;

        document.getElementById(
            "movieTitle"
        ).textContent =
            movie.Title;

        document.getElementById(
            "rating"
        ).textContent =
            `${movie.imdbRating}/10`;

        let faPlot;

        try {

            faPlot =
                await translateText(
                    movie.Plot
                );

        } catch {

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

        await renderSeries(
            movie
        );

        loadComments();

    }
    catch(error) {

        console.error(error);

    }
    finally {

        setTimeout(
            hideLoading,
            500
        );

    }

})();

async function getMovie() {

    return await fetchWithCache(
        `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}&plot=full`,
        `movie_${imdbID}`
    );

}

async function translateText(text) {

    const key =
        `plot_fa_${imdbID}`;

    const cached =
        localStorage.getItem(key);

    if (cached)
        return cached;

    const response =
        await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fa&dt=t&q=${encodeURIComponent(text)}`
        );

    const data = await response.json();

    const translated =
        data?.[0]?.map(part => part?.[0]).join("") || text;

    localStorage.setItem(
        key,
        translated
    );

    return translated;
}

const commentsKey =
    `comments_${imdbID}`;

function loadComments() {

    const comments =
        JSON.parse(
            localStorage.getItem(commentsKey)
        ) || [];

    const list =
        document.getElementById(
            "commentsList"
        );

    list.innerHTML = "";

    comments.forEach(text => {

        const div =
            document.createElement("div");

        div.className =
            "comment";

        div.textContent =
            text;

        list.appendChild(div);

    });

}

document.getElementById(
    "commentBtn"
).addEventListener("click", () => {

    const input =
        document.getElementById(
            "commentInput"
        );

    const value =
        input.value.trim();

    if (!value) return;

    const comments =
        JSON.parse(
            localStorage.getItem(commentsKey)
        ) || [];

    comments.unshift(value);

    localStorage.setItem(
        commentsKey,
        JSON.stringify(comments)
    );

    input.value = "";

    loadComments();

});

loadComments();

async function getSeason(seasonNumber) {

    return await fetchWithCache(

        `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}&Season=${seasonNumber}`,

        `season_${imdbID}_${seasonNumber}`
    );

}

async function renderSeries(movie) {

    if (movie.Type !== "series")
        return;

    document.getElementById(
        "seriesSection"
    ).style.display = "block";

    const container =
        document.getElementById(
            "seasonsContainer"
        );

    container.innerHTML = "";

    const totalSeasons =
        parseInt(movie.totalSeasons || 1);

    for (
        let season = 1;
        season <= totalSeasons;
        season++
    ) {

        const seasonData =
            await getSeason(season);

        const seasonBox =
            document.createElement("div");

        seasonBox.className =
            "season-box";

        seasonBox.innerHTML = `
            <div class="season-title">
                فصل ${season}
            </div>

            <div
                class="episodes"
                id="episodes_${season}"
            ></div>
        `;

        container.appendChild(
            seasonBox
        );

        const episodesContainer =
            document.getElementById(
                `episodes_${season}`
            );

        seasonData.Episodes?.forEach(
            episode => {

                const link =
                    document.createElement(
                        "a"
                    );

                link.className =
                    "episode-btn";

                link.textContent =
                    `قسمت ${episode.Episode}`;

                link.href =
                    `stream.html?imdb=${imdbID}&season=${season}&episode=${episode.Episode}`;

                episodesContainer.appendChild(
                    link
                );

            }
        );
    }

}