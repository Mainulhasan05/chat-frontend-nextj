"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import socketIo from "socket.io-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChatApp } from "@/context/ChatAppContext";
let socket;
const UserList = () => {
  const { selectedRoomId, handleSetSelectedRoomId } = useChatApp();
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
    loadUsers();
  }, []);
  const loadUsers = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/chat-rooms");
      setUsers(res.data?.data);
    } catch (error) {}
  };
  return (
    <div>
      <h4>User List: {users?.length}</h4>
      <hr />
      <div style={{ overflow: "scroll", height: "80vh" }}>
        {users.map((data, index) => {
          return (
            <div key={index} className="chartrooms mx-4">
              <div style={{ cursor: "pointer" }}>
                <span
                  className={`${
                    selectedRoomId == data.id ? "active text-success" : ""
                  }`}
                  onClick={() => {
                    handleSetSelectedRoomId(data.id);
                  }}
                >
                  <h6>{data.name}</h6>
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
