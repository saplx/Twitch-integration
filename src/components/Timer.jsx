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
    <div style={{ textAlign: "center" }}>
      <span style={{ fontWeight: "bold", fontSize: 30 }}>{secondsLeft}</span>
    </div>
  );
};

export default Timer;
