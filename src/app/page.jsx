"use client";
import React from "react";
import Particle from "../components/Particle";
import Quill from "../components/Quill";
import Homebutton from "../components/Homebutton";
import check from "@/check";
function page() {
  let nextLink;
  const cookie = check();
  if (cookie.value) {
    nextLink = "/works";
  } else {
    nextLink = "/login";
  }
  console.log(cookie);

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
// const checkCookie = () => {
//   let nextLink;
//   const myCookieValue = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("username"));

//   return myCookieValue;
// };
