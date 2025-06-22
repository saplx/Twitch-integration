import { useEffect, useState } from "react";
import MyButton from "./components/UI/Button/MyButton";
import DragAndDropImages from "./components/UI/DragAndDropField/DragAndDropImages";
import { useAuthToken } from "./hooks/useAuthToken";
import useTwitchLoginFromToken from "./hooks/useTwitchLoginFromToken";
import Tournament from "./components/Tournament";
import EditableImageList from "./components/EditableImageList";

function App() {
  const [isStartVote, setStartVote] = useState(false);
  const [images, setImages] = useState([]);
  const [timePerRound, setTimePerRound] = useState(30);
  const token = useAuthToken();
  const { login, loading: loginLoading, error: loginError } =
    useTwitchLoginFromToken(token);

  useEffect(() => {
    return () => {
      images.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [images]);

  if (loginLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">Получаем ваш ник из Twitch...</p>
      </div>
    );
  }

  if (loginError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Не удалось определить ник: {loginError}</p>
      </div>
    );
  }

  if (!token) {
    const clientId = "on71igyuj4apxm7tn09o7w6bdl8k3v";
    const redirectUrl = encodeURIComponent("http://localhost:5174");
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=chat:read`;
    return (
      <div className="flex items-center justify-center h-screen">
        <a
          href={authUrl}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          Авторизоваться через Twitch
        </a>
      </div>
    );
  }

  const onChangeTime = (e) => {
  const val = Number(e.target.value);
  setTimePerRound(val < 10 ? 10 : val);
}

  return (
    <main className="container mx-auto px-4 py-8">
      {!isStartVote ? (
        <>
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-white">Чат подключён</h2>
            <DragAndDropImages setImages={setImages} />
            
            
            <div className="flex items-center mt-3 gap-2 border-dashed border-gray-300">
              <label htmlFor="timePerRound" className="text-white p-2.5">
                Время на раунд (сек):
              </label>
              <input
                type="number"
                id="timePerRound"
                min={10}
                value={timePerRound}
                onChange={onChangeTime}
                className="w-20 px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex flex-row items-center gap-4 mt-4">
              <MyButton onClick={() => setStartVote(true)}>Таймер</MyButton>
              <MyButton onClick={() => setImages([])}>Очистить</MyButton>
            </div>
          </div>
          <div className="mt-6">
            <EditableImageList images={images} setImages={setImages} />
          </div>
        </>
      ) : (
        <div className="max-w-[1400px] mx-auto">
          <Tournament
            images={images}
            timePerRound={timePerRound}
            token={token}
            login={login}
          />
        </div>
      )}
    </main>
  );
}

export default App;
