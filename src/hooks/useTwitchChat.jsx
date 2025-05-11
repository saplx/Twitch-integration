import { useEffect, useState, useCallback } from "react";
import TwitchChatService from "../service/TwitchChatService";

export function useTwitchChat(token, channel, username) {
  const [messages, setMessages] = useState([]);
  const onMessage = useCallback(({ nick, message }) => {
    setMessages((msgs) => [...msgs, { nick, message }]);
  }, []);

  useEffect(() => {
    if (!token) return;
    const chat = new TwitchChatService({ channel, username, token, onMessage });
    chat.connect();
    return () => chat.disconnect();
  }, [token, channel, username, onMessage]);

  return messages;
}
