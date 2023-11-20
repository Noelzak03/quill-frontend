// import Player from "@/app/components/lobbyplayer";
"use server";
import { gettoken } from "@/app/actions";
import WebSocketComponent from "@/app/components/SocketComponent";

export default async function Page() {
  const token = await gettoken();

  return (
    <>
      <WebSocketComponent token={token} />
    </>
  );
}
