const VoteCounter = ({ leftCount, rightCount, leftPercent, rightPercent }) => (
  <div
    className="voting-results flex justify-around"
  >
    <div>
      {leftCount} ({leftPercent}%)
    </div>
    <div>
      {rightCount} ({rightPercent}%)
    </div>
  </div>
);
export default VoteCounter;
