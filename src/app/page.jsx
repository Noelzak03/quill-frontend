"use client";
import React from "react";
import Particle from "src/app/components/Particlebg";
import Quill from "src/app/components/Quilltext";
import Homebutton from "src/app/components/Homebuttons";
import { useEffect } from "react";
import { gettoken } from "./actions";
import { useState } from "react";
function page() {
  const [token, setToken] = useState(null);
  let joinLink = "/login";
  let createLink = "/login";

  useEffect(() => {
    const recievedToken = async () => {
      const recievedToken = await gettoken();
      setToken(recievedToken);
    };

    recievedToken();
  }, []);

  if (token) {
    createLink = "/room";
    joinLink = "/joinroom";
  }

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
          <Homebutton text="Create Room" href={createLink} />
          <Homebutton text="Join Room" href={joinLink} />
        </div>
      </div>
    </div>
  );
}
export default page;
