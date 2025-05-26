const VoteCounter = ({ votes }) => {
  const leftVotes = votes.filter((v) => v.vote === "1").length;
  const rightVotes = votes.filter((v) => v.vote === "2").length;
  const total = leftVotes + rightVotes;
  const leftPercent = total ? Math.round((leftVotes / total) * 100) : 0;
  const rightPercent = total ? 100 - leftPercent : 0;

  return (
    <div className="voting-results">
      <div>
        Левый участник: {leftVotes} ({leftPercent}%)
      </div>
      <div>
        Правый участник: {rightVotes} ({rightPercent}%)
      </div>
    </div>
  );
};

export default VoteCounter;
