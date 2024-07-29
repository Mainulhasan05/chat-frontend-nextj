"use client";
import { useChatApp } from "@/context/ChatAppContext";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";

let socket;
let timer;

const MessageInterface = () => {
  const { selectedRoomId } = useChatApp();
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState();
  const [status, setStatus] = useState("no one");
  const [page, setPage] = useState(1);

  useEffect(() => {
    socket = socketIo(process.env.API_URL, { transports: ["websocket"] });

    socket.on("new_message", (data) => {
      loadMessages();
    });
    socket.on("typing", (data) => {
      setStatus(data);

      timer = setTimeout(() => {
        setStatus("no one");
      }, 3000);
    });

    socket.on("loadMessage", () => {
      loadMessages();
      document.getElementById("audio").play();
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      socket.emit("joinRoom", {
        token: Cookies.get("token"),
        roomId: selectedRoomId,
      });
      loadMessages();
      setMessage("");
    }
  }, [selectedRoomId]);

  const handleChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", {
      token: Cookies.get("token"),
      username: user?.username,
      roomId: selectedRoomId,
    });
  };

  const handleSend = async () => {
    try {
      if (message === "" && !files) {
        alert("please write something");
        return;
      }
      const res = await axiosInstance.post("/api/chat/send", {
        content: message,
        chatRoomId: selectedRoomId,
      });

      if (res.status === 200) {
        socket.emit("new_message", {
          token: Cookies.get("token"),
          roomId: selectedRoomId,
          message: message,
        });
        setMessage("");
        loadMessages();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const loadMessages = async (limit = 40) => {
    try {
      const res = await axiosInstance.get(
        `/api/chat/get-messages/${selectedRoomId}?limit=${limit}`
      );
      setMessages(res.data.data.messages);
      setUser(res.data.data.user);
      socket.emit("connection", { id: res.data?.data?.user?.id });
    } catch (error) {
      console.log("Error loading messages:", error);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
    loadMessages((page + 1) * 40);
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  return (
    <div className="w-100">
      <h4 className="bg-success p-2 text-white">
        Messages {messages?.length} - user {user?.id}
      </h4>
      <div className="message-container p-3 d-flex flex-column-reverse">
        {messages?.map((data, index) => (
          <div key={index}>
            <div>
              <p className={`${user?.id === data?.userId ? "own" : "other"}`}>
                {data?.content}
              </p>
              <small
                className={`${
                  user?.id === data?.userId ? "own-side" : "other-side"
                }`}
              >
                {new Date(data?.createdAt).toLocaleString()} -{" "}
                {data?.User?.username}
              </small>
            </div>
          </div>
        ))}
        <div className="text-center">
          {messages?.length > 40 && (
            <button onClick={loadMore} className="btn btn-primary">
              Load More
            </button>
          )}
        </div>
      </div>
      <audio id="audio" src="./call.mp3"></audio>
      <div className="form-group">
        {status}
        <div className="d-flex gap-3">
          <input
            value={message}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Type here..."
            className="chat-input form-control mx-1 mb-1 p-2"
            type="text"
          />
        </div>
        <button
          onClick={handleSend}
          className="btn mx-2 my-2 btn-block w-25 bg-dark text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInterface;
