import React from "react"

export const Footer = (): React.ReactNode => {

return(

  <footer className=" footer bg-white md:flex md:items-center  p-4 md:p-4 xl:p-8 my-2 mx-2">
    <ul className="flex items-center flex-wrap mb-6 md:mb-0">
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline mr-4 md:mr-6">Terms and conditions</a>
        </li>
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline mr-4 md:mr-6">Privacy Policy</a></li>
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline mr-4 md:mr-6">Licensing</a></li>
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline mr-4 md:mr-6">Cookie Policy</a></li>
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline">Contact</a></li>
    </ul>
    
</footer>
)


}