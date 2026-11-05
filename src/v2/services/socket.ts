import { io, Socket } from "socket.io-client";
import { BASE_URL, TOKEN_KEY, readStored } from "./http";

// The API serves REST under /api and the socket at its origin, e.g. https://host/api -> https://host
export const SOCKET_ORIGIN = (() => {
  try {
    return new URL(BASE_URL || "").origin;
  } catch {
    return BASE_URL || "";
  }
})();

// Reads the token on every (re)connection so a refreshed login is picked up.
export function connectChatSocket(): Socket {
  return io(SOCKET_ORIGIN, {
    auth: (cb) => cb({ token: readStored<string>(TOKEN_KEY) }),
    transports: ["websocket", "polling"],
    reconnectionDelayMax: 8000,
  });
}
