import { HelloWorld } from "../src/components/HelloWorld";
import "../public/css/styles.css";
import React from "react";
import LogoHeader from "../src/components/LogoHeader";
import { AppProps } from "next/app";
function HomePage() {
  return (
    <React.StrictMode>
      <div className="container-lg[data-bleed]">
        <LogoHeader />
        <hr className="border-t my-48 border-always-black" />
        <HelloWorld />
      </div>
    </React.StrictMode>
  );
}

export default HomePage;
