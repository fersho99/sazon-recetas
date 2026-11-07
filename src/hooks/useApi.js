import { useEffect, useState } from "react";

export function useApi(load, deps) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, error: null, loading: true }));

    load(controller.signal)
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setState({ data: null, error: error.message, loading: false });
        }
      });

    return () => controller.abort();
    // Las dependencias las define quien llama al hook.
  }, [...deps, attempt]);

  return { ...state, reload: () => setAttempt((n) => n + 1) };
}
