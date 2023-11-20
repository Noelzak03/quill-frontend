"use client";
import React from "react";
import { usePathname } from "next/navigation";
import useWebSocket from "react-use-websocket";

const WebSocketComponent = ({ token }) => {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    const pathname = usePathname();

    const serverUrl =
      "ws://" + process.env.NEXT_PUBLIC_WEBSOCKET_URL + pathname;
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
      serverUrl,
      {
        onOpen: () => {
          console.log("socket connection opened");
          sendJsonMessage({ Authorization: token });
        },
        onClose: () => {
          console.log("socket connection closed");
        }
      }
    );
  }

  // socket.addEventListener("open", (event) => {
  //   console.log("WebSocket Connection Opened", event);
  //   socket.send(JSON.stringify({ Authorization: token }));
  // });

  //EITHER THIS OR THAT

  // socket.onopen = () => {
  //   console.log("connected");
  //   socket.send(JSON.stringify({ Authorization: token }));
  // };

  // // socket.onmessage = (event) => {
  // //   console.log("WebSocket Message Received", event.data);
  // //   const message = JSON.parse(event.data);
  // // };

  // socket.addEventListener("message", (event) => {
  //   console.log("WebSocket Message Received", event.data);

  //   const message = JSON.parse(event.data);

  //   switch (message.type) {
  //     case "CONNECT":
  //       break;
  //     case "MEMBER_JOIN":
  //       break;
  //     case "MEMBER_LEAVE":
  //       break;
  //     case "OWNER_CHANGE":
  //       break;
  //     case "GAME_STATE_CHANGE":
  //       break;
  //     case "MESSAGE":
  //       break;
  //     case "CORRECT_GUESS":
  //       break;
  //     case "DRAWING":
  //       break;
  //     case "TURN_START":
  //       break;
  //     case "TURN_END":
  //       break;
  //     default:
  //       console.log("Unhandled event type:", message.type);
  //   }
  // });

  // socket.addEventListener("close", (event) => {
  //   console.log("WebSocket Connection Closed", event);
  // });

  return <div>hi</div>;
};

export default WebSocketComponent;

//   return (
//     <div className="flex flex-col space-y-8">
//       <div className="mb-8">
//         <h1 className="text-3xl">Lobby</h1>
//       </div>
//       <div className="">
//         <Player />
//         <Player />
//       </div>
//     </div>
//   );
// }
