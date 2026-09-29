const API_URL = "https://dummyjson.com/recipes";

const CARD_FIELDS =
    "id,name,image,prepTimeMinutes,cookTimeMinutes,cuisine";

export async function getRecipes(limit = 12) {
    const response = await fetch(
        `${API_URL}?limit=${limit}&select=${CARD_FIELDS}`
    );

    if (!response.ok) {
        throw new Error(
            `Could not load recipes (${response.status}).`
        );
    }

    return await response.json();
}

export async function getRecipe(id) {
    const response = await fetch(
        `${API_URL}/${id}`
    );
    if (!response.ok) {
        throw new Error(
            `Could not load recipe (${response.status}).`
        );
    }
    return await response.json();
}

