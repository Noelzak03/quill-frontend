// import Player from "@/app/components/lobbyplayer";
"use server";
import { gettoken, getusername } from "@/app/actions";
import WebSocketComponent from "@/app/components/SocketComponent";

export default async function Page() {
  const token = await gettoken();
  const username = await getusername();

  return (
    <>
      <WebSocketComponent token={token} username={username} />
    </>
  );
}
