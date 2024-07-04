import { ReactNode } from "react"

type QWrapperProps = {
  title: string,
  children: ReactNode;
}


export function QWrapper ({title, children}: QWrapperProps){

  return (

    <>
  <h2 className=" m-4font-regular m-4 text-5xl text-stone-600">{title}</h2>

  <div className=" p-4 bg-stone-500">{children}</div>
    </>
  )


}