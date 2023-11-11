//Login Page
"use client";
import Quill from "../components/Quill";
import { SubmitButton } from "../components/Submit";
import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "../actions";
import React, { useRef } from "react";

export default function Login() {
  const [message, action] = useFormState(login, undefined);

  return (
    <>
      <div className="bg-primary z-0 min-h-screen"></div>
      <div className="bg-secondary z-10 fixed top-10 left-10 right-10 bottom-10 p-10">
        <Quill />
        <div>
          <form action={action} className="">
            <div className="p-16">
              <h2 className="text-4xl font-semibold mb-4 my-20">
                Welcome Back!
              </h2>
              <h3 className="mt-12">Enter credentials to login</h3>
              <div className="mb-4">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full lg:w-[22rem] border p-2 bg-secondary border-primary"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="my-6">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full lg:w-[22rem] border p-2 bg-secondary border-primary"
                  placeholder="Password"
                  minLength={8}
                  required
                />
              </div>
              <div className="ml-0 flex mt-8 space-x-18 sm:space-x-[8rem]">
                <Link
                  href="/signup"
                  className="max-lg:w-full text-left py-2 hover:underline hover:text-primary"
                >
                  New User? Sign Up
                </Link>
                <SubmitButton text="Login" />
                <div className="flex h-8 items-end space-x-1">
                  {message && (
                    <>
                      <p aria-live="polite" className="text-sm text-red-500">
                        Invalid credentials
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
