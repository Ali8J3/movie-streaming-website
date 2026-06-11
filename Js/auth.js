function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

}

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    location.reload();

}

function renderProfileMenu() {

    const dropdown =
        document.getElementById(
            "profileDropdown"
        );

    if (!dropdown)
        return;

    const user =
        getCurrentUser();

    if (!user) {

        dropdown.innerHTML = `
            <a href="${rootPath("login.html")}">
                ورود
            </a>

            <a href="${rootPath("register.html")}">
                ثبت نام
            </a>
        `;

        return;

    }

    dropdown.innerHTML = `
        <a href="${rootPath("profile.html")}">
            ${user.username}
        </a>

        <button id="logoutBtn">
            خروج
        </button>
    `;

    document
        .getElementById(
            "logoutBtn"
        )
        ?.addEventListener(
            "click",
            logout
        );

}

document.addEventListener(
    "click",
    e => {

        const btn =
            document.getElementById(
                "profileBtn"
            );

        const menu =
            document.getElementById(
                "profileDropdown"
            );

        if (!btn || !menu)
            return;

        if (
            btn.contains(e.target)
        ) {

            menu.classList.toggle(
                "show"
            );

            return;

        }

        if (
            !menu.contains(e.target)
        ) {

            menu.classList.remove(
                "show"
            );

        }

    }
);

function rootPath(page) {

    const inComponents =
        window.location.pathname
            .toLowerCase()
            .includes("/components/");

    return inComponents
        ? `../${page}`
        : page;

}

function getRootReverse(page) {

    const isInComponents =
        window.location.pathname
            .toLowerCase()
            .includes("/components/");

    return isInComponents
        ? page
        : `Components/${page}`;

}

function fixHeaderLinks() {

    const logo =
        document.querySelector(".logo");

    if (logo) {
        logo.setAttribute(
            "href",
            rootPath("index.html")
        );
    }

    const homeBTN = 
    document.querySelector("#homeBTN");
    
    if(homeBTN){
        homeBTN.setAttribute(
            "href",
            rootPath("index.html")
        );
    }

    const movieList = 
    document.querySelector(".movieList");
    
    if(movieList){
        movieList.setAttribute(
            "href",
            `${getRootReverse("list.html")}?type=movie`
        );
    }

    const seriesList = 
    document.querySelector(".seriesList");
    
    if(seriesList){
        seriesList.setAttribute(
            "href",
            `${getRootReverse("list.html")}?type=series`
        );
    }
}

function initAuth() {

    renderProfileMenu();

    fixHeaderLinks();
}
