const VoteCounter = ({ leftCount, rightCount, leftPercent, rightPercent }) => (
  <div
    className="voting-results"
    style={{ display: "flex", justifyContent: "space-around" }}
  >
    <div>
      Левый: {leftCount} ({leftPercent}%)
    </div>
    <div>
      Правый: {rightCount} ({rightPercent}%)
    </div>
  </div>
);
export default VoteCounter;
