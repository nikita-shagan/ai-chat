import { backendBaseUrl } from "@/shared/config";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN ?? "";

const getQueryParams = (data?: Record<string, string>) => {
  const queryParamsString = new URLSearchParams(data).toString();
  return queryParamsString ? `?${queryParamsString}` : "";
};

export async function request<T>(
  path: string,
  options?: {
    method?: string;
    body?: unknown;
    params?: Record<string, string>;
  },
): Promise<T> {
  const params = getQueryParams(options?.params);
  const response = await fetch(`${backendBaseUrl}${path}${params}`, {
    method: options?.method || "GET",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as T;
}
