import { useEffect, useState } from "react";
import VotingImages from "./VotingImages";

const Tournament = ({ images, messages }) => {
  const [currentImages, setCurrentImages] = useState(images);
  const [nextStageImages, setNextStageImages] = useState([]);
  const [pairIndex, setPairIndex] = useState(0);
  const [winner, setWinner] = useState(null);

  const [votes, setVotes] = useState([]);

  const handleSelect = (selected) => {
    const updatedNextRound = [...nextStageImages, selected];

    if (pairIndex + 2 >= currentImages.length) {
      if (updatedNextRound.length === 1) {
        setWinner(selected);
      } else {
        setCurrentImages(updatedNextRound);
        setNextStageImages([]);
        setPairIndex(0);
      }
    } else {
      setNextStageImages((prev) => [...prev, selected]);
      setPairIndex((prev) => prev + 2);
    }
  };

  useEffect(() => {
    if (messages.length === 0) return;

    const last = messages[messages.length - 1];

    if (
      !votes.some((v) => v.user === last.nick) &&
      (last.message === "1" || last.message === "2")
    ) {
      setVotes((prev) => [...prev, { user: last.nick, vote: last.message }]);
    }
  }, [messages, votes]);

  const leftImg = currentImages[pairIndex];
  const rightImg = currentImages[pairIndex + 1];

  useEffect(() => {
    if (leftImg && !rightImg) {
      handleSelect(leftImg);
    }
  }, [leftImg, rightImg]);

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
        <VotingImages
          leftSrc={leftImg}
          rightSrc={rightImg}
          onVote={handleSelect}
        />
      </div>
    </>
  );
};
export default Tournament;
