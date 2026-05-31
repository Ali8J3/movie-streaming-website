const allMovies = [
    ...DATA.movies,
    ...NEW_MOVIES.movies
];

const featuredMovies = allMovies.filter(
    movie => movie.featured === true
);

const featuredPoster =
    document.getElementById("featuredPoster");

const featuredTitle =
    document.getElementById("featuredTitle");

const featuredSlider =
    document.getElementById("featuredSlider");

const featuredPlayBtn =
    document.getElementById("featuredPlayBtn");

let currentMovie = null;


/* -------------------------
   Render Main Featured Movie
-------------------------- */

function renderFeatured(movie){

    currentMovie = movie;

    featuredPoster.style.backgroundImage =
        `url(Media/${movie.poster})`;

    featuredTitle.textContent =
        movie.title;

    document
        .querySelectorAll(".featured-item")
        .forEach(item => {
            item.classList.remove("active");

            if(Number(item.dataset.id) === movie.id){
                item.classList.add("active");
            }
        });
}


/* -------------------------
   Render Slider
-------------------------- */

function renderFeaturedSlider(){

    featuredSlider.innerHTML = "";

    featuredMovies.forEach(movie => {

        const item = document.createElement("div");

        item.className = "featured-item";

        item.dataset.id = movie.id;

        item.style.backgroundImage =
            `url(Media/${movie.poster})`;

        item.addEventListener("click", () => {
            renderFeatured(movie);
        });

        featuredSlider.appendChild(item);

    });

}


/* -------------------------
   Play Button
-------------------------- */

featuredPlayBtn.addEventListener("click", () => {

    if(!currentMovie) return;

    location.href =
        `play.html?id=${currentMovie.id}`;

});


/* -------------------------
   Init
-------------------------- */

if(featuredMovies.length > 0){

    renderFeaturedSlider();

    renderFeatured(featuredMovies[0]);

}