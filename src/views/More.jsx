import React from 'react'
import { Link, useLocation } from "react-router-dom";
import Header from "../component/Header";
 import { Info } from "lucide-react";



const More = () => {
  return (
    <div className=" flex  justify-center  ">
                 <Header header={"More"} />

        <div className="w-full max-w-[560px] px-[20px]">

            <div className="mt-[60px] w-full grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="">
    <Link
  to={"/appinfo"}
  className="flex justify-center items-center rounded-[10px] bg-white dark:bg-neutral-800 h-[150px] dark:text-white w-full cursor-pointer"
>
  <div className="flex flex-col justify-center items-center gap-2">
    <Info className="w-[40px] h-[40px] text-blue-400" />
    <p className="text-blue-400">AppInfo</p>
  </div>
</Link>
  </div>
  </div>
            </div>
    </div>
  )
}

export default More