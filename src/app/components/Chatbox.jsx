"use client";
import React, { useRef, useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ chatMessages, sendJsonMessage }) {
  const [formValue, setFormValue] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    sendJsonMessage({ event_type: "message", data: { message: formValue } });
    setFormValue("");
  };
  const chatElement = chatMessages.map((msg) => (
    <div className="flex flex-col   mb-2  border-primary border-2  ">
      <p className=" pl-2 pt-2 text-sm items-start justify-start text-[#a495ff]">
        {msg.username}
      </p>
      <p
        className={`${
          msg.has_guessed ? "text-primary" : "text-white"
        } pl-2 pb-2 text-2xl break-words`}
      >
        {msg.message}
      </p>
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
      <ScrollToBottom className="h-2/3 w-full bg-black overflow-auto">
        <div className="text-left text-black  h-1/6 w-full p-8 text-5xl   font-lexend font-bold ">
          {chatElement}
        </div>
      </ScrollToBottom>
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
            type="submit"
          >
            ➡️
          </button>
        </div>
      </form>
    </div>
  );
}
