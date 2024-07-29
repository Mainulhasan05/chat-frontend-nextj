import Image from "next/image";
import styles from "./page.module.css";
import HomeButtons from "@/Components/Home/HomeButtons";
import HowToUse from "@/Components/Home/HowToUse";

export default function Home() {
  return (
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
  );
}
