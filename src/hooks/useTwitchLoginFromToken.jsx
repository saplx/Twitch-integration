import { useState, useEffect } from "react";

export function useTwitchLoginFromToken(token) {
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    fetch("https://id.twitch.tv/oauth2/validate", {
      headers: {
        Authorization: `OAuth ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Ошибка валидации токена: ${res.status}`);
        }
        const data = await res.json();
        setLogin(data.login);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  return { login, loading, error };
}

export default useTwitchLoginFromToken;
