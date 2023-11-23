// import Player from "@/app/components/lobbyplayer";
"use server";
import { gettoken, getusername } from "@/app/actions";
import WebSocketComponent from "@/app/components/SocketComponent";
import { redirect } from "next/navigation";

export default async function Page() {
  const token = await gettoken();
  const username = await getusername();
  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <WebSocketComponent token={token.value} username={username.value} />
    </>
  );
}
