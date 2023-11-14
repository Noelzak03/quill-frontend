"use client";
import React from "react";
import Particle from "src/app/components/Particlebg";
import Quill from "src/app/components/Quilltext";
import Homebutton from "src/app/components/Homebuttons";
import check from "@/check";
import { useEffect } from "react";
function page() {
  let nextLink = "/login";
  useEffect(() => {
    // Check if the "myCookie" cookie exists
    const myCookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username"));

    if (myCookieValue) {
      nextLink = "/works";
    }
  }, []);

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
          <Homebutton text="Create Room" href={nextLink} />
          <Homebutton text="Join Room" href={nextLink} />
        </div>
      </div>
    </div>
  );
}
export default page;
