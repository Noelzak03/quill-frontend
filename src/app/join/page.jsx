//joinroom
"use client";

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
    <section className="bg-secondary min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-secondary rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-primary">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Join a Room
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              ref={ref}
              onSubmit={action}
            >
              <div>
                <label
                  for="roomid"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  RoomId
                </label>
                <input
                  type="text"
                  id="roomid"
                  name="roomid"
                  placeholder="RoomId"
                  className="bg-secondary border border-primary text-primary sm:text-sm rounded-lg  block w-full p-2.5 "
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Join Room
              </button>
              <p className="text-sm font-light text-white">
                Want to create a room?{" "}
                <a
                  href="/room"
                  className="font-medium text-primary hover:underline"
                >
                  Create Room
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
