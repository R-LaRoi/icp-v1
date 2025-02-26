import React from "react"

export const Footer = (): React.ReactNode => {

  return (

    <footer className="footer bg-[#3515B7] md:flex md:items-center p-4 md:p-4 xl:p-8  bottom-0 left-0 right-0">
      <ul className="flex items-center flex-wrap mb-6 md:mb-0">
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline mr-4 md:mr-6">Terms and conditions</a></li>
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline mr-4 md:mr-6">Privacy Policy</a></li>
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline mr-4 md:mr-6">Licensing</a></li>
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline mr-4 md:mr-6">Cookie Policy</a></li>
        <li><a href="#" className="text-sm font-normal text-slate-100 hover:underline">Contact</a></li>
      </ul>
    </footer>
  )


}