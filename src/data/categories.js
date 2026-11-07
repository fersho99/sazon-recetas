// La API entrega las categorías en inglés.
const NAMES = {
  Beef: "Res",
  Breakfast: "Desayuno",
  Chicken: "Pollo",
  Dessert: "Postres",
  Goat: "Cabra",
  Lamb: "Cordero",
  Miscellaneous: "Variado",
  Pasta: "Pasta",
  Pork: "Cerdo",
  Seafood: "Mariscos",
  Side: "Guarniciones",
  Starter: "Entradas",
  Vegan: "Vegano",
  Vegetarian: "Vegetariano",
};

export function categoryName(category) {
  return NAMES[category] ?? category;
}
