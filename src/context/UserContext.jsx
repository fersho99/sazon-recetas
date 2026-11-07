import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "sazon-nombre";

function readName() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeName(name) {
  try {
    if (name) window.localStorage.setItem(STORAGE_KEY, name);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Sin almacenamiento, el saludo solo dura mientras la pestaña esté abierta.
  }
}

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [name, setName] = useState(readName);

  // Solo se guarda el nombre: esta página no tiene servidor y nunca guarda la contraseña.
  const register = (newName) => {
    writeName(newName);
    setName(newName);
  };

  const leave = () => {
    writeName(null);
    setName(null);
  };

  return (
    <UserContext.Provider value={{ name, register, leave }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
