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
   Fetch OMDb Poster
-------------------------- */

async function getPoster(imdbID) {

    if (!imdbID) return "https://placehold.co/300x450?text=No+Image";

    const data = await fetchWithCache(
        `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}`,
        `omdb_${imdbID}`
    );

    return data?.Poster && data.Poster !== "N/A"
        ? upgradeOmdbImage(data.Poster)
        : "https://placehold.co/300x450?text=No+Image";
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
    `url('${movie.poster}')`;

    featuredTitle.textContent =
        movie.title;

    document.querySelectorAll(".featured-item")
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

        const item = document.createElement("div");

        item.className = "featured-item";
        item.dataset.id = movie.id;

        item.style.backgroundImage =
            `url('${movie.poster}')`;

        item.addEventListener("click", () => {
            renderFeatured(movie);
        });

        featuredSlider.appendChild(item);
    });
}

/* -------------------------
   Init (IMPORTANT)
-------------------------- */

(async function initFeatured() {

    const list = await getFeaturedList();

    // take only featured candidates
    const picked = list.slice(0, 4);

    // enrich with OMDb posters
    featuredMovies = await Promise.all(
        picked.map(async (m) => {

            const poster = await getPoster(m.imdb_id);

            return {
                id: m.id,
                imdb_id: m.imdb_id,
                title: m.title,
                poster
            };
        })
    );

    renderFeaturedSlider();

    if (featuredMovies.length > 0) {
        renderFeatured(featuredMovies[0]);
    }

})();

/* -------------------------
   Play Button
-------------------------- */

featuredPlayBtn.addEventListener("click", () => {

    if (!currentMovie) return;

    location.href =
        `components/play.html?imdb=${currentMovie.imdb_id}`;
});

// ...
function upgradeOmdbImage(url) {
    if (!url) return url;

    return url
        .replace(/_V1_QL\d+_/g, "_V1_QL100_")
        .replace(/UX\d+/, "UX1000");
}