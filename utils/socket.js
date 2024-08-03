import socketIo from "socket.io-client";
const socket = socketIo(process.env.API_URL, { transports: ["websocket"] });

export default socket;