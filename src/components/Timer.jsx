import { useEffect, useState } from "react";

const Timer = ({ initialSeconds = 30 }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <div style={{ textAlign: "center" }}>
      <span style={{ fontWeight: "bold" }}>{secondsLeft}</span>
    </div>
  );
};

export default Timer;
