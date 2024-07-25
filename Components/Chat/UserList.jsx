"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import socketIo from "socket.io-client";
let socket;
const UserList = () => {
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
      <div style={{ overflow: "scroll", height: "200px" }}>
        {users.map((data, index) => {
          return (
            <div key={index} className="studentList mx-4">
              <div>
                <h6>
                  {data.email} - {data?.id}
                  {activeUsers.includes(data?.id) && (
                    <span className="badge bg-success">Active</span>
                  )}
                </h6>
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
