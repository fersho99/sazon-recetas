import { Link, useParams } from "react-router-dom";
import { getRecipe } from "../api/mealdb";
import { ErrorMessage, Loading } from "../components/Status";
import { categoryName } from "../data/categories";
import { useApi } from "../hooks/useApi";
import { useTitle } from "../hooks/useTitle";

export function RecipeDetail() {
  const { id } = useParams();
  const { data: recipe, error, loading, reload } = useApi((signal) => getRecipe(id, signal), [id]);
  useTitle(recipe?.name ?? "Receta");

  return (
    <div className="page">
      <Link to="/recetas" className="back-link">
        Volver a recetas
      </Link>

      {error && <ErrorMessage message={error} onRetry={reload} />}
      {!error && loading && <Loading>Cargando la receta…</Loading>}
      {!error && !loading && !recipe && (
        <div className="status">
          <h1>No encontramos esta receta</h1>
          <p>
            Puede que el enlace esté mal escrito. <Link to="/recetas">Busca otra receta</Link>.
          </p>
        </div>
      )}
      {!error && !loading && recipe && (
        <article className="recipe">
          <header className="recipe__header">
            <h1>{recipe.name}</h1>
            <p>{[categoryName(recipe.category), recipe.area].filter(Boolean).join(" · ")}</p>
          </header>

          <div className="recipe__aside">
            <img src={recipe.image} alt={recipe.name} width="700" height="700" />
            <h2>Ingredientes</h2>
            <ul className="ingredients">
              {recipe.ingredients.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <span>{item.name}</span>
                  <span>{item.measure}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe__steps">
            <h2>Preparación</h2>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            {(recipe.youtube || recipe.source) && (
              <p className="recipe__links">
                {recipe.youtube && (
                  <a href={recipe.youtube} target="_blank" rel="noreferrer">
                    Ver el video
                  </a>
                )}
                {recipe.source && (
                  <a href={recipe.source} target="_blank" rel="noreferrer">
                    Ver la fuente original
                  </a>
                )}
              </p>
            )}
          </div>
        </article>
      )}
    </div>
  );
}
