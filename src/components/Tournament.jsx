import { useCallback, useEffect, useState } from "react";
import VotingImages from "./VotingImages";
import Timer from "./Timer";
import VoteCounter from "./VoteCounter";
import { useVoteStats } from "../hooks/useVoteStats";
import { useTwitchChat } from "../hooks/useTwitchChat";
import MyButton from "./UI/Button/MyButton";

const Tournament = ({ images, token }) => {
  const [currentImages, setCurrentImages] = useState(images);
  const [nextStageImages, setNextStageImages] = useState([]);
  const [pairIndex, setPairIndex] = useState(0);
  const [winner, setWinner] = useState(null);
  const messages = useTwitchChat(token, "shiko_cx", "shiko_cx");

  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);
  const [expired, setExpired] = useState(false);
  const { leftCount, rightCount, leftPct, rightPct } = useVoteStats(
    messages,
    expired
  );

  const handleSelect = useCallback(
    (selected) => {
      const updatedNextRound = [...nextStageImages, selected];

      if (pairIndex + 2 >= currentImages.length) {
        if (updatedNextRound.length === 1) {
          setWinner(selected);
        } else {
          setCurrentImages(updatedNextRound);
          setNextStageImages([]);
          setPairIndex(0);
          setResetTimerTrigger((prev) => prev + 1);
        }
      } else {
        setNextStageImages((prev) => [...prev, selected]);
        setPairIndex((prev) => prev + 2);
        setResetTimerTrigger((prev) => prev + 1);
      }
    },
    [currentImages, nextStageImages, pairIndex]
  );

  const leftImg = currentImages[pairIndex];
  const rightImg = currentImages[pairIndex + 1];

  const nextRound = () => {
    if (leftCount > rightCount) {
      handleSelect(leftImg);
      setResetTimerTrigger((prev) => prev + 1);
      setExpired(false);
    }

    if (leftCount < rightCount) {
      handleSelect(rightImg);
      setResetTimerTrigger((prev) => prev + 1);
      setExpired(false);
    }
  };

  useEffect(() => {
    if (leftImg && !rightImg) {
      handleSelect(leftImg);
    }
  }, [leftImg, rightImg, handleSelect]);

  if (leftImg && !rightImg) {
    return null;
  }

  if (winner) {
    return (
      <div style={{ alignItems: "center" }}>
        <h1>Победитель:</h1>
        {
          <>
            <img
              key={winner.url}
              style={{ maxWidth: 800 }}
              src={winner.url}
              alt="Победитель"
            />
            <span>{winner.description}</span>
          </>
        }
        <div style={{ display: "flex", justifyContent: "center" }}></div>
      </div>
    );
  }

  return (
    <>
      <div className="content">
        <span style={{ display: "flex", justifyContent: "center" }}>
          Голоса учитываются только во время обратного отсчета
        </span>
        <VotingImages
          leftSrc={leftImg}
          rightSrc={rightImg}
          onVote={handleSelect}
        />
        <Timer
          initialSeconds={10}
          resetTrigger={resetTimerTrigger}
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
