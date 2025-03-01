import { ReactNode } from "react"
// import Image from 'next/image'
// import sandy from './sandy.jpg'

type QWrapperProps = {
  title: string,
  children: ReactNode;
}

export function QWrapper({ title, children }: QWrapperProps) {
  return (
    <section className="flex flex-col min-h-screen bg-[#3B28CC] text-white py-[3rem]">
      <h2 className="text-xl sm:text-2xl mb-4 px-4 sm:px-0">{title}</h2>
      <div className="flex-1 p-4">
        {children}
      </div>
    </section>
  )
}
