import { getRecipe } from "./api.js";

const statusMessage = document.querySelector("#detail-status");
const recipeSection = document.querySelector("#recipe-detail");
const image = document.querySelector("#recipe-image");

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
        const numberId = Number(id);

        if (!Number.isInteger(numberId) || numberId < 1) {
            throw new Error("Invalid recipe id.");
        }
        renderRecipe(await getRecipe(numberId));
    } catch (error) {
        console.error(error);
        statusMessage.textContent = "Could not load recipe.";
    }
}

loadRecipe();