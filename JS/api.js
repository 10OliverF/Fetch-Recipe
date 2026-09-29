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

export function getRecipes(limit = "20") {
    const url = new URL(API_URL);
    url.searchParams.set("limit", limit);
    url.searchParams.set("select", CARD_FIELDS);
    return fetchJson(
        url.toString(),
        "Could not load recipes"
    );
}

export function getRecipe(id) {
    return fetchJson(
        `${API_URL}/${id}`,
        "Could not load recipe"
    );
}