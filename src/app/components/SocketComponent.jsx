"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Chat from "./Chatbox";
import useWebSocket from "react-use-websocket";
import { useState } from "react";
import Player from "./lobbyplayer";
import Quill from "./Quilltext";
import { SyncState } from "@/app/collab";
import Link from "next/link";
import dynamic from "next/dynamic";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false
  }
);

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
  const [isDrawing, setIsDrawing] = useState(false); // true when it is current user's turn to draw
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [currentdrawingplayer, setCurrentdrawingplayer] = useState("");
  const [syncState, setSyncState] = useState(null);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const [word, setWord] = useState("");
  const Underscores = ({ word }) => {
    const underscores = word
      .split("")
      .map((char, index) => (
        <span key={index}>{char === " " ? " " : " _ "}</span>
      ));

    return (
      <div className="text-primary text-lg font-semibold">
        Word to guess: {underscores}
      </div>
    );
  };

  const excalidrawUIOptions = {
    canvasActions: {
      changeViewBackgroundColor: false,
      loadScene: false,
      saveToActiveFile: false
    }
  };

  function onCanvasChange(elements, state, files) {
    if (syncState) {
      if (isDrawing) {
        syncState.send(elements);
      }
    } else {
      console.log("syncstate is still null");
    }
  }

  const serverUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL + pathname;
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
      onError: (error) => {
        console.log(error);
        console.error("WebSocket error:", error);
        setError("Failed to connect. Please try again");
      },
      onMessage: (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
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
            if (excalidrawAPI && message.data.user.username !== username) {
              syncState.updateViewerState(message.data.elements);
              excalidrawAPI.updateScene({
                elements: [...syncState.getViewerBoardElements()],
                commitToHistory: false
              });
              // excalidrawAPI.scrollToContent(message.data.elements);
            } else {
              console.log("cant/dont need to update");
            }
            if (!excalidrawAPI) {
              console.log("could not render as excalidrawAPI is null");
            }
            break;
          case "turn_start":
            console.log(message.data.user.username === username);
            setSyncState(new SyncState(sendJsonMessage));
            setIsDrawing(message.data.user.username === username);
            setCurrentdrawingplayer(message.data.user.username);
            setWord(message.data.answer);
            break;
          case "turn_end":
            setIsDrawing(false);
            setSyncState(null);
            excalidrawAPI.resetScene();
            break;
          default:
            console.log("Unhandled event type:", message.event_type);
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

  if (error) {
    return (
      <div className="flex flex-col">
        <div className="my-8">
          <Quill />
        </div>
        <div className="flex flex-col items-center justify-center m-8">
          <div>
            <Link
              href="/joinroom"
              className="p-2 text-sm sm:text-lg text-white border-2 border-primary bg-secondary hover:bg-primary hover:text-secondary text-center"
            >
              {error}
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (gameStarted === "lobby") {
    return (
      <div className="flex flex-col">
        <div className="my-8">
          <Quill />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col justify-start flex-grow">
            <div className="flex-grow">
              {users.map((person, index) => (
                <Player key={index} name={person.username} isPlaying={false} />
              ))}
            </div>
            <div>
              {owner && users.length > 1 && (
                <button
                  className="p-2 m-2 sm:font-medium text-white border-2 border-primary bg-secondary hover:text-secondary hover:bg-primary text-center"
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
        <div className="">
          {isDrawing ? (
            <p className="text-lg font-semibold text-primary">
              Word to Draw: {word}
            </p>
          ) : (
            <Underscores word={word} />
          )}
        </div>
        <div className="flex flex-row">
          <div className="flex-grow">
            {isDrawing ? (
              <Excalidraw
                theme="dark"
                viewModeEnabled={false}
                zenModeEnabled={true}
                isCollaborating={true}
                onChange={onCanvasChange}
                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                UIOptions={excalidrawUIOptions}
              />
            ) : (
              <Excalidraw
                theme="dark"
                viewModeEnabled={true}
                zenModeEnabled={true}
                isCollaborating={true}
                onChange={onCanvasChange}
                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                UIOptions={excalidrawUIOptions}
              />
            )}
          </div>
          <div className="justify-end">
            <Chat
              chatMessages={chatmessages}
              sendJsonMessage={sendJsonMessage}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row">
            {users.map((person, index) => (
              <Player
                key={index}
                name={person.username}
                isPlaying={currentdrawingplayer === person.username}
              />
            ))}
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
        <Link
          href="/"
          className=" text-white border-2 p-4 my-4 mx-6 border-primary bg-secondary hover:bg-primary hover:text-secondary text-center"
        >
          <h2 className="text-lg font-semibold mb-2">Game Ended</h2>
          <p href="/" className="text-sm">
            Thank you for playing! Feel free to start a new game or join another
            one.
          </p>
        </Link>
      </div>
    );
  }
};

export default WebSocketComponent;
