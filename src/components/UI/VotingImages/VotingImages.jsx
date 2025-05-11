import React from "react";
import styles from "./VotingImages.module.css";

export default function VotingImages({ leftSrc, rightSrc, onVote }) {
  const handleClick = (choice) => {
    if (onVote) onVote(choice);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper} onClick={() => handleClick("left")}>
        <img src={leftSrc} alt="Left option" className={styles.image} />
      </div>
      <div className={styles.imageWrapper} onClick={() => handleClick("right")}>
        <img src={rightSrc} alt="Right option" className={styles.image} />
      </div>
    </div>
  );
}
