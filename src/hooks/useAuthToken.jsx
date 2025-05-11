import { useEffect, useState } from "react";
import { getTokenFromUrl } from "../components/utils/getTokenFromUrl";

export function useAuthToken() {
  const [token, setToken] = useState(() =>
    sessionStorage.getItem("twitch_token")
  );

  useEffect(() => {
    const t = getTokenFromUrl();
    if (t) {
      window.history.replaceState({}, "", "/");
      sessionStorage.setItem("twitch_token", t);
      setToken(t);
    }
  }, []);

  return token;
}
