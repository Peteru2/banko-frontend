import React from 'react'
import { Link, useLocation } from "react-router-dom";
import Header from "../component/Header";
 


const More = () => {
  return (
    <div className=" flex  justify-center  ">
        <div className="w-full max-w-[560px]">
            <div className="mt-[50px]">
                 <Header header={"More"} />
                 <Link
                  to={"/appinfo"}
                  
                  className=" flex-col  dark:text-white items-center  w-full cursor-pointer"
                >
                  <li className=" ml-[20px] text-blue-400">  AppInfo</li>
                    </Link>
            </div>
            </div>
    </div>
  )
}

export default More