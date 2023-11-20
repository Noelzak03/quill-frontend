"use client";
import React, { useEffect, useState } from "react";

export default function Chat() {
  const [formValue, setFormValue] = useState("");
  const [socket, setSocket] = useState(null); //socket holds the current instance of the websocket connection

  //send user message to the server
  const sendMessage = (e) => {
    e.preventDefault();

    const currentSocket = getWebSocketInstance();
    if (currentSocket && currentSocket.readyState === WebSocket.OPEN) {
      currentSocket.sendJsonMessage(formValue);
      setFormValue("");
    } else {
      console.error("WebSocket connection not open");
    }
  };
  return (
    <div className="h-[42rem] w-[28rem] border-primary  border-4 bg- items-self-center flex flex-col justify-evenly">
      <div className=" text-left text-black  h-1/6 w-full p-8 text-5xl  bg-primary font-lexend font-bold">
        <p>Chat</p>
      </div>
      <div className="h-2/3 w-full bg-slate-500 "></div>
      <form class="w-full h-1/6 px-2" onSubmit={sendMessage}>
        <div class="flex items-stretch py-4 m-2 mt-4 border-4 border-primary ">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Enter your message here"
          />
          <button
            class="flex-shrink-0 rounded-br-2xl bg-teal-500 mr-2 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-lg border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            ➡️
          </button>
        </div>
      </form>
    </div>
  );
}
