import React from "react";
import './icpHome.css'
import { Navigation } from '../nav'
import { Footer } from "./footer";
import { MainForm } from "./form";
import { Animation } from "../Animation/Animation";

export const IcpHome = (): React.ReactNode => {
  return (
    <div className="relative">
      <Navigation />
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>
      <div className="h-screen"></div> {/* Spacer to push content down */}
      <div className="relative z-10 min-h-screen bg-[#E5F1FE] flex items-center">
        <div className="w-full px-12">
          <div className="flex justify-between items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl text-[#3515B7]">
              <div className="mb-2 sm:mb-0">Empowering your journey one step at a time.</div>
              <div className="text-xl sm:text-2xl md:text-3xl py-3 w-full sm:w-3/4 mt-4">Large goals can feel overwhelming, but breaking them down into smaller, manageable tasks makes them more achievable.</div>
              <div>
                <MainForm />
              </div>
            </div>


          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
