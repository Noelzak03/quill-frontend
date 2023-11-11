//Sign Up Page

'use client'
import Quill from '../components/Quill';
import Link from 'next/link';
import { signup } from '../actions';
import { useFormState } from 'react-dom'; 
import { SubmitButton } from '../components/Submit';

// import { useState } from 'react';

export default function Signup() {

  const [message, action] = useFormState(signup, undefined);
  return (
    <div className="bg-primary p-10 min-h-screen">
      <div className="bg-secondary p-10">
        <Quill />
        <div>
          <form action={action} className="">
            <div className="p-16">
              <h2 className="text-4xl font-semibold mb-4 my-20">Welcome!</h2>
              <h3 className="mt-12">Create a new account</h3>
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  className="w-full lg:w-[22.25rem] border p-2 bg-secondary border-primary"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="my-6">
                <input
                  type="password"
                  name="password"
                  className="w-full lg:w-[22.25rem] border p-2 bg-secondary border-primary"
                  placeholder="Password"
                  minLength={8}
                  required
                />
              </div>
              <div className="my-6">
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full lg:w-[22.25rem] border p-2 bg-secondary border-primary"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="ml-0 flex mt-8 space-x-18 sm:space-x-[8rem]">
                <Link href="/login" className="max-lg:w-full text-left py-2 hover:underline hover:text-primary">
                  Have an account?
                </Link>
                <SubmitButton text="Sign Up" />
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
    </div>
  );
}
