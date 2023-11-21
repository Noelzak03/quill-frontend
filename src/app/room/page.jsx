import { redirect } from "next/navigation";
import { room } from "../actions";

export default async function Works() {
  const roomdata = await room();
  redirect("/room/" + roomdata.room_id);
}
