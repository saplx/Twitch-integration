import styles from "./VotingImages.module.css";

export default function VotingImages({ leftSrc, rightSrc, onVote }) {
  const handleClick = (imgObj) => {
    if (onVote) onVote(imgObj);
  };

  return (
    <>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.imageWrapper}
          onClick={() => handleClick(leftSrc)}
        >
          <img
            src={leftSrc.url}
            alt="Первый участник"
            className={styles.image}
          />
        </button>
        <button
          type="button"
          style={{ background: "#111", borderRadius: 5 }}
          className={styles.imageWrapper}
          onClick={() => handleClick(rightSrc)}
        >
          <img
            src={rightSrc.url}
            alt="Второй участник"
            className={styles.image}
          />
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ whiteSpace: "pre-wrap" }}>{leftSrc.description}</div>
        <div style={{ whiteSpace: "pre-wrap" }}>{rightSrc.description}</div>
      </div>
    </>
  );
}
