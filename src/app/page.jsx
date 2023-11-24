import React from "react";
//import Particle from "src/app/components/Particlebg";
import Quill from "src/app/components/Quilltext";
import Homebutton from "src/app/components/Homebuttons";
import { cookies } from "next/headers";

function HomePage({ loggedIn }) {
  let createLink = loggedIn ? "/room" : "/login";
  let joinLink = loggedIn ? "/joinroom" : "/signup";

    return (<div>
      <div className="z-0 ">
        {/* <Particle /> */}
      </div>
      <div className="z-10 absolute  bg-transparent p-10 ">
        <Quill />
      </div>
      <div className="z-10 relative h-screen w-full flex-col flex justify-center items-center bg-transparent">
        <p className="text-center text-white mb-36 mx-6 text-6xl font-lexend font-medium">
          Join Quill, and embark on your creative voyage.
        </p>
        <div className="z-10 relative flex  gap-20 justify-end  items-center  ">
          <Homebutton text={loggedIn ? "Create Room" : "Login"} href={createLink} />
          <Homebutton text={loggedIn ? "Join Room" : "Sign Up"} href={joinLink} />
        </div>
      </div>
    </div>);
}

export default function Page() {
  const isLoggedIn = cookies().has("quill_auth");

  return (
    <HomePage loggedIn={isLoggedIn} />
  );
}