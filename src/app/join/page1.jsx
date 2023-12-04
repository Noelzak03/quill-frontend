//joinroom
"use client";
import Quill from "../components/Quilltext";
import { SubmitButton } from "../components/Formsubmit";

import Link from "next/link";

import React, { useRef } from "react";
import { joinroom } from "../actions";

export default function join() {
  const ref = useRef(null);

  const action = async (event) => {
    event.preventDefault();

    const formData = new FormData(ref.current);
    let message;
    message = await joinroom("", formData);
    ref.current.reset();
  };

  return (
    <>
      <div className="bg-transparent md:fixed z-10 p-2 sm:p-10">
        <Quill />
        <div className="w-full">
          <form ref={ref} onSubmit={action} className="">
            <div className="p-16 flex-col justify-center">
              <h2 className="text-4xl font-semibold my-20">Join Room</h2>
              <h3 className="mt-12 mb-3">Enter Room Id</h3>
              <div className="mb-4">
                <input
                  type="text"
                  id="roomid"
                  name="roomid"
                  className="w-full md:w-[30rem] border p-2 bg-secondary border-primary"
                  placeholder="Room Id"
                  required
                />
              </div>
              <div className="ml-0 flex mt-8 justify-center">
                <Link
                  href="/room"
                  className="w-full text-left py-2 hover:underline hover:text-primary"
                >
                  Want to create room?
                </Link>
                <SubmitButton text="Join Room" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
