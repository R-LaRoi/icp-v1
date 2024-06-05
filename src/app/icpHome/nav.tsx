import React from "react";
import './icpHome.css'


export const Navigation = (): React.ReactNode =>

{
return(

  <div className="nav m-3">
    <ul className="flex justify-between">
  <li className="mr-3">
    <span className="flex justify-between  ">
    <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="#D87355" className="size-9" > 
  <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
</svg>
<p className="mx-2 text-3xl text-stone-300">ICP</p>

 </span>
  </li>
<li><button style={{backgroundColor:"#D87355"}} className="  start-btn bg-hover:stone-400 text-white font-bold py-2 px-8 focus:outline-none focus:shadow-outline" type="submit" 
    >
login

      </button></li>
</ul>
  </div>


  )
  
}