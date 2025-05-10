import { useState } from "react";
import MyButton from "./components/UI/Button/MyButton";
import DragAndDropImages from "./components/UI/DragAndDropField/DragAndDropImages";

function App() {
  const [images, setImages] = useState([]);
  const [time, setTime] = useState(30);
  const [isStartVote, setStartVote] = useState(false);

  return (
    <>
      {!isStartVote ? (
        <>
          <DragAndDropImages setImages={setImages} />
          <div style={{ display: "flex", gap: 10, margin: 10 }}>
            {images.map((file, idx) => (
              <div key={idx}>
                <img src={URL.createObjectURL(file)} alt="" width={100} />
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
          {`Раунд 1 из ${Math.ceil(images.length / 2)}`}
          <div></div>
          <div style={{ display: "flex", gap: 10, margin: "10px 0" }}>
            <MyButton>1</MyButton>
            <MyButton>2</MyButton>
          </div>
          <div style={{ display: "flex", gap: 10, margin: "10px 0" }}>
            <MyButton>Назад</MyButton>
            <MyButton>Вперед</MyButton>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
