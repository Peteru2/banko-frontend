// import ProImg from "./images/ProImg.svg"
import ProImg from "../../assets/image/ProImg.svg";
import { useState, useEffect } from "react";
import Notification from "../Notification";
import api from "../../services/api";
import { Link } from "react-router-dom";


const Navbar = ({ userData }) => {
  const [notice, setNotice] = useState(false);
  const [acctBalance, setAcctBalance] = useState(null);
  const handleNotice = () => {
    setNotice((notice) => !notice);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/balance");
        setAcctBalance(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch user data:");
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <nav className=" w-full h-12 justify-center  flex items-center font-roboto ">
        <div className=" flex w-full max-w-[600px] bg-bg mb-[100px]  fixed top-0 h-[48px] rounded-md rounded-b-[0px] border-b-[1px] border-gray items-center">
          <div className="w-full flex items-center justify-between">
            <Link to='/profile'>
          <div className="ml-[20px]">
            <img
              src={ProImg}
              alt="profileImage"
              className=" text-black  w-[22px] h-[22px]  rounded-full"
            />
          </div>
          </Link>
          <div>
            <p className="text-black text-[16px] text-opacity-70"> ₦{acctBalance && acctBalance.toLocaleString()}</p>
          </div>
          <div className=" relative cursor-pointer w-[22px] mr-[17px]" onClick={handleNotice}>
            <i className="fa fa-bell  text-black"></i>
            <span className="absolute left-[10px] top-[2px] bg-red w-1 h-1 rounded-full"></span>
          </div>
          </div>
        </div>
      </nav>

      <div  className={ `genModal font-roboto ${notice? "modal-show w-full":""}`} >
                 <h2 onClick ={handleNotice} className='absolute top-0 cursor-pointer'><i className="fa fa-arrow-left"> </i></h2>
           <Notification />
        </div>
    </>
  );
};

export default Navbar;
