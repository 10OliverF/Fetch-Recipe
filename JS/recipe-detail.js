import { getRecipe } from "./api.js";

const statusMessage = document.querySelector("#detail-status");
const recipeSection = document.querySelector("#recipe-detail");

function setText(selector, value) {
    document.querySelector(selector).textContent = value;
}

function fillList(selector, items) {
    const listItems = items.map(text => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
    });

    document.querySelector(selector).replaceChildren(...listItems);
}

function renderRecipe(recipe) {
    document.title = recipe.name;

    const image = document.querySelector("#recipe-image");
    image.src = recipe.image;
    image.alt = recipe.name;

    setText("#recipe-name", recipe.name);
    setText("#recipe-cuisine", recipe.cuisine);
    setText("#recipe-prep", recipe.prepTimeMinutes);
    setText("#recipe-cook", recipe.cookTimeMinutes);
    setText("#recipe-servings", recipe.servings);
    setText("#recipe-difficulty", recipe.difficulty);

    fillList("#ingredients-list", recipe.ingredients);
    fillList("#instructions-list", recipe.instructions);

    statusMessage.hidden = true;
    recipeSection.hidden = false;
}

async function loadRecipe() {
    try {
        const id = new URLSearchParams(window.location.search).get("id");

        if (!id) {
            throw new Error("Missing recipe id.");
        }

        renderRecipe(await getRecipe(id));
    } catch (error) {
        console.error(error);
        statusMessage.textContent = "Could not load recipe.";
    }
}

loadRecipe();