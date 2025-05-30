import { useEffect, useMemo, useState } from "react";

export function useVoteStats(messages, expired, round) {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    setVotes([]);
  }, [round]);

  useEffect(() => {
    if (expired) return;
    if (messages.length === 0) return;

    const { nick, message } = messages[messages.length - 1];

    const collapsed = message.replace(/([12])\1*/g, "$1");

    if (
      (collapsed === "1" || collapsed === "2") &&
      !votes.find((v) => v.user === nick)
    ) {
      setVotes((prev) => [...prev, { user: nick, vote: collapsed }]);
    }
  }, [messages, expired]);

  return useMemo(() => {
    const total = votes.length;
    const leftCount = votes.filter((v) => v.vote === "1").length;
    const leftPct = total ? Math.round((leftCount / total) * 100) : 0;
    return {
      leftCount,
      rightCount: total - leftCount,
      leftPct,
      rightPct: total ? 100 - leftPct : 0,
      total,
    };
  }, [votes]);
}
