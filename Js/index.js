async function getList(typeQuery, cacheKey) {

    const url =
        `https://api.watchmode.com/v1/list-titles/?apiKey=${WATCHMODE_API_KEY}&${typeQuery}&limit=10`;

    const res = await fetchWithCache(url, cacheKey);

    return res.titles || [];
}

async function enrichWithPosters(list) {

    return Promise.all(
        list.map(async (item) => {

            const imdb = item.imdb_id;

            if (!imdb) {
                return {
                    ...item,
                    poster: null
                };
            }

            const omdbUrl =
                `https://www.omdbapi.com/?i=${imdb}&apikey=${OMDB_KEY}`;

            const data =
                await fetchWithCache(omdbUrl, `omdb_${imdb}`);

            return {
                ...item,
                poster:
                    data?.Poster && data.Poster !== "N/A"
                        ? data.Poster
                        : null
            };
        })
    );
}

async function getMovies() {
    const list = await getList("types=movie", "movies");
    return enrichWithPosters(list);
}

async function getSeries() {
    const list = await getList("types=tv_series", "series");
    return enrichWithPosters(list);
}

async function getAnime() {
    const list = await getList("genres=16", "anime");
    return enrichWithPosters(list);
}

(async () => {

    const [movies, series, anime] =
        await Promise.all([
            getMovies(),
            getSeries(),
            getAnime()
        ]);

    renderSlider("newMoviesSlider", movies);
    renderSlider("newSeriesSlider", series);
    renderSlider("newAnimeSlider", anime);

    createSplide("newMoviesSplide");
    createSplide("newSeriesSplide");
    createSplide("newAnimeSplide");

})();