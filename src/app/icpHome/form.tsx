"use client"
import './icpHome.css'
import React, {useState} from 'react'
import { useRouter } from "next/navigation";


export const MainForm = (): React.ReactElement => {

const router = useRouter()
let [userInput, setUserInput] = useState({});


 function formSubmitted (event:any)  {
        event.preventDefault();

        const submitData = {
          ...userInput
        }
        router.push('/Questions')
        console.log(submitData)
}

function formChange (event:any) {
   const { target } = event;
    const { name, value } = target;

      setUserInput({
      ...userInput, // Keep existing form data
      [name]: value // Update form data for the input field that changed
    });
}



return(


 <div className="form m-16 ">
 <form onSubmit = {formSubmitted}

  className="h-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h1>Career Planning</h1>
    <div className=" pt-10 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
 Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="username" 
      type="text" 
      placeholder="Name"
      onChange={formChange} 
      required
      name= "userInput"
 
      
      
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
    Email
      </label>
      <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" 
      type="email" 
      name = "email"
      placeholder="@"
       onChange={formChange}
         required
              />
    
    </div>
    <div className="flex items-center justify-between">
      <button className=" start-btn hover:bg-red-400 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit" 
    >
GET STARTED
      </button>
   
    </div>
  </form>
 </div>


  )
}
