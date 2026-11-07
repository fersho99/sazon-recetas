export function Loading({ children }) {
  return (
    <p className="status" role="status">
      {children}
    </p>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status status--error" role="alert">
      <p>{message}</p>
      <button type="button" className="button button--ghost" onClick={onRetry}>
        Intentar de nuevo
      </button>
    </div>
  );
}
