import React from "react";
import './icpHome.css'
import {Navigation} from './nav'
import { Footer } from "./footer";
import { MainForm } from "./form";
import Image from 'next/image'
import imgimg from './mainImg.jpg'


export const IcpHome = (): React.ReactNode =>

{

 return(
  <div className="main-container">
  <Navigation/>
<article className=" mt-12">
  <div className="img">
  {/* {mainImg} */}
  <Image src={imgimg}
        width={600}
        height={600}
        alt="illustration"
        priority={true} />
  </div>
  </article>
  <article className=" mt-12">
  <MainForm/>
  </article>
<Footer />
  </div>
  )
  
}
