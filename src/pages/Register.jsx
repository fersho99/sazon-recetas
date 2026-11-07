import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTitle } from "../hooks/useTitle";
import { FIELD_ORDER, validateAll } from "./register.validation";

const EMPTY = { nombre: "", correo: "", contrasena: "", confirmacion: "", acepta: false };

function Field({ id, label, hint, error, ...inputProps }) {
  const described = [hint && `${id}-ayuda`, error && `${id}-error`].filter(Boolean).join(" ");

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={described || undefined}
        {...inputProps}
      />
      {hint && (
        <p id={`${id}-ayuda`} className="hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}

export function Register() {
  useTitle("Crear cuenta");
  const { name, register } = useUser();
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [done, setDone] = useState(false);
  const formRef = useRef(null);

  const errors = validateAll(values);
  const errorOf = (field) => (touched[field] ? errors[field] : "");

  const bind = (field) => ({
    value: values[field],
    onChange: (event) => setValues({ ...values, [field]: event.target.value }),
    onBlur: () => setTouched({ ...touched, [field]: true }),
    error: errorOf(field),
  });

  const submit = (event) => {
    event.preventDefault();
    setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])));

    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      formRef.current.elements[firstInvalid].focus();
      return;
    }

    register(values.nombre.trim());
    setValues(EMPTY);
    setDone(true);
  };

  if (done) {
    return (
      <div className="page page--narrow">
        <div className="success" role="status">
          <h1>¡Listo, {name}!</h1>
          <p>Tu cuenta quedó lista. Esta página no tiene servidor: solo tu nombre se guarda en este navegador, y tu contraseña no se guarda.</p>
          <Link to="/recetas" className="button">
            Ver recetas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--narrow">
      <h1>Crea tu cuenta</h1>
      <p>Todos los campos son obligatorios.</p>

      <form ref={formRef} className="form" onSubmit={submit} noValidate>
        <Field id="nombre" label="Nombre" type="text" autoComplete="given-name" {...bind("nombre")} />
        <Field
          id="correo"
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          placeholder="email@ejemplo.com"
          {...bind("correo")}
        />
        <Field
          id="contrasena"
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          hint="Mínimo 8 caracteres, con una mayúscula, un número y un símbolo."
          {...bind("contrasena")}
        />
        <Field
          id="confirmacion"
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          {...bind("confirmacion")}
        />

        <div className="field field--check">
          <label htmlFor="acepta">
            <input
              id="acepta"
              name="acepta"
              type="checkbox"
              checked={values.acepta}
              aria-invalid={Boolean(errorOf("acepta"))}
              aria-describedby={errorOf("acepta") ? "acepta-error" : undefined}
              onChange={(event) => {
                setValues({ ...values, acepta: event.target.checked });
                setTouched({ ...touched, acepta: true });
              }}
            />
            Acepto que mi nombre se guarde en este navegador.
          </label>
          {errorOf("acepta") && (
            <p id="acepta-error" className="field__error">
              {errorOf("acepta")}
            </p>
          )}
        </div>

        <button type="submit" className="button">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
