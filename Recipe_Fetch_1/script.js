const API_URL = "https://dummyjson.com/recipes";

const recipeList = document.querySelector("#recipe-list");
const statusMessage = document.querySelector("#status");


const CARD_FIELDS = "id,name,image,prepTimeMinutes,cookTimeMinutes,cuisine";
const LIST_URL = API_URL + "?limit=12&select=" + CARD_FIELDS;


async function loadRecipes() {
    try {
        const response = await fetch(LIST_URL + "/0");
        if (!response.ok) {
            throw new Error("Could not load recipes (" + response.status + ").");
        }
        const data = await response.json();
        renderRecipes(data.recipes);
    } catch (error) {
        console.error(error);
        statusMessage.textContent = "Could not load recipes. Please try again.";
    }
}

loadRecipes().then(() => console.log("Recipes loaded."));

function createRecipeCard(recipe) {
    const card = document.createElement("article");
    card.className = "recipe-card";

    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "card-body";

    const title = document.createElement("h3");
    // Set the recipe name.
    title.textContent = recipe.name;



    const meta = document.createElement("p");
    meta.className = "card-meta";
    // Set the cuisine and total time.
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
    meta.textContent = recipe.cuisine + " - " + totalTime + " min";
    content.append(title, meta);
    card.append(image, content);
    return card;
}

function renderRecipes(recipes) {
    recipeList.replaceChildren();

    recipes.forEach(recipe => {
        // Build a card and append it to recipeList.
        const card = createRecipeCard(recipe);
        recipeList.append(card);

    });

    statusMessage.textContent = "Recipes shown: " + recipes.length;
}



