import { Link } from "react-router-dom";
import { categoryName } from "../data/categories";

export function RecipeCard({ recipe }) {
  const details = [recipe.category && categoryName(recipe.category), recipe.area]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="recipe-card">
      <Link to={`/recetas/${recipe.id}`}>
        <img src={`${recipe.image}/medium`} alt="" loading="lazy" width="500" height="500" />
        <h3>{recipe.name}</h3>
      </Link>
      {details && <p>{details}</p>}
    </li>
  );
}
