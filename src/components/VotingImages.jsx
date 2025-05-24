import React from "react";
import styles from "./VotingImages.module.css";
import Timer from "./Timer";

export default function VotingImages({ leftSrc, rightSrc, onVote }) {
  const handleClick = (choice) => {
    if (onVote) onVote(choice);
  };

  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.imageWrapper}
          onClick={() => handleClick(leftSrc)}
        >
          <img src={leftSrc} alt="Левая картинка" className={styles.image} />
        </button>
        <button
          style={{ background: "#111", borderRadius: 5 }}
          className={styles.imageWrapper}
          onClick={() => handleClick(rightSrc)}
        >
          <img src={rightSrc} alt="Правая картинка" className={styles.image} />
        </button>
      </div>
      <Timer />
    </>
  );
}
