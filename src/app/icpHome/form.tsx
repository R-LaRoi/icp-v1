'use client'
import './icpHome.css'
import React, {useState} from 'react'
import { useRouter } from "next/navigation";


export const MainForm = (): React.ReactNode => {

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
 <h1 className = "font-light text-7xl h1-form">Get closer to your goal today.</h1>
 <p className='text-2xl mt-5 p-2'>Let us help you plan ahead and take the
 next step <br/> towards your new career.</p>
 <form onSubmit = {formSubmitted}

  className="h-96 bg-white rounded pb-5 mb-4">
    
    <div className=" pt-10 mb-4">
      {/* <label className="block text-gray-700 text-sm font-bold mb-2" >
 Name
      </label> */}
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="username" 
      min={7}
      type="text" 
      placeholder="enter name"
      onChange={formChange} 
      required
      name="userInput"

      />
    </div>
    <div className="mb-6">
      {/* <label className="block text-gray-700 text-sm font-bold mb-2" >
    Email
      </label> */}
      <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" 
      type="email" 
      name = "email"
      placeholder="enter email"
       onChange={formChange}
         required
              />
    
    </div>
    <div className="flex items-center justify-between">
      <button className="  start-btn bg-hover:stone-400 text-white font-bold py-2 px-8 focus:outline-none focus:shadow-outline" type="submit" 
    >
GET STARTED
      </button>
   
    </div>
  </form>
 </div>


  )
}
