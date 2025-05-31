import { useEffect, useState } from "react";
import MyButton from "./components/UI/Button/MyButton";
import DragAndDropImages from "./components/UI/DragAndDropField/DragAndDropImages";
import { useAuthToken } from "./hooks/useAuthToken";
import Tournament from "./components/Tournament";
import EditableImageList from "./components/EditableImageList";

function App() {
  const [isStartVote, setStartVote] = useState(false);
  const [images, setImages] = useState([]);

  const token = useAuthToken();

  useEffect(() => {
    return () => {
      images.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [images]);

  if (!token) {
    const clientId = "bzwyt04fh0h7io575i24xwzbzpfkl7";
    const redirectUrl = encodeURIComponent(
      "https://saplx.github.io/Twitch-integration/"
    );
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
        <div>
          <Tournament images={images} token={token} timePerRound={30} />
        </div>
      )}
    </>
  );
}

export default App;
