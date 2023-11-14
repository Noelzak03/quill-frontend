//Sign Up Page

"use client";
import Quill from "../components/Quilltext";
import Link from "next/link";
import { signup } from "../actions";
import { SubmitButton } from "../components/Submit";
import { useRef } from "react";

export default function Signup() {
  const ref = useRef(null);

  const action = async (event) => {
    event.preventDefault();

    let message;

    const formData = new FormData(ref.current);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      message = "Passwords do not match";
    } else {
      try {
        message = await signup("", formData);
      } catch (err) {
        message = "Server is down, Try again later";
      }
    }

    ref.current.reset();
    console.log(message);
  };

  return (
    <div className="bg-transparent md:fixed z-10 p-10">
      <Quill />
      <div className="w-full">
        <form ref={ref} onSubmit={action} className="">
          <div className="p-16 flex-col justify-center">
            <h2 className="text-4xl font-semibold mb-4 my-20">Welcome!</h2>
            <h3 className="mt-12 mb-3">Create a new account</h3>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                className="w-full md:w-[30rem] border p-2 bg-secondary border-primary"
                placeholder="Username"
                required
              />
            </div>
            <div className="my-6">
              <input
                type="password"
                name="password"
                className="w-full md:w-[30rem] border p-2 bg-secondary border-primary"
                placeholder="Password"
                minLength={8}
                required
              />
            </div>
            <div className="my-6">
              <input
                type="password"
                name="confirmPassword"
                className="w-full md:w-[30rem] border p-2 bg-secondary border-primary"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="ml-0 flex mt-8 justify-center">
              <Link
                href="/login"
                className="w-full text-left py-2 hover:underline hover:text-primary"
              >
                Have an account?
              </Link>
              <SubmitButton text="Register" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
