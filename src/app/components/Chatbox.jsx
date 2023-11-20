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
    <p>{`${msg.username}: ${msg.message}`}</p>
  ));
  return (
    <div className="h-[42rem] w-[28rem] border-primary  border-4 bg- items-self-center flex flex-col justify-evenly">
      <div className=" text-left text-black  h-1/6 w-full p-8 text-5xl  bg-primary font-lexend font-bold">
        <p>Chat</p>
      </div>
      <div className="h-2/3 w-full bg-slate-500 ">
        <div className="text-left text-black  h-1/6 w-full p-8 text-5xl  bg-primary font-lexend font-bold">
          {chatElement}
        </div>
      </div>
      <form className="w-full h-1/6 px-2" onSubmit={sendMessage}>
        <div className="flex items-stretch py-4 m-2 mt-4 border-4 border-primary ">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
