import { useEffect, useState } from "react";
import MyButton from "./components/UI/Button/MyButton";
import DragAndDropImages from "./components/UI/DragAndDropField/DragAndDropImages";
import VotingImages from "./components/UI/VotingImages/VotingImages";
import TwitchChatService from "./service/TwitchChatService";
import { useAuthToken } from "./hooks/useAuthToken";
import { useTwitchChat } from "./hooks/useTwitchChat";

function App() {
  const [images, setImages] = useState([]);
  const [time, setTime] = useState(30);
  const [isStartVote, setStartVote] = useState(false);
  const totalRounds = Math.ceil(images.length / 2);
  const [currentRound, setCurrentRound] = useState(0);
  const [voteInRounds, setVoteInRounds] = useState([]);

  const token = useAuthToken();
  const messages = useTwitchChat(token, "shiko_cx", "shiko_cx");

  const leftURI = images[currentRound];
  const rightURI = images[images.length - 1 - currentRound];

  useEffect(() => {
    return () => {
      images.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [images]);

  const onVote = (choice) => {
    if (currentRound < totalRounds) {
      const votedURI = choice === "left" ? leftURI : rightURI;

      setVoteInRounds((prev) => [
        ...prev,
        { round: currentRound + 1, choice, uri: votedURI },
      ]);
      setCurrentRound((prev) => prev + 1);
      console.log(`you choice in round ${currentRound}: ${choice}`);
      console.log(voteInRounds);
    }
  };

  const prevRound = () => {
    if (currentRound > 0) setCurrentRound(currentRound - 1);
  };

  const nextRound = () => {
    if (currentRound < totalRounds) setCurrentRound(currentRound + 1);
  };

  if (!token) {
    const clientId = "";
    const redirectUri = encodeURIComponent("http://localhost:5173/");
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=chat:read`;
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
            <h2>Чат shiko_cx подключён — смотрите консоль браузера</h2>
          </div>
          <DragAndDropImages setImages={setImages} />
          <div style={{ display: "flex", gap: 10, margin: 10 }}>
            {images.map((url, idx) => (
              <div key={idx}>
                <img src={url} alt="" width={100} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 5, marginTop: 15 }}>
            <MyButton onClick={() => setStartVote(true)}>Таймер</MyButton>
            <MyButton
              onClick={() => {
                setStartVote(true);
              }}
            >
              Вручную
            </MyButton>
            <MyButton onClick={() => setImages([])}>Очистить</MyButton>
          </div>{" "}
        </>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "center",
              fontSize: 25,
              fontWeight: 600,
            }}
          >{`Раунд ${currentRound} из ${totalRounds}`}</div>
          <div>
            <VotingImages
              leftSrc={leftURI}
              rightSrc={rightURI}
              onVote={onVote}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              margin: "10px 0",
              justifyContent: "center",
            }}
          >
            <MyButton onClick={() => prevRound()}>Назад</MyButton>
            <MyButton onClick={() => nextRound()}>Вперед</MyButton>
          </div>
        </div>
      )}
      <div>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.nick}:</strong> {m.message}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
