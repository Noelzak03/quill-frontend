"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Chat from "./Chatbox";
// import useWebSocket from "react-use-websocket";

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
        },
        onMessage: (event) => {
          const message = JSON.parse(event.data);
          // console.log(message);
          console.log(message.data.status);

          switch (message.event_type) {
            case "connect":
              console.log("hello");
              break;
            case "member_join":
              break;
            case "member_leave":
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
  }
  return (
    <div>
      <Chat chatMessages={[]} sendJsonMessage />
    </div>
  );
};

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

// });

// socket.addEventListener("close", (event) => {
//   console.log("WebSocket Connection Closed", event);
// });

export default WebSocketComponent;

//   return (
//     <div className="flex flex-col space-y-8">
//       <div clssName="mb-8">
//         <h1 claassName="text-3xl">Lobby</h1>
//       </div>
//       <div className="">
//         <Player />
//         <Player />
//       </div>
//     </div>
//   );
// }
