/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A small helper for server-side API proxy calls.
 *
 * It is intentionally minimal and intended to be used from Next.js API routes
 * (app/api/*) to forward requests to an upstream backend while adding required
 * headers (like ACCESS-PASS-KEY).
 */

export type ApiCallOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  /**
   * Explicit access key if you want to override the environment value.
   * Defaults to process.env.ACCESS_PASS_KEY.
   */
  accessPassKey?: string;
};

export type ApiCallResult<T = any> = {
  ok: boolean;
  status: number;
  data: T | null;
  error?: string;
};

export async function apiCall<T = any>(
  url: string,
  options: ApiCallOptions = {},
): Promise<ApiCallResult<T>> {
  const { method = "GET", body, headers = {}, accessPassKey } = options;

  const finalHeaders: Record<string, string> = {
    "ACCESS-PASS-KEY": accessPassKey ?? process.env.ACCESS_PASS_KEY ?? "",
    Accept: "application/json",
    ...headers,
  };

  const init: RequestInit = {
    method,
    headers: finalHeaders,
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
    finalHeaders["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(url, init);
    let data: any = null;

    try {
      data = await res.json();
    } catch {
      // ignore - some endpoints may return empty responses
    }

    return {
      ok: res.ok,
      status: res.status,
      data,
    };
  } catch (error: any) {
    return {
      ok: false,
      status: 500,
      data: null,
      error: error?.message || "Unknown error",
    };
  }
}
