import { getRecipes } from "./api.js";

const recipeList = document.querySelector("#recipe-list");
const statusMessage = document.querySelector("#status");

async function loadRecipes() {
    try {
        const data = await getRecipes();

        renderRecipes(data.recipes);

    } catch (error) {
        console.error(error);

        statusMessage.textContent =
            "Could not load recipes.";
    }
}

function createRecipeCard(recipe) {

    const card = document.createElement("a");
    card.href = `recipe.html?id=${recipe.id}`;
    card.className = "recipe-card";

    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "card-body";

    const title = document.createElement("h3");
    title.textContent = recipe.name;

    const meta = document.createElement("p");
    meta.className = "card-meta";

    const totalTime =
        recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    meta.textContent =
        `${recipe.cuisine} • ${totalTime} min`;

    content.append(title, meta);
    card.append(image, content);

    return card;
}

function renderRecipes(recipes) {
    recipeList.replaceChildren();

    recipes.forEach(recipe => {
        recipeList.append(
            createRecipeCard(recipe)
        );
    });

    statusMessage.textContent =
        `Recipes shown: ${recipes.length}`;
}

loadRecipes();