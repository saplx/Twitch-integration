import { useEffect, useState } from "react";

const Timer = ({ initialSeconds = 30, resetTrigger = 0, setExpired }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [resetTrigger, initialSeconds]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, setExpired]);

  return (
    <div className="items-center">
      <span className="font-bold text-3xl">{secondsLeft}</span>
    </div>
  );
};

export default Timer;
