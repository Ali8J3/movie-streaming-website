async function loadComponent(id, file) {
    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        const html = await response.text();

        document.getElementById(id).innerHTML = html;
    }
    catch(error){
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {

    await loadComponent("header-container", "components/header.html");

    await loadComponent("footer-container", "components/footer.html");

});