const STORAGE_KEY = "theme";

function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
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
        } catch {
            // ignore, the theme just won't be remembered
        }
        applyTheme(next);
    });
});