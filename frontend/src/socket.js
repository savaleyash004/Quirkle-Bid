// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://quirkle-bid.onrender.com", {
  withCredentials: true,
  transports: ["websocket", "polling"]
});

export default socket;