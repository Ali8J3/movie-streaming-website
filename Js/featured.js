const featuredPoster =
    document.getElementById(
        "featuredPoster"
    );

const featuredTitle =
    document.getElementById(
        "featuredTitle"
    );

const featuredPlayBtn =
    document.getElementById(
        "featuredPlayBtn"
    );

const featuredSlider =
    document.getElementById(
        "featuredSlider"
    );

let featuredMovies = [];

let currentMovie = null;

async function getFeaturedList() {

    const response =
        await fetch(
            "../featuredDB.json"
        );

    const data =
        await response.json();

    return data.items || [];

}

function getFeaturedImage(movie) {

    return window.innerWidth <= 768
        ? movie.poster
        : movie.hero;

}

function renderFeatured(movie) {

    currentMovie =
        movie;

    if (!movie)
        return;

    const image =
        getFeaturedImage(
            movie
        );

    if (featuredPoster.tagName === "IMG") {

        featuredPoster.src =
            image;

    }
    else {

        featuredPoster.style.backgroundImage =
            `url('${image}')`;

    }

    if (featuredTitle) {

        featuredTitle.textContent =
            movie.title;

    }

}

function renderFeaturedSlider() {

    if (!featuredSlider)
        return;

    featuredSlider.innerHTML =
        "";

    featuredMovies.forEach(
        movie => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "featured-item";

            item.innerHTML = `
                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                >
            `;

            item.addEventListener(
                "click",
                () => {

                    renderFeatured(
                        movie
                    );

                }
            );

            featuredSlider.appendChild(
                item
            );

        }
    );

}

window.addEventListener(
    "resize",
    () => {

        if (
            currentMovie
        ) {

            renderFeatured(
                currentMovie
            );

        }

    }
);

featuredPlayBtn?.addEventListener(
    "click",
    () => {

        if (
            !currentMovie
        )
            return;

        location.href =
            `Components/play.html?imdb=${currentMovie.imdb_id}`;

    }
);

(async function initFeatured() {

    try {

        featuredMovies =
            await getFeaturedList();

        renderFeaturedSlider();

        if (
            featuredMovies.length > 0
        ) {

            renderFeatured(
                featuredMovies[0]
            );

        }

    }
    catch(error) {

        console.error(
            "Featured section failed:",
            error
        );

    }

})();