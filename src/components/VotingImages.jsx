
export default function VotingImages({ leftSrc, rightSrc, onVote }) {
  const handleClick = (imgObj) => {
    if (onVote) onVote(imgObj);
  };

  return (
    <>
      <div className="w-full justify-center flex gap-5">
        <button className="flex overflow-hidden"
          type="button"
          onClick={() => handleClick(leftSrc)}
        >
          <img
            src={leftSrc?.url}
            alt="Первый участник"
            className="max-w-full max-h-[70vh] w-auto h-auto object-contain cursor-pointer hover:scale-105 duration-200 ease-in-out"
          />
        </button>
        <button
          className="flex overflow-hidden"
          type="button"
          onClick={() => handleClick(rightSrc)}
        >
          <img
            className="max-w-full max-h-[70vh] w-auto h-auto object-contain cursor-pointer hover:scale-105 duration-200 ease-in-out"
            src={rightSrc?.url}
            alt="Второй участник"
          />
        </button>
      </div>
      <div className="flex justify-around mt-4">
        <div
        className="whitespace-pre-wrap text-center box-border w-full"
        >
          {leftSrc?.description}
        </div>
        <div
        className="whitespace-pre-wrap text-center box-border w-full"
        >
          {rightSrc?.description}
        </div>
      </div>
    </>
  );
}
