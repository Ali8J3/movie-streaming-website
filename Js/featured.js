/* -------------------------
   Fetch Watchmode list
-------------------------- */

async function getFeaturedList() {

    const data = await fetchWithCache(
        `https://api.watchmode.com/v1/list-titles/?apiKey=${WATCHMODE_API_KEY}&types=movie&limit=4`,
        "featured_list"
    );

    return data.titles || [];
}

/* -------------------------
   Watchmode Details
-------------------------- */

async function getDetails(id) {

    return await fetchWithCache(
        `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${WATCHMODE_API_KEY}`,
        `featured_details_${id}`
    );
}

/* -------------------------
   OMDb Poster
-------------------------- */

async function getPoster(imdbID) {

    if (!imdbID)
        return "https://placehold.co/300x450?text=No+Image";

    const data = await fetchWithCache(
        `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}`,
        `omdb_${imdbID}`
    );

    return data?.Poster && data.Poster !== "N/A"
        ? upgradeOmdbImage(data.Poster)
        : "https://placehold.co/300x450?text=No+Image";
}

/* -------------------------
   Improve OMDb quality
-------------------------- */

function upgradeOmdbImage(url) {

    if (!url) return url;

    return url
        .replace(/QL\d+/g, "QL100")
        .replace(/UX\d+/g, "UX1000")
        .replace(/UY\d+/g, "UY1500");
}

/* -------------------------
   DOM
-------------------------- */

const featuredPoster =
    document.getElementById("featuredPoster");

const featuredTitle =
    document.getElementById("featuredTitle");

const featuredSlider =
    document.getElementById("featuredSlider");

const featuredPlayBtn =
    document.getElementById("featuredPlayBtn");

let currentMovie = null;
let featuredMovies = [];

/* -------------------------
   Render Main Featured
-------------------------- */

function renderFeatured(movie) {

    currentMovie = movie;

    featuredPoster.style.backgroundImage =
        `url('${movie.backdrop || movie.poster}')`;

    featuredTitle.textContent =
        movie.title;

    document
        .querySelectorAll(".featured-item")
        .forEach(item => {

            item.classList.remove("active");

            if (item.dataset.id == movie.id) {
                item.classList.add("active");
            }
        });
}

/* -------------------------
   Render Slider
-------------------------- */

function renderFeaturedSlider() {

    featuredSlider.innerHTML = "";

    featuredMovies.forEach(movie => {

        const item =
            document.createElement("div");

        item.className =
            "featured-item";

        item.dataset.id =
            movie.id;

        item.style.backgroundImage =
            `url('${movie.poster}')`;

        item.addEventListener(
            "click",
            () => renderFeatured(movie)
        );

        featuredSlider.appendChild(item);
    });
}

/* -------------------------
   Init
-------------------------- */

(async function initFeatured() {

    const list =
        await getFeaturedList();

    const picked =
        list.slice(0, 4);

    featuredMovies =
        await Promise.all(

            picked.map(async movie => {

                const [details, poster] =
                    await Promise.all([
                        getDetails(movie.id),
                        getPoster(movie.imdb_id)
                    ]);

                return {
                    id: movie.id,
                    imdb_id: movie.imdb_id,
                    title: movie.title,

                    // small thumbnail
                    poster,

                    // large hero image
                    backdrop:
                        details?.backdrop ||
                        details?.posterLarge ||
                        details?.posterMedium ||
                        poster
                };
            })

        );

    renderFeaturedSlider();

    if (featuredMovies.length) {
        renderFeatured(
            featuredMovies[0]
        );
    }

})();

/* -------------------------
   Play Button
-------------------------- */

featuredPlayBtn.addEventListener(
    "click",
    () => {

        if (!currentMovie)
            return;

        location.href =
            `components/play.html?imdb=${currentMovie.imdb_id}`;
    }
);