import { ReactNode } from "react"
// import Image from 'next/image'
// import sandy from './sandy.jpg'

type QWrapperProps = {
  title: string,
  children: ReactNode;
}

export function QWrapper({ title, children }: QWrapperProps) {
  return (
    <section className="flex flex-col min-h-screen bg-[#3B28CC] text-white">
      {/* <div className="flex justify-center mb-8">
        <Image
          src={sandy}
          width={400}
          height={400}
          alt="illustration"
          priority={true}
        />
      </div> */}
      <h2 className="text-2xl mb-4 ">{title}</h2>
      <div className="flex-1 p-4">
        {children}
      </div>
    </section>
  )
}
