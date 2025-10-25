// import ProImg from "./images/ProImg.svg"
import ProImg from "../../assets/image/ProImg.svg";
import { useState, useEffect } from "react";
import Notification from "../Notification";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Navbar = () => {
  const {userData} = useAuth()
  const [notice, setNotice] = useState(false);

  const handleNotice = () => {
    setNotice((notice) => !notice);
  };
  const hasTransactions = userData.transferHistory && userData.transferHistory.length > 0;

 
  return (
    <>
      <nav className=" w-full h-12 justify-center  flex items-center font-roboto ">
        <div className=" flex w-full max-w-[600px] dark:bg-darkGray bg-bg mb-[100px]  fixed top-0 h-[48px] rounded-md rounded-b-[0px] border-b-[1px] border-gray items-center">
          <div className="w-full flex items-center justify-between">
            <Link to='/profile'>
          <div className="ml-[20px]">
            {userData?.profileImage? (<img
              src={userData?.profileImage || ProImg}
              alt="profileImage"
              className=" text-black  w-[22px] h-[22px]  rounded-full"
            />):(

            <i className="fa fa-user text-black text-opacity-70 rounded-full"></i>

            )}
            
          </div>
          </Link>
          <div>
            <p className="text-black text-[16px] font-bold   text-opacity-70"> ₦{userData?.balance?.toLocaleString()}</p>
          </div>
          <Link to ={'/notification'}>
          <div className=" relative cursor-pointer w-[22px] mr-[17px]" onClick={handleNotice}>
            <i className="fa fa-bell text-black text-opacity-70"></i>
            <span className={`${hasTransactions?"bg-red":""} absolute left-[10px] top-[2px]  w-1 h-1 rounded-full`}></span>
          </div>
          </Link>
          </div>
        </div>
      </nav>

      {/* <div  className={ `genModal font-roboto ${notice? "modal-show w-full":""}`} >
                 <h2 onClick ={handleNotice} className='absolute top-0 cursor-pointer'><i className="fa fa-arrow-left"> </i></h2>
           <Notification />
        </div> */}
    </>
  );
};

export default Navbar;
