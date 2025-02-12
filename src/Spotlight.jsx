import React from 'react'

export default function Spotlight() {
  return (
    <div className="h-screen grid place-content-center bg-neutral-900  relative   ">
      <div className="absolute inset-0 bg-fuchsia-800 bg-[size:20px_20px] opacity-20 blur-[100px] "></div>
      {/* Dimmer background */}
      <div className="absolute inset-0 bg-black/30 opacity-60"></div>
    
      


      
      {/* Grid Pattern */}
      <div className="absolute inset-0    bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]  "></div>

      <div className="z-10">
        <div className=" flex justify-center items-center mb-10 relative"> 
<PiFlashlight className="text-white text-4xl rotate-180 "/> 
          <div class="triangle    "></div> 
        </div>
        <div className="bg-clip-text text-transparent text-center bg-gradient-to-b   from-neutral-600 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          <p className="text-lg mb-5 font-normal tracking-normal">
            Introducing
          </p>
          <p className="text-7xl mb-10">Saad Almajdi</p>
          <p className="text-5xl">Worlds best foodie :)</p>
        </div>
        <div className="border border-slate-100 rounded-2xl p-5 text-white">
          <ul className="">
            <li className="flex justify-evenly">
              <a href="" className="cursor-pointer hover:underline">
                Home
              </a>
              <a href="" className="cursor-pointer hover:underline">
                Photos
              </a>
              <a href="" className="cursor-pointer hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
