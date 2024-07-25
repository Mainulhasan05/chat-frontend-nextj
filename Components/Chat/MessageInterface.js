"use client";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
let socket;
let timer;
const MessageInterface = () => {
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState();
  const [status, setStatus] = useState("no one");
  const [page, setPage] = useState(1);

  useEffect(() => {
    socket = socketIo(process.env.API_URL, { transports: ["websocket"] });
    // socket.on("connection", () => {
    //   console.log("connection paisi");
    // });

    socket.on("typing", (data) => {
      setStatus(data?.message);

      timer = setTimeout(() => {
        setStatus("no one");
      }, 3000);
    });
    socket.on("loadMessage", () => {
      loadMessages();
      document.getElementById("audio").play();
    });
    loadMessages();
  }, []);
  const handleChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", {
      message: `${user?.username} is typing`,
    });
  };
  const handleSend = async () => {
    try {
      if (message == "" && !files) {
        alert("please write something");
        return;
      }
      // const formData = new FormData();
      // formData.append("content", message);
      // formData.append("image", files);
      const res = await axiosInstance.post("/api/chat/send", {
        content: message,
      });

      if (res.status == 200) {
        setMessage("");
      }
      socket.emit("new_message");
      loadMessages();
    } catch (error) {}
  };
  const loadMessages = async (limit = 40) => {
    try {
      const res = await axiosInstance.get(
        `/api/chat/get-messages/1?limit=${limit}`
      );
      setMessages(res.data.data.messages);
      setUser(res.data.data.user);
      socket.emit("connection", { id: res.data?.data?.user?.id });
    } catch (error) {}
  };
  const loadMore = () => {
    setPage(page + 1);
    loadMessages((page + 1) * 40);
  };
  const handleFileChange = (e) => {
    try {
      setFiles(e.target.files[0]);
    } catch (error) {}
  };
  return (
    <div className=" w-100">
      <h4 className=" bg-success p-2 text-white">
        Messages {messages?.length} - user {user?.id}
      </h4>
      <div className="message-container p-3 d-flex flex-column-reverse ">
        {messages?.map((data, index) => {
          return (
            <div key={index} className="">
              <div>
                <p className={`${user?.id == data?.userId ? "own" : "other"}`}>
                  {data?.content}
                </p>

                {/* <hr /> */}
                <small
                  className={`${
                    user?.id == data?.userId ? "own-side" : "other-side"
                  }`}
                >
                  {new Date(data?.createdAt).toLocaleString()} - User{" "}
                  {data?.userId}
                </small>
              </div>
            </div>
          );
        })}
        <div className="text-center">
          <span onClick={loadMore} className="btn">
            Load More
          </span>
        </div>
      </div>
      <audio id="audio" src="./call.mp3"></audio>
      <div className="form-group">
        {status}
        <div className="d-flex gap-3">
          {/* <input onChange={handleFileChange} type="file" name="" id="" /> */}

          <input
            value={message}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSend();
              }
            }}
            placeholder="Type here..."
            className="chat-input form-control mx-1 mb-1 p-2"
            type="text"
            name=""
            id=""
          />
        </div>
        <button
          onClick={handleSend}
          className="btn mx-2 my-2 btn-block w-25  bg-dark text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInterface;
