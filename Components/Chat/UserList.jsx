"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import socketIo from "socket.io-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChatApp } from "@/context/ChatAppContext";
let socket;
const UserList = () => {
  const {
    selectedRoomId,
    chatRooms,
    handleSetSelectedRoomId,
    setSelectedRoom,
  } = useChatApp();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [roomObj, setRoomObj] = useState({
    name: "",
    password: "",
  });
  const handleChange = (e) => {
    setRoomObj({
      ...roomObj,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    socket = socketIo(process.env.API_URL, { transports: ["websocket"] });
    socket.on("connection", (data) => {
      setActiveUsers(data);
    });
  }, []);

  return (
    <div>
      <hr />
      <div style={{ overflow: "scroll", height: "80vh" }}>
        {chatRooms?.privateChats?.map((data, index) => {
          return (
            <div key={index} className="chartrooms mx-4">
              <div style={{ cursor: "pointer" }}>
                <span
                  className={`${
                    selectedRoomId == data?.user?.id
                      ? "active text-success"
                      : ""
                  }`}
                  onClick={() => {
                    handleSetSelectedRoomId(data?.user?.id);
                    setSelectedRoom(data);
                  }}
                >
                  <h6>{data?.user?.full_name}</h6>
                </span>
                <hr />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
