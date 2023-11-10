//Login Page


"use client"
import Quill from '../components/Quill';
import Link from 'next/link';

import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const uname = formData.username;
    const pwd = formData.password;

    console.log({ uname, pwd });

    if (pwd.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    const apiUrl = 'http://0.0.0.0:8000/token';
    const requestOptions = {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        console.log('API response:', await response.json());
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('An error occurred while sending the API request:', error);
    }

    setFormData({ username: '', password: '' });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="bg-primary p-10 min-h-screen">
      <div className="bg-secondary p-10">
        <Quill />
        <div>
          <form onSubmit={handleSubmit} className="">
            <div className="p-16">
              <h2 className="text-4xl font-semibold mb-4 my-20">Welcome Back!</h2>
              <h3 className="mt-12">Enter credentials to login</h3>
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full lg:w-[22rem] border p-2 bg-secondary border-primary"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="my-6">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full lg:w-[22rem] border p-2 bg-secondary border-primary"
                  placeholder="Password"
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
                <button
                  type="submit"
                  className="px-4 py-2 sm:font-medium text-white border-2 border-primary bg-secondary hover:bg-primary text-center"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
