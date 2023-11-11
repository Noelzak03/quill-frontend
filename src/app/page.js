"use client";
import React from "react";
import Particle from "../components/Particle";
import Quill from "../components/Quill";
import Homebutton from "../components/Homebutton";
function page() {
  return (
    <div>
      <div className="z-0 ">
        <Particle />
      </div>
      <div className="z-10 absolute  bg-transparent p-10 ">
        <Quill />
      </div>
      <div className="z-10 relative h-screen w-full flex-col flex justify-center items-center bg-transparent">
        <p className="text-center text-white mb-36 mx-6 text-6xl font-lexend font-medium">
          Join Quill, and embark on your creative voyage.
        </p>
        <div className="z-10 relative flex  gap-20 justify-end  items-center  ">
          <Homebutton text="Create Room" href="/" />
          <Homebutton text="Join Room" href="#" />
        </div>
      </div>
    </div>
  );
}

export default page;
