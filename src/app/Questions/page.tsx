'use client'
import React from "react";
import { Navigation } from "../nav";
// import Image from 'next/image'
// import sandy from './sandy.jpg'
import { useRouter } from "next/navigation";



export default function ShowQuestions(): React.ReactNode {
  const router = useRouter()
  function handleBtn(event: any) {
    event.preventDefault();
    router.push('/Questions/SelfAssesment')
    console.log('this')

  }


  return (
    <section>
      <Navigation />
      <section className="p-12">
        <div className="questions-img">
          {/* {mainImg} */}
          {/* <Image src={sandy}
            width={400}
            height={400}
            alt="illustration"
            priority={true} /> */}
        </div>
        <main>
          <div className="form m-16 " >
            <h1 className="font-light text-7xl text-indigo-800">One step at a time.</h1>
            <p className='text-2xl mt-5 p-2'>Let's get started with a few questions about you.</p>

            {/* <BtnQuestions  submit={}/> */}
            <button className="arrows mx-2 mt-2 px-2" id="show-questions"
              onClick={handleBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffff" className="size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </button>

          </div>
        </main>
      </section>
    </section>
  )
}

