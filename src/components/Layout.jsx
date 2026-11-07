import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function Layout() {
  const { name, leave } = useUser();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand">
            Sazón
          </Link>
          <nav aria-label="Principal" className="site-nav">
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/recetas">Recetas</NavLink>
            {name ? (
              <span className="site-nav__user">
                Hola, {name}
                <button type="button" className="link-button" onClick={leave}>
                  Salir
                </button>
              </span>
            ) : (
              <NavLink to="/registro">Crear cuenta</NavLink>
            )}
          </nav>
        </div>
      </header>

      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          Recetas e imágenes de{" "}
          <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">
            TheMealDB
          </a>
          . Proyecto escolar de Desarrollo Web Integral.
        </p>
      </footer>
    </>
  );
}
