import { getRecipes } from "./api.js";

const recipeList = document.querySelector("#recipe-list");
const statusMessage = document.querySelector("#status");

function createRecipeCard(recipe) {
    const card = document.createElement("a");
    card.className = "recipe-card";
    card.href = `recipe.html?id=${recipe.id}`;

    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;
    image.loading = "lazy";

    const title = document.createElement("h3");
    title.textContent = recipe.name;

    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
    const meta = document.createElement("p");
    meta.className = "card-meta";
    meta.textContent = `${recipe.cuisine} • ${totalTime} min`;

    const body = document.createElement("div");
    body.className = "card-body";
    body.append(title, meta);

    card.append(image, body);
    return card;
}

function renderRecipes(recipes) {
    recipeList.replaceChildren(...recipes.map(createRecipeCard));
    statusMessage.textContent = `Recipes shown: ${recipes.length}`;
}

async function loadRecipes() {
    statusMessage.textContent = "Loading recipes...";

    try {
        const { recipes } = await getRecipes();
        renderRecipes(recipes);
    } catch (error) {
        console.error(error);
        statusMessage.textContent = "Could not load recipes. Please try again.";
    }
}

loadRecipes();