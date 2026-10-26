const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api";

interface ApiOptions extends RequestInit {
  token?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const {
    token,
    headers,
    body,
    ...requestOptions
  } = options;

  const isFormData =
    typeof FormData !== "undefined" &&
    body instanceof FormData;

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...requestOptions,
      body,
      headers: {
        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),
        ...headers,
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    },
  );

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    if (!response.ok) {
      throw new Error(
        `API returned an invalid response (${response.status})`,
      );
    }

    return {} as T;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "Something went wrong";

    throw new Error(message);
  }

  return data as T;
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("parro_admin_token");
}

export function getStoredAdmin() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem("parro_admin");

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("parro_admin_token");
  localStorage.removeItem("parro_admin");
}