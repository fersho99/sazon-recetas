import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UserProvider } from "./context/UserContext";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { RecipeDetail } from "./pages/RecipeDetail";
import { Recipes } from "./pages/Recipes";
import { Register } from "./pages/Register";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/recetas" element={<Recipes />} />
            <Route path="/recetas/:id" element={<RecipeDetail />} />
            <Route path="/registro" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
