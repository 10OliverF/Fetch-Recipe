import { getRecipe } from "./api.js";

const status =
    document.querySelector("#detail-status");

const recipeSection =
    document.querySelector("#recipe-detail");

async function loadRecipe() {

    try {

        const params =
            new URLSearchParams(window.location.search);

        const id = params.get("id");

        if (!id) {
            throw new Error("Missing recipe id.");
        }

        const recipe =
            await getRecipe(id);

        renderRecipe(recipe);

    } catch (error) {

        console.error(error);

        status.textContent =
            "Could not load recipe.";
    }
}

function renderRecipe(recipe) {

    document.querySelector("#recipe-name")
        .textContent = recipe.name;

    document.querySelector("#recipe-image")
        .src = recipe.image;

    document.querySelector("#recipe-image")
        .alt = recipe.name;

    document.querySelector("#recipe-cuisine")
        .textContent = recipe.cuisine;

    document.querySelector("#recipe-prep")
        .textContent = recipe.prepTimeMinutes;

    document.querySelector("#recipe-cook")
        .textContent = recipe.cookTimeMinutes;

    document.querySelector("#recipe-servings")
        .textContent = recipe.servings;

    document.querySelector("#recipe-difficulty")
        .textContent = recipe.difficulty;

    const ingredients =
        document.querySelector("#ingredients-list");

    ingredients.replaceChildren();

    recipe.ingredients.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        ingredients.append(li);
    });

    const instructions =
        document.querySelector("#instructions-list");

    instructions.replaceChildren();

    recipe.instructions.forEach(step => {

        const li =
            document.createElement("li");

        li.textContent = step;

        instructions.append(li);
    });

    status.hidden = true;
    recipeSection.hidden = false;
}

loadRecipe();