import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getRandomRecipe } from "../api/mealdb";
import { ErrorMessage, Loading } from "../components/Status";
import { useUser } from "../context/UserContext";
import { categoryName } from "../data/categories";
import { useApi } from "../hooks/useApi";
import { useTitle } from "../hooks/useTitle";

export function Home() {
  useTitle("");
  const { name } = useUser();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const random = useApi(getRandomRecipe, []);
  const categories = useApi(getCategories, []);

  const search = (event) => {
    event.preventDefault();
    const query = term.trim();
    navigate(query ? `/recetas?q=${encodeURIComponent(query)}` : "/recetas");
  };

  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <h1>{name ? `${name}, ¿qué cocinamos hoy?` : "¿Qué cocinamos hoy?"}</h1>
          <p>Busca un platillo o explora por categoría. Cada receta trae sus ingredientes, medidas y pasos.</p>
          <form className="search" role="search" onSubmit={search}>
            <label htmlFor="busqueda-inicio">Buscar receta</label>
            <div className="search__row">
              <input
                id="busqueda-inicio"
                type="search"
                placeholder="Nombre en inglés, como pasta o cake"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
              />
              <button type="submit" className="button">
                Buscar
              </button>
            </div>
          </form>
        </div>

        <aside className="hero__feature" aria-label="Receta al azar">
          {random.error && <ErrorMessage message={random.error} onRetry={random.reload} />}
          {!random.error && !random.data && <Loading>Eligiendo una receta…</Loading>}
          {random.data && (
            <>
              <Link to={`/recetas/${random.data.id}`} className="hero__image">
                <img src={random.data.image} alt="" width="700" height="700" />
              </Link>
              <div className="hero__caption">
                <div>
                  <p>Receta al azar</p>
                  <h2>
                    <Link to={`/recetas/${random.data.id}`}>{random.data.name}</Link>
                  </h2>
                </div>
                <button
                  type="button"
                  className="button button--ghost"
                  onClick={random.reload}
                  disabled={random.loading}
                >
                  {random.loading ? "Buscando…" : "Otra receta"}
                </button>
              </div>
            </>
          )}
        </aside>
      </section>

      <section className="category-section" aria-labelledby="titulo-categorias">
        <h2 id="titulo-categorias">Explora por categoría</h2>
        {categories.error && <ErrorMessage message={categories.error} onRetry={categories.reload} />}
        {!categories.error && !categories.data && <Loading>Cargando categorías…</Loading>}
        {categories.data && (
          <ul className="category-list">
            {categories.data.map((category) => (
              <li key={category.name}>
                <Link to={`/recetas?categoria=${encodeURIComponent(category.name)}`}>
                  <img src={category.image} alt="" loading="lazy" width="160" height="100" />
                  {categoryName(category.name)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {!name && (
        <section className="join">
          <h2>Crea tu cuenta y te saludamos por tu nombre</h2>
          <Link to="/registro" className="button">
            Crear cuenta
          </Link>
        </section>
      )}
    </>
  );
}
