export function getTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  return hash
    .split("&")
    .map((p) => p.split("="))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}).access_token;
}
