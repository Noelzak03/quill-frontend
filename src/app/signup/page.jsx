'use client'
import Quill from '../components/Quill';
import Link from 'next/link';

import { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const uname = formData.username;
    const pwd = formData.password;
    const repwd = formData.confirmPassword;

    console.log({ uname, pwd, repwd });

    if (pwd.length < 8) {
      alert('Password must be at least 8 characters long.');
      setFormData({ ...formData, password: '', confirmPassword: '' }); // Reset password fields
      return;
    }

    if (pwd !== repwd) {
      alert('Passwords do not match.');
      setFormData({ ...formData, password: '', confirmPassword: '' });
      return;
    }

    console.log(JSON.stringify(formData.delete('confirmPassword')));

    const apiUrl = 'http://0.0.0.0:8000/signup';

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
        const data = await response.json();
        console.log('API response:', data);
      } else {
        console.error('response.message');
      }
    } catch (error) {
      console.error('An error occurred while sending the API request:', error);
    }


    setFormData({ username: '', password: '', confirmPassword: '' });
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
              <h2 className="text-4xl font-semibold mb-4 my-20">Welcome!</h2>
              <h3 className="mt-12">Create a new account</h3>
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
              <div className="my-6">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full lg:w-[22rem] border p-2 bg-secondary border-primary"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="ml-0 flex mt-8 space-x-18 sm:space-x-[8rem]">
                <Link href="/login" className="max-lg:w-full text-left py-2 hover:underline hover:text-primary">
                  Have an account?
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 sm:font-medium text-white border-2 border-primary bg-secondary hover:bg-primary text-center"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
