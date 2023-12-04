//Login Page
"use client";

import Link from "next/link";
import { login } from "../actions";
import React, { useRef, useState } from "react";

export default function Login() {
  const ref = useRef(null);
  const [error, setError] = useState("");
  const action = async (event) => {
    event.preventDefault();

    try {
      let message;

      const formData = new FormData(ref.current);

      message = await login("", formData);
      ref.current.reset();
      console.log(message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="bg-secondary min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-secondary rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-primary">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Login in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              ref={ref}
              onSubmit={action}
            >
              <div>
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  className="bg-secondary border border-primary text-primary sm:text-sm rounded-lg  block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-secondary border border-primary text-primary sm:text-sm rounded-lg  block w-full p-2.5"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-white">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
