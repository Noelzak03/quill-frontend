"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Chat from "./Chatbox";
import useWebSocket from "react-use-websocket";
import { useState } from "react";
import Player from "./lobbyplayer";
import Quill from "./Quilltext";
import { Excalidraw } from "@excalidraw/excalidraw";

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

const WebSocketComponent = ({ token, username }) => {
  const [users, setUsers] = useState([]);
  const [chatmessages, setChatmessages] = useState([]);
  const [gameStarted, setGameStarted] = useState("lobby");
  const [owner, setOwner] = useState(false);
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
            setOwner(message.data.owner.username === username);
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
            setGameStarted(message.data.status);
            break;
          case "message":
            setChatmessages([...chatmessages, message.data]);
            break;
          case "correct_guess":
            setChatmessages([...chatmessages, message.data]);
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
  const startGame = () => {
    if (readyState === WebSocket.OPEN) {
      sendJsonMessage({ event_type: "start", data: { hello: "world" } });
    }
  };
  useEffect(() => {
    console.log(gameStarted);
  }, [gameStarted]);

  if (gameStarted === "lobby") {
    return (
      <div className="flex flex-col">
        <div className="my-8">
          <Quill />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col justify-start flex-grow">
            <div className="flex-grow">
              {users.map((person, index) => (
                <Player key={index} name={person.username} />
              ))}
            </div>
            <div>
              {owner && (
                <button
                  className="p-2 m-2 sm:font-medium text-white border-2 border-primary bg-secondary hover:bg-primary text-center"
                  onClick={startGame}
                >
                  Start Game
                </button>
              )}
            </div>
          </div>
          <div className="justify-end">
            <Chat
              chatMessages={chatmessages}
              sendJsonMessage={sendJsonMessage}
            />
          </div>
        </div>
      </div>
    );
  } else if (gameStarted === "ongoing") {
    return (
      <div className="flex flex-col">
        <div className="my-8">
          <Quill />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col justify-start">
            <div className="flex-grow">
              {users.map((person, index) => (
                <Player key={index} name={person.username} />
              ))}
            </div>
          </div>
          <div className="flex-grow">
            <Excalidraw />
          </div>
          <div className="justify-end">
            <Chat
              chatMessages={chatmessages}
              sendJsonMessage={sendJsonMessage}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <div className="my-8">
          <Quill />
        </div>
        <div>
          <h1>game ended</h1>
        </div>
      </div>
    );
  }
};

export default WebSocketComponent;
