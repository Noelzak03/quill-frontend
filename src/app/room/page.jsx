import { redirect } from "next/navigation";
import { room } from "../actions";
import { gettoken } from "../actions";

export default async function Works() {
  const token = await gettoken();
  if (token) {
    const roomdata = await room();
    redirect("/room/" + roomdata.room_id);
  }
  redirect("/login");
}
