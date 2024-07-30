import Image from "next/image";
import styles from "./page.module.css";
import HomeButtons from "@/Components/Home/HomeButtons";
import HowToUse from "@/Components/Home/HowToUse";

export async function generateMetadata({ params }) {
  return {
    title: "Chat Application - Connect and Chat with Friends",
    description:
      "Welcome to our chat application. Connect with family and friends, create chat rooms, and enjoy seamless communication.",
    keywords:
      "chat, messaging, chat application, connect with friends, chat rooms",
  };
}

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div>
              <HomeButtons />
              <HowToUse />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
