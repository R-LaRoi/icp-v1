import React from "react";
import './icpHome.css'


export const MainForm = (): React.ReactElement =>

{
return(


 <div className="form m-16 ">
  
  <form className=" h-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h1>Career Planning</h1>
    <div className=" pt-10 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
 Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
    Email
      </label>
      <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="email" placeholder="@"/>
      {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
    </div>
    <div className="flex items-center justify-between">
      <button className=" start-btn hover:bg-red-400 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="button">
GET STARTED
      </button>
   
    </div>
  </form>
 </div>


  )
  
}