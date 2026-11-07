const BASE_URL = import.meta.env.VITE_MEALDB_URL;
const API_KEY = import.meta.env.VITE_MEALDB_KEY;
const TIMEOUT_MS = 15000;

async function request(path, params, signal) {
  if (!BASE_URL || !API_KEY) {
    throw new Error("Falta configurar la API: copia .env.example como .env y reinicia.");
  }

  const query = new URLSearchParams(params);
  const url = `${BASE_URL}/${API_KEY}/${path}?${query}`;

  let response;
  try {
    response = await fetch(url, {
      signal: AbortSignal.any([signal, AbortSignal.timeout(TIMEOUT_MS)]),
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error("No pudimos conectar con el recetario. Revisa tu internet e intenta de nuevo.");
  }

  if (!response.ok) {
    throw new Error("El recetario no respondió bien. Intenta de nuevo en un momento.");
  }

  return response.json();
}

function toRecipe(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const name = meal[`strIngredient${i}`]?.trim();
    if (name) ingredients.push({ name, measure: meal[`strMeasure${i}`]?.trim() ?? "" });
  }

  const steps = (meal.strInstructions ?? "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(step\s*)?\d+[.):]?\s*/i, "").trim())
    .filter(Boolean);

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    ingredients,
    steps,
    youtube: meal.strYoutube || null,
    source: meal.strSource || null,
  };
}

export async function searchRecipes(term, signal) {
  const { meals } = await request("search.php", { s: term }, signal);
  return (meals ?? []).map(toRecipe);
}

export async function getRecipesByCategory(category, signal) {
  const { meals } = await request("filter.php", { c: category }, signal);
  return (meals ?? []).map(toRecipe);
}

export async function getRecipe(id, signal) {
  const { meals } = await request("lookup.php", { i: id }, signal);
  return meals?.[0] ? toRecipe(meals[0]) : null;
}

export async function getRandomRecipe(signal) {
  const { meals } = await request("random.php", {}, signal);
  return toRecipe(meals[0]);
}

export async function getCategories(signal) {
  const { categories } = await request("categories.php", {}, signal);
  return categories.map((item) => ({ name: item.strCategory, image: item.strCategoryThumb }));
}
