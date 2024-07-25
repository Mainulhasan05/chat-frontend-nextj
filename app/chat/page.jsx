import React from "react";

import UserList from "@/Components/Chat/UserList";
import MessageInterface from "@/Components/Chat/MessageInterface";
import SocketConnection from "@/Components/Chat/SocketConnection";

const page = () => {
  return (
    <>
      <div className="w-100 ">
        <div className="row justify-content-center">
          <div className="col-md-2">
            <SocketConnection />
            <UserList />
          </div>
          <div className="col-md-10 my-4">
            <MessageInterface />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
