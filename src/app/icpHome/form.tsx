'use client'
import './icpHome.css'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

export const MainForm = (): React.ReactNode => {
  let [userInput, setUserInput] = useState({});
  const [name, setName] = useState('');
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  function formSubmitted(event: any) {
    event.preventDefault();
    const submitData = {
      ...userInput
    }
    router.push(`/Questions?name=${encodeURIComponent(name)}`);
    console.log(submitData)
  }

  function formChange(event: any) {
    event.preventDefault();
    const { target } = event;
    const { name, value } = target;
    setName(value);
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  return (
    <>
      <div className="bg-[#3b28cc]">
        {!showForm ? (
          <button
            className="border border-white rounded-full px-4 py-2 flex items-center justify-center text-white"
            style={{ borderWidth: '0.8px' }}
            onClick={toggleForm}
          >
            <span className="mr-2">Get Started</span>
            <svg
              className="w-4 h-4 transform -rotate-45"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        ) : (
          <form onSubmit={formSubmitted} className="flex items-center space-x-4">
            <input
              className="border-b border-white bg-transparent w-full py-2 px-3 text-white placeholder-white leading-tight focus:outline-none"
              id="username"
              type="text"
              placeholder="enter name"
              onChange={formChange}
              required
              name="userInput"
            />

            <input
              className="border-b border-white bg-transparent w-full py-2 px-3 text-white placeholder-white leading-tight focus:outline-none"
              id="email"
              type="email"
              name="email"
              placeholder="enter email"
              onChange={formChange}
              required
            />

            <button className="mt-8 border border-white rounded-full px-4 py-2 flex items-center justify-center text-white" type="submit">

              Start
              <svg
                className="w-4 h-4 transform rotate-45"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </>
  )
}
