import axios from "axios";
import { getSession } from "next-auth/react";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token sempre que houver
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const accessToken = (session as { accessToken?: string } | null)
      ?.accessToken;
    if (accessToken) {
      (config.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
