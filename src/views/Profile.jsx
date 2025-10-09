import React from 'react'
import Header from '../component/Header'
import { useAuth } from '../component/AuthContext'
import { useState } from 'react'

const Profile = () => {
    const { logout, userData } = useAuth()
    const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userData.accountNum);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <div className="flex justify-center font-roboto">
        <div className=" w-full max-w-[560px] "> 
    
        <Header header={'Profile'}/>
  
  <div className='mx-[20px]  '>
    <div className="bg-white  my-2 p-[15px]">
      <h2>Hi, {userData.firstname} </h2>
      <div classname="font-tiny mt-[40px] ">
    <div className='text-[12px] flex mt-1 justify-between'>
      <h2>Full Name</h2>
      <h2>{userData.firstname} {" "} {userData.lastname}</h2>
      </div>
      <div className='text-[12px] mt-1   flex justify-between'>
      <h2>Banko Account Number</h2>
      <div className="flex relative">
      <h2>{userData.accountNum} </h2>
      <button
          onClick={handleCopy}
          className="ml-1 hover:text-private transition"
        >
          <i className="fa fa-copy text-gray"></i>
        </button>
        {copied && (
          <span className="text-[10px] absolute bottom-[-14px] bg-white shadow p-[1px] right-[-8px] text-green-600 ml-1 animate-pulse">
            Copied!
          </span>
        )}
      </div>  
      </div>
      </div>
    </div>
        <button
        onClick={logout}
        className='w-full bg-white text-left outline-none shadow rounded-[5px]  p-[15px] text-red '
        >
       <i className='fa fa-sign-out'></i> Logout    

        </button>
   
   {/* <form className="">
        <input type="file" />
   </form> */}
  </div>
    </div>
    </div>
  )
}

export default Profile