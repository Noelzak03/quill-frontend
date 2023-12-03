import React from "react";
//import Particle from "src/app/components/Particlebg";
// import Quill from "src/app/components/Quilltext";
import Homebutton from "src/app/components/Homebuttons";
import { cookies } from "next/headers";
import Link from "next/link";

function HomePage({ loggedIn }) {
  let createLink = loggedIn ? "/room" : "/login";
  let joinLink = loggedIn ? "/join" : "/signup";

  return (
    <div className="container min-h-screen mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <div className="text-center lg:w-2/3 w-full">
        <h1 className="title-font sm:text-4xl text-3xl mb-11 font-medium text-white">
          Join Quill and embark on your creative voyage.
        </h1>
        <div className="flex flex-col sm:flex-row gap-20 justify-center">
          <Homebutton
            text={loggedIn ? "Create Room" : "Login"}
            href={createLink}
          />
          <Homebutton
            text={loggedIn ? "Join Room" : "Sign Up"}
            href={joinLink}
          />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const isLoggedIn = cookies().has("quill_auth");

  return <HomePage loggedIn={isLoggedIn} />;
}
