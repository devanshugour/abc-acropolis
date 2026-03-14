import type { APIResponse } from "@/types";

const BASE = "/api";

export async function apiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<APIResponse<T>> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      success: false,
      error: json.error ?? { code: "REQUEST_FAILED", message: res.statusText },
      timestamp: new Date().toISOString(),
    };
  }
  return json as APIResponse<T>;
}
