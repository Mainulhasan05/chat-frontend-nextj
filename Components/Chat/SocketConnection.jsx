"use client";
import React from "react";
import { io } from "socket.io-client";
import socketIo from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CreateRoomModal from "./CreateRoomModal";
import { useChatApp } from "@/context/ChatAppContext";

const token = "your_jwt_secret_key";
const socket2 = io(process.env.API_URL, {
  auth: {
    token: token,
  },
});
let socket;
const SocketConnection = () => {
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const { user } = useChatApp();

  useEffect(() => {
    socket = socketIo(process.env.API_URL, { transports: ["websocket"] });

    socket.on("connection", (data) => {
      setConnected(true);
    });
    socket.on("disconnect", () => {
      setConnected(false);
    });
    socket.on("reconnect", () => {
      setConnected(true);
    });
    socket.on("reconnecting", () => {
      setConnected(false);
    });
    socket.on("reconnect_failed", () => {
      setConnected(false);
    });
    socket.on("reconnect_error", () => {
      setConnected(false);
    });
    const token = Cookies.get("token");
    if (!token) {
      handleLogout();
    }
  }, []);
  const handleLogout = () => {
    // socket.emit("test", {
    //   name: "Md. Mainul Hasan",
    // });
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  };
  return (
    <div>
      <div className="d-flex gap-5 justify-content-between w-100">
        <h5>Anonymous chat</h5>
        {/* <span
          className={`my-2 fw-bold ${
            connected ? "text-success" : "text-danger"
          }`}
        >
          {connected ? "Connected" : "Disconnected"}
        </span> */}
        <span>{user?.full_name}</span>
      </div>
      <div>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <br />
      <button
        className="btn border"
        data-bs-toggle="modal"
        data-bs-target="#createRoomModal"
      >
        Create/Join Room +
      </button>
      <CreateRoomModal />
    </div>
  );
};

export default SocketConnection;
