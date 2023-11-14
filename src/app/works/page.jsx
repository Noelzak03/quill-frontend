
// import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function Works() {
  "use server";
  const cookie = cookies().get("username");

  ("use client");
  return (
    <div>
      <p>hi {cookie.value}</p>
    </div>
  );
}
