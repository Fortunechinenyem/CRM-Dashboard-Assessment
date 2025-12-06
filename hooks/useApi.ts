import { useState, useCallback } from "react";
import { apiService } from "@/lib/api";

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (apiCall: () => Promise<T>, options?: UseApiOptions<T>) => {
      const { onSuccess, onError } = options || {};

      setIsLoading(true);
      setError(null);

      try {
        const result = await apiCall();
        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("API call failed");
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  };
}
