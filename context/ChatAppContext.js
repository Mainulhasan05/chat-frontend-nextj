import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import React, { createContext, useState, useContext, useEffect } from "react";

const ChatAppContext = createContext();

export const useChatApp = () => {
  return useContext(ChatAppContext);
};

export const ChatAppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchRooms();
      if (Cookies.get("user")) {
        setUser(JSON.parse(Cookies.get("user")));
        console.log("User", JSON.parse(Cookies.get("user")));
      }
    }
  }, []);

  const handleSetSelectedRoomId = (id) => {
    setSelectedRoomId(id);
  };

  const fetchRooms = async (token) => {
    try {
      const res = await axiosInstance.get("/api/chats");
      setChatRooms(res.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createRoom = async ({ name, password }) => {
    const res = await axiosInstance.post("/api/chat-room/join", {
      name,
      password,
    });
    return res;
  };

  const joinRoom = async ({ name, password }) => {
    try {
      const res = await fetch("/api/join-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setChatRooms((prevRooms) => [...prevRooms, data]);
        setMessage({ type: "success", text: "Successfully joined chat room!" });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        user,
        chatRooms,
        messages,
        message,
        selectedRoomId,
        selectedRoom,
        setSelectedRoom,
        fetchRooms,

        createRoom,
        joinRoom,
        handleSetSelectedRoomId,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
