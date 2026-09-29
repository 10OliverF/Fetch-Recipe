const STORAGE_KEY = "theme";

function getPreferredTheme() {
    let saved;

    try {
        saved = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        console.warn("Could not read the saved theme.", error);
    }

    if (saved === "light" || saved === "dark") {
        return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const button = document.querySelector("#theme-toggle");
    if (button) {
        button.textContent = theme === "dark" ? "Light mode" : "Dark mode";
        button.setAttribute("aria-pressed", String(theme === "dark"));
    }
}

applyTheme(getPreferredTheme());

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#theme-toggle");
    applyTheme(document.documentElement.dataset.theme);

    button.addEventListener("click", () => {
        const next =
            document.documentElement.dataset.theme === "dark" ? "light" : "dark";

        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (error) {
            console.warn("Could not save the theme.", error);
        }
        applyTheme(next);
    });
});