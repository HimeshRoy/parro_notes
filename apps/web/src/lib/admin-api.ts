import {
  apiRequest,
  getAdminToken,
} from "@/lib/api";

export async function adminApiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAdminToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  return apiRequest<T>(endpoint, {
    ...options,
    token,
  });
}