"use server";
import { cookies } from "next/headers";
export default async function check() {
  const cookie = cookies().get("username");
  return cookie;
}
