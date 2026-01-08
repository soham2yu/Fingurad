import axios from "axios";

// Fallback to relative path if VITE_API_BASE_URL is not set, 
// allowing proxying in development or same-origin in production.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  uploadCSV: async (file: File, simulation: boolean = false) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("simulation", String(simulation));
    
    // Uploads might need multipart/form-data, let axios handle boundaries
    const response = await apiClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getMetrics: async () => {
    const response = await apiClient.get("/metrics");
    return response.data;
  },

  getTransactionsByHour: async () => {
    const response = await apiClient.get("/charts/transactions-by-hour");
    return response.data;
  },

  getAnomaliesByHour: async () => {
    const response = await apiClient.get("/charts/anomalies-by-hour");
    return response.data;
  },

  getRiskDistribution: async () => {
    const response = await apiClient.get("/charts/risk-distribution");
    return response.data;
  },

  getAnomalyReasons: async () => {
    const response = await apiClient.get("/charts/anomaly-reasons");
    return response.data;
  },

  getFlaggedTransactions: async () => {
    const response = await apiClient.get("/transactions/flagged");
    return response.data;
  },

  getSimulationSummary: async () => {
    const response = await apiClient.get("/simulation/summary");
    return response.data;
  },

  getSimulationSessions: async () => {
    const response = await apiClient.get("/simulation/sessions");
    return response.data;
  },
};
