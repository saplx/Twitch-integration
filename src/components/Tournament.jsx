import { useEffect, useState } from "react";
import MyButton from "./UI/Button/MyButton";
import VotingImages from "./VotingImages";

const Tournament = ({ images, descriptions }) => {
  const [currentRound, setCurrentRound] = useState(images);
  const [nextRound, setNextRound] = useState([]);
  const [winner, setWinner] = useState(null);
  const [pairIndex, setPairIndex] = useState(0);

  const totalRounds = Math.ceil(images.length / 2);

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

  const leftImg = currentRound[pairIndex];
  const rightImg = currentRound[pairIndex + 1];

  useEffect(() => {
    if (leftImg && !rightImg) {
      handleSelect(leftImg);
    }
  }, [currentRound, pairIndex]);

  if (winner) {
    return (
      <div style={{ alignItems: "center" }}>
        <h1>Победители</h1>
        <img style={{ maxWidth: 800 }} src={winner} alt="Победитель" />
      </div>
    );
  }

  return (
    <>
      <h1>{`Раунд ${pairIndex / 2 + 1} из ${totalRounds}`}</h1>
      <div className="content">
        <VotingImages
          leftSrc={leftImg}
          rightSrc={rightImg}
          onVote={handleSelect}
        />
        <div>{descriptions[pairIndex]}</div>
        <div>{descriptions[pairIndex]}</div>
      </div>
    </>
  );
};

export default Tournament;
