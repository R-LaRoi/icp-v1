import { ReactNode } from "react"
import Image from 'next/image'
import sandy from './sandy.jpg'
type QWrapperProps = {
  title: string,
  children: ReactNode;

}

export function QWrapper({ title, children }: QWrapperProps) {
  return (
    <section className="m-7 p-3 ">
      <Image src={sandy}
        width={400}
        height={400}
        alt="illustration"
        priority={true} />
      <h2 className=" m-4font-regular m-4 text-5xl text-stone-600">{title}</h2>
      <div className="text-reveal">
        <span>{children}</span>
      </div>
    </section>
  )


}