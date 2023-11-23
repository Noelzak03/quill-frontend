//Login Page
"use client";
import Quill from "../components/Quilltext";
import { SubmitButton } from "../components/Formsubmit";

import Link from "next/link";
import { login } from "../actions";
import React, { useRef } from "react";

export default function Login() {
  const ref = useRef(null);

  const action = async (event) => {
    event.preventDefault();

    let message;

    const formData = new FormData(ref.current);

    message = await login("", formData);
    ref.current.reset();
    console.log(message);
  };

  return (
    <>
      <div className="bg-transparent md:fixed z-10 p-2 sm:p-10">
        <Quill />
        <div className="w-full">
          <form ref={ref} onSubmit={action} className="">
            <div className="p-16 flex-col justify-center">
              <h2 className="text-4xl font-semibold my-20">Welcome Back!</h2>
              <h3 className="mt-12 mb-3">Enter credentials to login</h3>
              <div className="mb-4">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full md:w-[30rem] border p-2 bg-secondary border-primary"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="my-6">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full md:w-[30rem] border p-2 bg-secondary border-primary"
                  placeholder="Password"
                  minLength={8}
                  required
                />
              </div>
              <div className="ml-0 flex mt-8 justify-center">
                <Link
                  href="/signup"
                  className="w-full text-left py-2 hover:underline hover:text-primary"
                >
                  New User? Sign Up
                </Link>
                <SubmitButton text="Login" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
