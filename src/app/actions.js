"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  "use server";

  const url = process.env.NEXT_PUBLIC_API_URL + "user/token";

  const res = await fetch(url, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  console.log(data);
  if (res.status == 200) {
    cookies().set("username", data.username, { maxAge: 60 * 60 * 24 });
    cookies().set("authorization", `Bearer ${data.access_token}`, {
      maxAge: 60 * 60 * 24
    }); // cookie lasts for a day
    redirect("/works");
  } else {
    return { message: data.message };
  }
}

export async function signup(prevState, formData) {
  "use server";
  const url = process.env.NEXT_PUBLIC_API_URL + "user/signup";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password")
    })
  });
  const data = await res.json();
  console.log(data);
  if (res.status == 200) {
    cookies().set("username", data.username, { maxAge: 60 * 60 * 24 });
    cookies().set("authorization", `Bearer ${data.access_token}`, {
      maxAge: 60 * 60 * 24
    }); // cookie lasts for a day
    redirect("/works");
  } else {
    return { message: data.message };
  }
}

export async function room() {
  "use server";
  const url = process.env.NEXT_PUBLIC_API_URL + "room";
  const token = cookies().get("authorization");
  if (!token) {
    redirect("/login");
  }
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: token.value
    }
  });
  const data = await res.json();

  if (res.status == 200) {
    // cookies().set("roomid", data.room_id, { maxAge: 60 * 60 * 24 });
    return data;
  } else {
    return { message: data.message };
  }
}

export async function gettoken() {
  const token = cookies().get("authorization");
  return token.value;
}