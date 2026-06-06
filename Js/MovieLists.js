function renderSlider(containerId, movies)
    {
    const container = document.getElementById(containerId);

    container.innerHTML = "";

    movies.forEach(movie=>{

        const card = document.createElement("div");

        card.className = "slider-card";

        card.innerHTML = `
            <div
                class="slider-poster"
                style="
                    background-image:
                    url(Media/${movie.poster})
                ">
            </div>

            <div class="slider-title">
                ${movie.title}
            </div>
        `;

        card.onclick = () =>
            location.href =
                `play.html?id=${movie.id}`;

        container.appendChild(card);

    });

}
