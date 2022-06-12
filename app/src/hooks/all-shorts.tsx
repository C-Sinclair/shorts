import { trpc } from "~/utils/trpc";

/**
 * @returns all shorts from the backend
 */
export function useAllShorts() {
  const res = trpc.useQuery(["short.all"]);

  return {
    shorts: res.data,
    error: res.error,
    loading: res.isLoading,
  };
}
