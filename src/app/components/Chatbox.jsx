"use client";
import React, { useState } from "react";

export default function Chat({ chatMessages, sendJsonMessage }) {
  const [formValue, setFormValue] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    sendJsonMessage({ event_type: "message", data: { message: formValue } });
    setFormValue("");
  };
  const chatElement = chatMessages.map((msg) => (
    <div className="flex flex-col  gap-1 mb-2">
      <p className=" text-base items-start justify-start text-white">
        {msg.username}
      </p>
      <p className="text-3xl text-white">{msg.message}</p>
    </div>
    // <p>{`${msg.username}: ${msg.message}`}</p>
  ));
  return (
    <div className="h-[42rem] w-[28rem]   border-4 border-primary items-self-center flex flex-col justify-evenly">
      <div className=" flex text-left  text-primary h-1/6 w-full  text-5xl  bg-black border-b-4 border-primary font-lexend font-semibold justify-start items-center">
        <p className="p-0 sm:pl-6 font-lexend font-bold text-transparent text-6xl bg-gradient-to-r from-purple-400 to-pink-600  bg-clip-text ">
          Chat
        </p>
      </div>
      <div className="h-2/3 w-full bg-black">
        <div className="text-left text-black  h-1/6 w-full p-8 text-5xl   font-lexend font-bold">
          {chatElement}
        </div>
      </div>
      <form className="w-full h-1/6 px-2" onSubmit={sendMessage}>
        <div className="flex items-stretch py-4 m-2 mt-4 border-4 border-primary ">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Enter your message here"
          />
          <button
            className="flex-shrink-0 rounded-br-2xl bg-teal-500 mr-2 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-lg border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            ➡️
          </button>
        </div>
      </form>
    </div>
  );
}
