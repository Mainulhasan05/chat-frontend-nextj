import Image from "next/image";
import styles from "./page.module.css";
import HomeButtons from "@/Components/Home/HomeButtons";

export default function Home() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <HomeButtons />
        </div>
      </div>
    </div>
  );
}
