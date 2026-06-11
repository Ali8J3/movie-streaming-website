const searchBtn =
    document.getElementById(
        "searchBtn"
    );

const searchModal =
    document.getElementById(
        "searchModal"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const searchResults =
    document.getElementById(
        "searchResults"
    );

searchBtn?.addEventListener(
    "click",
    () => {

        searchModal.classList.add(
            "show"
        );

        searchInput.focus();

    }
);

searchModal?.addEventListener(
    "click",
    e => {

        if (
            e.target === searchModal
        ) {

            searchModal.classList.remove(
                "show"
            );

        }

    }
);

let searchTimeout;

searchInput?.addEventListener(
    "input",
    () => {

        clearTimeout(
            searchTimeout
        );

        const query =
            searchInput.value.trim();

        if (query.length < 2) {

            searchResults.innerHTML =
                "";

            return;
        }

        searchTimeout =
            setTimeout(
                () =>
                    searchTitles(
                        query
                    ),
                400
            );

    }
);

async function searchTitles(
    query,
    searchResults
) {

    searchResults.innerHTML =
        "<div class='search-item'>Searching...</div>";

    try {

        const data =
            await fetchWithCache(
                `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${WATCHMODE_API_KEY}&search_value=${encodeURIComponent(query)}`,
                `search_${query}`
            );

        const results =
            data.results || [];

        searchResults.innerHTML =
            "";

        results
            .slice(0, 10)
            .forEach(item => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "search-item";

                div.textContent =
                    item.name;

                div.addEventListener(
                    "click",
                    () => {

                        if (
                            item.imdb_id
                        ) {

                            location.href =
                                `${getRootReverse("play.html")}?imdb=${item.imdb_id}`;

                        }

                    }
                );

                searchResults.appendChild(
                    div
                );

            });

    }
    catch (error) {

        console.error(error);

        searchResults.innerHTML =
            "<div class='search-item'>Error loading results</div>";

    }

}

function initSearch() {

    const searchBtn =
        document.getElementById(
            "searchBtn"
        );

    const searchModal =
        document.getElementById(
            "searchModal"
        );

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const searchResults =
        document.getElementById(
            "searchResults"
        );

    if (
        !searchBtn ||
        !searchModal ||
        !searchInput ||
        !searchResults
    ) {
        return;
    }

    searchBtn.addEventListener(
        "click",
        () => {

            searchModal.classList.add(
                "show"
            );

            searchInput.focus();

        }
    );

    searchModal.addEventListener(
        "click",
        e => {

            if (
                e.target === searchModal
            ) {

                searchModal.classList.remove(
                    "show"
                );

            }

        }
    );

    let searchTimeout;

    searchInput.addEventListener(
        "input",
        () => {

            clearTimeout(
                searchTimeout
            );

            const query =
                searchInput.value.trim();

            if (
                query.length < 2
            ) {

                searchResults.innerHTML =
                    "";

                return;

            }

            searchTimeout =
                setTimeout(
                    () =>
                        searchTitles(
                            query,
                            searchResults
                        ),
                    400
                );

        }
    );

}