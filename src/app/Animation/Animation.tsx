'use client';
import React from 'react';
import '../Animation/animation.css';

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
                  src={`https://cdn.prod.website-files.com/67583dc0980c81a0a2e9f619/${index === 0 ? '6763f2c3a5037374b77ef7b0_rodeo-project-management-software-HBMPQZZondc-unsplash.avif' : '6765b686509ecef426578d19_group-people-working-out-business-plan-office-min.webp'}`}
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
                  src={`https://cdn.prod.website-files.com/67583dc0980c81a0a2e9f619/${index === 0 ? '6765b686509ecef426578cf9_young-woman-sitting-reception-drinking-coffee.webp' : '67640c4302bfd8761661cc43_rodeo-project-management-software-m2GFQaCM-KI-unsplash-min.jpg'}`}
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

