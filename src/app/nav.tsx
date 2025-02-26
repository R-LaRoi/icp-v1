'use client'
import React from "react";
import './icpHome/icpHome.css'
import Link from 'next/link'


export const Navigation = (): React.ReactNode => {


  return (
    <div className="fixed top-0 left-0 right-0  h-[70px] p-4 z-10">
      <ul className="flex justify-between">
        <div>
          <Link href="/">
            <li className="mr-3 pb-8">

              <p className="mx-2 text-2xl 
              text-stone-300 ">ICP</p>

            </li>
          </Link>
        </div>
        <li>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="https://www.linkedin.com" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">LinkedIn</Link>
              <Link href="https://stroy.dev" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Stroy</Link>
              <Link href="https://github.com" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">GitHub</Link>
            </div>
          </div>

        </li>
      </ul>
    </div>
  )
}
