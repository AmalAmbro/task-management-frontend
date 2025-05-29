import { useNavigate } from "react-router-dom";
import { API_URL } from "./api";

export function useApiAction() {
  const navigate = useNavigate();

  const fetchWithToken = async (url, options) => {
    const res = await fetch(url, options);

    // If access token expired, try to refresh
    if (res.status === 401) {
      const refreshed = await attemptRefreshToken();
      if (refreshed) {
        // Retry original request with new token
        const token = localStorage.getItem("token");
        options.headers.Authorization = `Bearer ${token}`;
        return await fetch(url, options);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
        return null;
      }
    }

    return res;
  };

  const apiAction = async ({
    endpoint,
    method = "GET",
    params = {},
    body = null,
    headers = {},
  }) => {
    const url = new URL(`${API_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );

    const token = localStorage.getItem("token");
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      const res = await fetchWithToken(url, {
        method,
        headers: { ...defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : null,
      });

      if (res.status === 204) return null;

      const text = await res.text();
      if (!text) return null;

      return JSON.parse(text);
    } catch (err) {
      console.error("API error:", err);
      throw err;
    }
  };

  const attemptRefreshToken = async () => {
    try {
      const res = await fetch(`${API_URL}/token/refresh/`, {
        method: "POST",
        credentials: "include", // Include cookies
      });

      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem("token", data.access);
      return true;
    } catch {
      return false;
    }
  };

  return apiAction;
}
