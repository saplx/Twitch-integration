import React from "react";
import styles from "./VotingImages.module.css";

export default function VotingImages({ leftSrc, rightSrc, onVote }) {
  const handleClick = (choice) => {
    if (onVote) onVote(choice);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.imageWrapper}
        onClick={() => handleClick(leftSrc)}
      >
        <img src={leftSrc} alt="Left option" className={styles.image} />
      </button>
      <button
        className={styles.imageWrapper}
        onClick={() => handleClick(rightSrc)}
      >
        <img src={rightSrc} alt="Right option" className={styles.image} />
      </button>
    </div>
  );
}
