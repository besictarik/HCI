type ApiErrorResponse = {
  errors?: { message?: string }[];
  message?: string;
} | null;

export const parseApiError = async (response: Response, fallback: string) => {
  const data = (await response.json().catch(() => null)) as ApiErrorResponse;

  return data?.errors?.[0]?.message ?? data?.message ?? fallback;
};

export const withRedirectParam = (path: string, redirect: string) => {
  return `${path}?redirect=${encodeURIComponent(redirect)}`;
};
