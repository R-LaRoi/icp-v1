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
      <div className="">
        {!showForm ? (
          <button
            className="border border-[#3515B7] bg-[#3515B7] rounded-full  mt-4 px-4 py-3 flex items-center justify-center"
            style={{ borderWidth: '0.8px' }}
            onClick={toggleForm}
          >
            <span className="mr-2  text-white text-sm ">Get Started</span>
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
        ) : (
          <form onSubmit={formSubmitted} className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-1/2 ">
            <input
              className="border-b border-[#3515B7] bg-transparent w-full py-1 md:py-1.5 px-2 md:px-3 
    text-sm md:text-base text-[#3515B7] placeholder-stone-600 leading-tight focus:outline-none"
              id="username"
              type="text"
              placeholder="enter name"
              onChange={formChange}
              required
              name="userInput"
            />

            <input
              className="border-b border-[#3515B7] bg-transparent w-full py-1 md:py-1.5 px-2 md:px-3 
    text-sm md:text-base text-[#3515B7] placeholder-[#3515B7] leading-tight focus:outline-none"
              id="email"
              type="email"
              name="email"
              placeholder="enter email"
              onChange={formChange}
              required
            />

            <button className="mt-4 md:mt-0 border bg-[#3515B7] rounded-full px-3 md:px-4 py-1.5 md:py-2 flex items-center justify-center text-white text-sm md:text-base" type="submit">
              <div className='mr-2'>Start</div>
              <svg
                className="w-3 h-3 md:w-4 md:h-4 transform rotate-90"
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
