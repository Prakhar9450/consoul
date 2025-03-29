"use client"
import { OrbitingCirclesDemo } from "../components/ToolsCloud"
import { Ready } from "../components/Ready"


export const SuccessStories = () => {
  
  return (
    <div>
    
      <div className="md:my-16 flex justify-center items-center ">
        <div className="text-2xl md:text-5xl font-extrabold text-[#555555] mb-4 md:mb-6 text-center flex justify-end">
          Tools worked on
        </div>
        <div className="w-full max-w-2xl flex justify-center">
          <OrbitingCirclesDemo />
        </div>
      </div>
      <div>
        <Ready />
      </div>
    </div>
  )
}

