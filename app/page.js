"use client";
import Image from "next/image";
import styles from "./page.module.css";
import HomeButtons from "@/Components/Home/HomeButtons";
import HowToUse from "@/Components/Home/HowToUse";
import socket from "../utils/socket";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });
    socket.on("receive", (data) => {
      console.log("receive", data);
    });
    return () => {
      socket.off("connect");
    };
  }, []);
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div>
              <button
                onClick={() => {
                  socket.emit("join-room", "room1");
                }}
              >
                Join room
              </button>
              <button
                onClick={() => {
                  socket.emit("send", "I love suchona");
                }}
              >
                Send Message
              </button>
              <HomeButtons />
              <HowToUse />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
