'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState, formData) {
  "use server"
  const url = process.env.NEXT_PUBLIC_URL + "user/token";
  const res = await fetch(url, {
    "method": "POST",
    "body": formData
  })
  const data = await res.json();
  console.log(data);
  if (res.status == 200) {
    cookies().set('username', data.username, { maxAge: 60 * 60 * 24 });
    cookies().set('authorization', `Bearer ${data.token.access_token}`, { maxAge: 60 * 60 * 24 }); // cookie lasts for a day
    redirect('/works');
  } else {
    return { message: data.message };
  }
}
