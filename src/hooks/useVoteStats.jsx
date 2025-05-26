import { useEffect, useMemo, useState } from "react";

export function useVoteStats(messages, expired) {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    if (messages.length === 0) return;
    const last = messages[messages.length - 1];

    if (
      !expired &&
      !votes.some((v) => v.user === last.nick) &&
      (last.message === "1" || last.message === "2")
    ) {
      setVotes((prev) => [...prev, { user: last.nick, vote: last.message }]);
    }
  }, [messages, votes, expired]);

  return useMemo(() => {
    const leftCount = votes.filter((v) => v.vote === "1").length;
    const rightCount = votes.length - leftCount;
    const total = votes.length;
    const leftPercent = total ? Math.round((leftCount / total) * 100) : 0;
    const rightPercent = total ? 100 - leftPercent : 0;
    return {
      leftCount,
      rightCount,
      leftPct: leftPercent,
      rightPct: rightPercent,
      total,
    };
  }, [votes]);
}
