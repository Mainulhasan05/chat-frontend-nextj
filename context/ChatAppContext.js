import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import React, { createContext, useState, useContext, useEffect } from "react";

const ChatAppContext = createContext();

export const useChatApp = () => {
  return useContext(ChatAppContext);
};

export const ChatAppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchRooms();
    }
  }, []);

  const fetchRooms = async (token) => {
    try {
      const res = await axiosInstance.get("/api/auth/chat-rooms");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async ({ username, password }) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setChatRooms([]);
    setMessages([]);
  };

  const createRoom = async ({ name, password }) => {
    try {
      const res = await fetch("/api/chat-room/join", {
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
        setMessage({ type: "success", text: "Room created successfully!" });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    }
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
        fetchRooms,
        login,
        logout,
        createRoom,
        joinRoom,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
