import { useState, useCallback } from 'react';
import { ApiService } from '../lib/api';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useApi<T>(endpoint: string, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async (query?: object) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ApiService.get<T>(endpoint, query);
      setData(result[0] || null);
      options.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  const create = useCallback(async (payload: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ApiService.create<T>(endpoint, payload);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  const update = useCallback(async (id: string, payload: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ApiService.update<T>(endpoint, id, payload);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await ApiService.delete(endpoint, id);
      setData(null);
      options.onSuccess?.(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  return { data, loading, error, fetch, create, update, remove };
}