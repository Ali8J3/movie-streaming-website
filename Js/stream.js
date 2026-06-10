function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

const imdb = getQueryParam("imdb");

const iframe = document.getElementById("player");

// ⚠️ Replace this with your real embed provider later
function buildStreamUrl(imdbID) {
    return `https://embedmaster.link/movie/${imdbID}`;
}

if (imdb) {
    iframe.src = buildStreamUrl(imdb);
} else {
    document.body.innerHTML = "<h2>No video selected</h2>";
}