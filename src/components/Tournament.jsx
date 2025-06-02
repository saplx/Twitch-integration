import { useCallback, useEffect, useState } from "react";
import VotingImages from "./VotingImages";
import Timer from "./Timer";
import VoteCounter from "./VoteCounter";
import { useVoteStats } from "../hooks/useVoteStats";
import { useTwitchChat } from "../hooks/useTwitchChat";
import MyButton from "./UI/Button/MyButton";

const Tournament = ({ images, timePerRound, token, login }) => {
  const [currentImages, setCurrentImages] = useState(images);
  const [selectedImages, setSelectedStageImages] = useState([]);
  const [pairIndex, setPairIndex] = useState(0);
  const [winner, setWinner] = useState(null);

  const messages = useTwitchChat(token, login, login);

  const [round, setRound] = useState(1);
  const [expired, setExpired] = useState(false);
  const { leftCount, rightCount, leftPct, rightPct } = useVoteStats(
    messages,
    expired,
    round
  );

  const handleSelect = useCallback(
    (selected) => {
      const updatedNextRound = [...selectedImages, selected];

      if (pairIndex + 2 >= currentImages.length) {
        if (updatedNextRound.length === 1) {
          setWinner(selected);
        } else {
          setCurrentImages(updatedNextRound);
          setSelectedStageImages([]);
          setPairIndex(0);
        }
      } else {
        setSelectedStageImages((prev) => [...prev, selected]);
        setPairIndex((prev) => prev + 2);
      }
      setRound((prev) => prev + 1);
      setExpired(false);
    },
    [currentImages, selectedImages, pairIndex]
  );

  const leftImg = currentImages[pairIndex];
  const rightImg = currentImages[pairIndex + 1];

  const nextRound = () => {
    if (leftCount > rightCount) {
      handleSelect(leftImg);
    }

    if (leftCount < rightCount) {
      handleSelect(rightImg);
    }
  };

  useEffect(() => {
    if (leftImg && !rightImg) {
      handleSelect(leftImg);
      setRound((prev) => prev - 1);
    }
  }, [leftImg, rightImg, handleSelect]);

  if (leftImg && !rightImg) {
    return null;
  }

  if (winner) {
    return (
      <div style={{ alignItems: "center" }}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 10,
            fontSize: 50,
          }}
        >
          Победитель:
        </h1>
        {
          <>
            <img
              key={winner.url}
              style={{ maxWidth: 800 }}
              src={winner.url}
              alt="Победитель"
            />
            <span
              style={{
                whiteSpace: "pre-wrap",
                width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                margin: 10,
                fontSize: 20,
              }}
            >
              {winner.description}
            </span>
          </>
        }

        <div style={{ display: "flex", justifyContent: "center" }}></div>
      </div>
    );
  }

  const calcRounds = (n) => {
    let total = 0;

    for (let i = n / 2; i > 1; i = i / 2) {
      total += i;
    }
    return Math.floor(total) + 1;
  };

  return (
    <>
      <div className="content">
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Раунд {round} из {calcRounds(images.length)}
        </h2>
        <span style={{ display: "flex", justifyContent: "center" }}>
          Голоса учитываются только во время обратного отсчета
        </span>
        <VotingImages
          leftSrc={leftImg}
          rightSrc={rightImg}
          onVote={handleSelect}
        />
        <Timer
          initialSeconds={timePerRound}
          resetTrigger={round}
          setExpired={setExpired}
        />
        <VoteCounter
          leftCount={leftCount}
          rightCount={rightCount}
          leftPercent={leftPct}
          rightPercent={rightPct}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MyButton onClick={() => nextRound()}>Следующий раунд</MyButton>
        </div>
      </div>
    </>
  );
};
export default Tournament;
