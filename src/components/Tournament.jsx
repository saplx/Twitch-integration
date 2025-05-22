import { useEffect, useState } from "react";
import MyButton from "./UI/Button/MyButton";
import VotingImages from "./UI/VotingImages/VotingImages";

const Tournament = ({ images }) => {
  const [currentRound, setCurrentRound] = useState(images);
  const [nextRound, setNextRound] = useState([]);
  const [winner, setWinner] = useState(null);
  const [pairIndex, setPairIndex] = useState(0);

  const totalRounds = Math.ceil(Math.log2(images.length));

  const handleSelect = (selected) => {
    const updatedNextRound = [...nextRound, selected];

    if (pairIndex + 2 >= currentRound.length) {
      if (updatedNextRound.length === 1) {
        setWinner(updatedNextRound[0]);
      } else {
        setCurrentRound(updatedNextRound);
        setNextRound([]);
        setPairIndex(0);
      }
    } else {
      setNextRound((prev) => [...prev, selected]);
      setPairIndex((prev) => prev + 2);
    }
  };

  const left = currentRound[pairIndex];
  const right = currentRound[pairIndex + 1];

  useEffect(() => {
    if (left && !right) {
      handleSelect(left);
    }
  }, [currentRound, pairIndex]);

  if (winner) {
    return (
      <div>
        <h1>Победитель!</h1>
        <img src={winner} alt="Победитель" />
      </div>
    );
  }

  return (
    <>
      <div className="content">
        <VotingImages leftSrc={left} rightSrc={right} onVote={handleSelect} />
      </div>
    </>
  );
};

export default Tournament;
