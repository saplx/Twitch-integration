import { useEffect, useState } from "react";
import MyButton from "./components/UI/Button/MyButton";
import DragAndDropImages from "./components/UI/DragAndDropField/DragAndDropImages";
import { useAuthToken } from "./hooks/useAuthToken";
import Tournament from "./components/Tournament";
import EditableImageList from "./components/EditableImageList";
import useTwitchLoginFromToken from "./hooks/useTwitchLoginFromToken";

function App() {
  const [isStartVote, setStartVote] = useState(false);
  const [images, setImages] = useState([]);

  const token = useAuthToken();
  const {
    login,
    loading: loginLoading,
    error: loginError,
  } = useTwitchLoginFromToken(token);

  useEffect(() => {
    return () => {
      images.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [images]);

  if (loginLoading) {
    return <div>Получаем ваш ник из Twitch...</div>;
  }

  if (loginError) {
    return (
      <div style={{ color: "red" }}>
        Не удалось определить ник: {loginError}
      </div>
    );
  }

  if (!token) {
    const clientId = "on71igyuj4apxm7tn09o7w6bdl8k3v";
    const redirectUrl = encodeURIComponent("http://localhost:5174");
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=chat:read`;
    return (
      <div style={{ padding: 20 }}>
        <a href={authUrl}>Авторизоваться через Twitch</a>
      </div>
    );
  }

  return (
    <>
      {!isStartVote ? (
        <>
          <div style={{ padding: 20 }}>
            <h2>Чат подключён</h2>
          </div>
          <DragAndDropImages setImages={setImages} />
          <div style={{ display: "flex", gap: 5, marginTop: 15 }}>
            <MyButton onClick={() => setStartVote(true)}>Таймер</MyButton>
            <MyButton onClick={() => setImages([])}>Очистить</MyButton>
          </div>
          <EditableImageList images={images} setImages={setImages} />
        </>
      ) : (
        <div style={{ maxWidth: 1400 }}>
          <Tournament
            images={images}
            timePerRound={30}
            token={token}
            login={login}
          />
        </div>
      )}
    </>
  );
}

export default App;
