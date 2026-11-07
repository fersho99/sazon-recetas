import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";

export function NotFound() {
  useTitle("Página no encontrada");

  return (
    <div className="page page--narrow">
      <h1>Esta página no está en el menú</h1>
      <p>
        Revisa la dirección o <Link to="/recetas">busca una receta</Link>.
      </p>
    </div>
  );
}
