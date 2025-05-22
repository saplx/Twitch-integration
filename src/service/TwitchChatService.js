import tmi from "tmi.js";

export default class TwitchChatService {
  constructor({ channel, username, token, onMessage }) {
    this.channel = channel;
    this.onMessage = onMessage || (() => {});
    this.client = new tmi.Client({
      options: {
        debug: false,
        skipUpdatingEmotesets: true,
      },
      connection: { reconnect: true },
      identity: { username, password: `oauth:${token}` },
      channels: [channel],
    });
  }

  connect() {
    this.client.connect().catch(console.error);
    this.client.on("message", (chan, tags, message, self) => {
      if (self) return;
      const nick = tags["display-name"] || tags.username;
      this.onMessage({ nick, message });
    });
  }

  disconnect() {
    this.client.disconnect();
  }
}
