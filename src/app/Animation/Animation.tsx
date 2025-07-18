'use client';
import React from 'react';
import '../Animation/animation.css';
import { div } from 'framer-motion/client';

export const Animation = () => {
  return (



    <div className="section">
      <div className="container">
        <div className="circle-wrapper">

          <div className="circle">
            <div className="people-wrapper">
              {[0, 1].map((index) => (
                <img
                  key={index}
                  src={`https://github.com/user-attachments/assets/${index === 0 ? 'a76ba3b3-5169-4da4-a8a4-33711bc6233c' : 'a0043458-93f5-444d-806b-096e4a9951f9'}`}
                  alt=""
                  className="avatar"
                />
              ))}
            </div>
          </div>


          <div className="circle inner-circle" />


          <div className="circle inner-circle-overlay">
            <div className="people-wrapper">
              {[0, 1].map((index) => (
                <img
                  key={index}
                  src={`https://github.com/user-attachments/assets/${index === 0 ? '7b64ab2b-c898-43a4-a435-a50d85156de7' : 'a6b118a5-4b59-45ae-8b8c-276fd7e3a841'}`}
                  alt=""
                  className="avatar"
                />
              ))}
            </div>
          </div>

          <div className="">

            <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="text-container bg-transparent flex flex-col items-center justify-center">
                <div className="blur-background absolute top-0 left-0 w-full h-full"></div>
                <h1 className="font-light text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-nowrap relative z-10">
                  From big dreams to small wins,
                </h1>
                <h1 className="font-light text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-nowrap relative z-10">
                  create your path to success.
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white mt-5 relative z-10"></p>
              </div>
            </div>

            <div className="circle-text-background" />


          </div>
        </div>
      </div>
    </div>
  );
};

