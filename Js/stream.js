function getQueryParam(name) {

    return new URLSearchParams(
        window.location.search
    ).get(name);

}

const imdb =
    getQueryParam("imdb");

const season =
    getQueryParam("season");

const episode =
    getQueryParam("episode");

const iframe =
    document.getElementById("player");

function buildStreamUrl() {

    if (
        season &&
        episode
    ) {

        return `https://embedmaster.link/tv/${imdb}/${season}/${episode}`;

    }

    return `https://embedmaster.link/movie/${imdb}`;

}

if (imdb) {

    iframe.src =
        buildStreamUrl();

} else {

    document.body.innerHTML =
        "<h2>No video selected</h2>";

}