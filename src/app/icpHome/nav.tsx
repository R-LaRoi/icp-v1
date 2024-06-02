import React from "react";
import './icpHome.css'

export const Navigation = (): React.ReactElement =>

{
return(

  <div className="nav m-4">
    <ul className="flex">
  <li className="mr-3">
    <a className="inline-block" href="#"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#D87355" className="size-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</a>
  </li>

</ul>
  </div>


  )
  
}