"use client";
import React from "react";

import UserList from "@/Components/Chat/UserList";
import MessageInterface from "@/Components/Chat/MessageInterface";
import SocketConnection from "@/Components/Chat/SocketConnection";
import { useChatApp } from "@/context/ChatAppContext";

const page = () => {
  const { selectedRoomId, fetchRooms } = useChatApp();

  return (
    <>
      <div className="w-100 ">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <SocketConnection />
            <UserList />
          </div>
          <div className="col-md-9 my-4">
            {selectedRoomId ? (
              <MessageInterface />
            ) : (
              <div className="alert alert-info">
                Please select a room to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
