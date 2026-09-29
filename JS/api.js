const API_URL = "https://dummyjson.com/recipes";

const CARD_FIELDS =
    "id,name,image,prepTimeMinutes,cookTimeMinutes,cuisine";

async function fetchJson(url, errorMessage) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`${errorMessage} (${response.status}).`);
    }

    return response.json();
}

export function getRecipes(limit = 50) {
    return fetchJson(
        `${API_URL}?limit=${limit}&select=${CARD_FIELDS}`,
        "Could not load recipes"
    );
}

export function getRecipe(id) {
    return fetchJson(
        `${API_URL}/${id}`,
        "Could not load recipe"
    );
}