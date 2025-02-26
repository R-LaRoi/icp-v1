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
            <div className="text-5xl text-[#3515B7]">
              Empower your path forward <br /> with clarity and precision.
            </div>
            <div className="mr-32">
              <MainForm />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
