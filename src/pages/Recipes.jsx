import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, getRecipesByCategory, searchRecipes } from "../api/mealdb";
import { RecipeCard } from "../components/RecipeCard";
import { ErrorMessage, Loading } from "../components/Status";
import { categoryName } from "../data/categories";
import { useApi } from "../hooks/useApi";
import { useTitle } from "../hooks/useTitle";

export function Recipes() {
  useTitle("Recetas");
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const category = params.get("categoria") ?? "";
  const [term, setTerm] = useState(query);

  const categories = useApi(getCategories, []);
  const recipes = useApi(
    (signal) => (category ? getRecipesByCategory(category, signal) : searchRecipes(query, signal)),
    [query, category]
  );

  const search = (event) => {
    event.preventDefault();
    const value = term.trim();
    setParams(value ? { q: value } : {});
  };

  const selectCategory = (name) => {
    setTerm("");
    setParams(name ? { categoria: name } : {});
  };

  let heading = "Todas las recetas";
  if (query) heading = `Resultados para “${query}”`;
  if (category) heading = categoryName(category);

  return (
    <div className="page">
      <h1>{heading}</h1>

      <form className="search" role="search" onSubmit={search}>
        <label htmlFor="busqueda">Buscar por nombre</label>
        <div className="search__row">
          <input
            id="busqueda"
            type="search"
            placeholder="Nombre en inglés, como pasta o cake"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
          <button type="submit" className="button">
            Buscar
          </button>
        </div>
        <p className="hint">Las recetas vienen de TheMealDB y están en inglés.</p>
      </form>

      {categories.data && (
        <div className="chips" role="group" aria-label="Filtrar por categoría">
          <button type="button" className="chip" aria-pressed={!category} onClick={() => selectCategory("")}>
            Todas
          </button>
          {categories.data.map((item) => (
            <button
              type="button"
              key={item.name}
              className="chip"
              aria-pressed={category === item.name}
              onClick={() => selectCategory(item.name)}
            >
              {categoryName(item.name)}
            </button>
          ))}
        </div>
      )}

      {recipes.error && <ErrorMessage message={recipes.error} onRetry={recipes.reload} />}
      {!recipes.error && recipes.loading && <Loading>Buscando recetas…</Loading>}
      {!recipes.error && !recipes.loading && recipes.data?.length === 0 && (
        <div className="status">
          <p>
            No encontramos recetas{query ? ` para “${query}”` : ""}. Prueba con un nombre en inglés, como
            chicken o cake, o elige una categoría.
          </p>
        </div>
      )}
      {!recipes.error && !recipes.loading && recipes.data?.length > 0 && (
        <>
          <p className="result-count" role="status">
            {recipes.data.length} {recipes.data.length === 1 ? "receta" : "recetas"}
          </p>
          <ul className="recipe-grid">
            {recipes.data.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
