import React from "react";
import LogoHeader from "./LogoHeader";
import { CarsList } from "./CarsList";
import { useRouter } from "next/router";

export const HelloWorld: React.FC = () => {
  return (
    <div className="grid gap-24 justify-evenly">
      <CarsList />
    </div>
  );
};
