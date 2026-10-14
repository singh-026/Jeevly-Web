import { env } from "@/config/env";

/** Shape of every error body the Jeevly backend returns. */
export type ApiErrorBody = {
  error: { code: string; message: string; field?: string };
};

/**
 * A failed request. `status` is 0 when no response arrived (offline, CORS,
 * timeout, or the API URL isn't configured); `code` comes from the backend's
 * error body when there is one.
 */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly field?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const TIMEOUT_MS = 15_000;

/** POSTs `body` as JSON to `path` on the Jeevly backend and returns the parsed JSON response. */
export async function postJson<TResponse>(path: string, body: unknown): Promise<TResponse> {
  if (!env.apiBaseUrl) {
    throw new ApiError(0, "not_configured", "NEXT_PUBLIC_API_BASE_URL is not set.");
  }

  let response: Response;
  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (cause) {
    const timedOut = cause instanceof DOMException && cause.name === "TimeoutError";
    throw new ApiError(0, timedOut ? "timeout" : "network_error", timedOut ? "The request timed out." : "Network error.");
  }

  const data: unknown = await response.json().catch(() => null);
  if (response.ok) return data as TResponse;

  const error = (data as ApiErrorBody | null)?.error;
  throw new ApiError(
    response.status,
    error?.code ?? "http_error",
    error?.message ?? `Request failed with status ${response.status}.`,
    error?.field,
  );
}
