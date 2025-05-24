import { useEffect, useState } from "react";
import MyButton from "./components/UI/Button/MyButton";
import DragAndDropImages from "./components/UI/DragAndDropField/DragAndDropImages";
import { useAuthToken } from "./hooks/useAuthToken";
import { useTwitchChat } from "./hooks/useTwitchChat";
import Tournament from "./components/Tournament";
import ImageList from "./components/ImageList";

function App() {
  const [isStartVote, setStartVote] = useState(false);
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState(images.map(() => ""));

  const token = useAuthToken();
  const messages = useTwitchChat(token, "shiko_cx", "shiko_cx");

  useEffect(() => {
    return () => {
      images.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [images]);

  if (!token) {
    const clientId = "bzwyt04fh0h7io575i24xwzbzpfkl7";
    const redirectUri = encodeURIComponent("http://localhost:5173/");
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=chat:read`;
    return (
      <div style={{ padding: 20 }}>
        <a href={authUrl}>Авторизоваться через Twitch</a>
      </div>
    );
  }

  const handleClear = () => {
    setImages([]);
    setDescriptions([]);
  };

  return (
    <>
      {!isStartVote ? (
        <>
          <div style={{ padding: 20 }}>
            <h2>Чат подключён</h2>
          </div>
          <DragAndDropImages setImages={setImages} />
          <ImageList
            images={images}
            description={descriptions}
            setDescription={setDescriptions}
          />
          <div style={{ display: "flex", gap: 5, marginTop: 15 }}>
            <MyButton onClick={() => setStartVote(true)}>Таймер</MyButton>
            <MyButton onClick={() => handleClear()}>Очистить</MyButton>
          </div>{" "}
        </>
      ) : (
        <div>
          <Tournament images={images} descriptions={descriptions} />
        </div>
      )}
    </>
  );
}

export default App;
