import React from "react";
//import Particle from "src/app/components/Particlebg";
import Quill from "src/app/components/Quilltext";
import Homebutton from "src/app/components/Homebuttons";
import { cookies } from "next/headers";
import Link from "next/link";

function HomePage({ loggedIn }) {
  let createLink = loggedIn ? "/room" : "/login";
  let joinLink = loggedIn ? "/join" : "/signup";

  return (
    <div className="flex flex-col h-screen">
      <div className="z-0 ">{/* <Particle /> */}</div>
      <div className="z-10 flex items-center justify-between">
        <div className="z-10 bg-transparent p-2 sm:p-10 justify-start">
          <Quill />
        </div>
        <div className="z-10 p-4">
          {loggedIn && (
            <Link
              href="/logout"
              className="px-4
          py-2
          sm:font-medium
          text-white
          border-2
          border-primary
          bg-secondary
          hover:bg-primary
          text-center hover:text-secondary"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
      <div className="z-10 relative flex-col flex justify-center items-center bg-transparent pt-24 sm:p-24">
        <p className="text-center text-white mb-36 mx-6 text-3xl sm:text-6xl font-lexend font-medium">
          Join Quill and embark on your creative voyage.
        </p>
        <div className="z-10 relative flex flex-col sm:flex-row gap-20 justify-end items-center">
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
