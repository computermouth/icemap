// @deprecated
export function apiUrl() {
  if (import.meta.env.MODE === 'development') {
    return "http://localhost:7676/api/"
  }
  else {
    return "/api/"
  }
}
