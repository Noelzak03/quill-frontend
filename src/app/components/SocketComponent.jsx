"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Chat from "./Chatbox";
import useWebSocket from "react-use-websocket";
import { useState } from "react";
import Player from "./lobbyplayer";

function removeItemOnce(arr, value) {
  var index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].user_id === value.user_id) {
      index = i;
    }
  }
  console.log(index);
  if (index > -1) {
    arr.splice(index, 1);
  }
  console.log(arr);
  return arr;
}

const WebSocketComponent = ({ token }) => {
  const [users, setUsers] = useState([]);
  const pathname = usePathname();

  const serverUrl = "ws://" + process.env.NEXT_PUBLIC_WEBSOCKET_URL + pathname;
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    serverUrl,
    {
      onOpen: () => {
        console.log("socket connection opened");
        sendJsonMessage({ Authorization: token });
      },
      onClose: () => {
        console.log("socket connection closed");
      },
      onMessage: (event) => {
        const message = JSON.parse(event.data);

        switch (message.event_type) {
          case "connect":
            setUsers(message.data.users);
            break;
          case "member_join":
            setUsers([...users, message.data]);
            break;
          case "member_leave":
            setUsers(removeItemOnce(users, message.data));
            break;
          case "owner_change":
            break;
          case "game_state_change":
            break;
          case "message":
            break;
          case "correct_guess":
            break;
          case "drawing":
            break;
          case "turn_start":
            break;
          case "turn_end":
            break;
          default:
            console.log("Unhandled event type:", message.type);
        }
      }
    }
  );

  return (
    <div className="flex flex-col space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl">Lobby</h1>
      </div>
      <div className="flex-row">
        <div>
          {users.map((person, index) => (
            <Player key={index} name={person.username} />
          ))}
        </div>
        <div>
          <Chat chatMessages={[]} sendJsonMessage />
        </div>
      </div>
    </div>
  );
};

export default WebSocketComponent;
