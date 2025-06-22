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
      <div className="flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-4">Победитель:</h1>
        <img
          src={winner.url}
          alt={winner.description || "Победитель"}
          className="w-auto max-h-[70vh] shadow mb-4"
        />
        <p className="text-center text-lg whitespace-pre-wrap">{winner.description}</p>
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
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-center text-3xl font-bold mb-2">
        Раунд {round} из {calcRounds(images.length)}
      </h2>
      <p className="text-center text-sm text-gray-500 mb-4">
        Голоса учитываются только во время обратного отсчёта
      </p>

      <VotingImages
        leftSrc={leftImg}
        rightSrc={rightImg}
        onVote={handleSelect}
      />

      <div className="flex justify-center mt-4">
        <Timer
          initialSeconds={timePerRound}
          resetTrigger={round}
          setExpired={setExpired}
        />
      </div>

      <VoteCounter
        leftCount={leftCount}
        rightCount={rightCount}
        leftPercent={leftPct}
        rightPercent={rightPct}
      />

      <div className="flex justify-center mt-6">
        <MyButton onClick={nextRound}>Следующий раунд</MyButton>
      </div>
    </div>
  );
};
export default Tournament;
