import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { metricsSchema } from "@shared/schema";

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const data = await api.getMetrics();
      // Validate schema at runtime for safety
      return metricsSchema.parse(data);
    },
    refetchInterval: 30000, // Refresh every 30s
  });
}
