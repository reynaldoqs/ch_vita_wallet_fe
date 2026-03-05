const baseURL = import.meta.env.VITE_API_URL ?? '';

export const apiClient = {
  get: <T>(path: string) => fetch(`${baseURL}${path}`).then((r) => r.json() as Promise<T>),
  post: <T>(path: string, body: unknown) =>
    fetch(`${baseURL}${path}`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }).then((r) => r.json() as Promise<T>),
};
