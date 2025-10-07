import React from 'react'
import Header from '../component/Header'
import { useAuth } from '../component/AuthContext'

const Profile = () => {
    const { logout } = useAuth()
  return (
    <div className="flex justify-center font-roboto">
        <div className=" w-full max-w-[560px] "> 
    
        <Header header={'Profile'}/>
  
  <div className='mx-[20px] '>
    
        <button
        onClick={logout}
        className='w-full bg-white text-left outline-none shadow rounded-[5px] py-[15px] text-red px-[15px]'
        >
       <i className='fa fa-sign-out'></i> Logout    

        </button>
   
  </div>
    </div>
    </div>
  )
}

export default Profile