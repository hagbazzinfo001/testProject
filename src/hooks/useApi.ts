import { useState, useCallback } from "react";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (
      apiCall: () => Promise<{ data: T; success: boolean; message?: string }>
    ) => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await apiCall();
        setState({ data: response.data, loading: false, error: null });
        return response;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    []
  );
  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);
  return {
    ...state,
    execute,
    reset,
  };
}
