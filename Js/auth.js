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
            .includes("/Components/");

    return inComponents
        ? `../${page}`
        : page;

}

renderProfileMenu();
