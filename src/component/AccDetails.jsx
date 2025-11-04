import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthContext.jsx";
import TransPinForm from "./TransPinForm.jsx";
import UpdateKyc from "./UpdateKyc.jsx";
import { TransComp } from "./TransComp.jsx";
import Loader from "./Loader.jsx";
import { Link } from "react-router-dom";
import api from "../services/api"
import UpdatePhoneNumber from './UpdatePhoneNumber.jsx'
import ThemeToggle from "./ThemeToggle.jsx";
import {useTheme} from "../context/ThemeContext"
import themedSwal from "../utils/themedSwal"

const AccDetails = () => {
  const { userData, fetchData } = useAuth();
  const {theme} = useTheme()

  const [bvn, setBvn] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [showUpdatePhoneNumber, setShowUpdatePhoneNumber] = useState(false);
  

  useEffect(() => {
    if (userData && userData.transactionPin === "0") {
      setShowPinInput(true);
    } else {
      setShowPinInput(false);
    }
    
    if(userData && userData.phoneNumber === "" ){
      setShowUpdatePhoneNumber(true)
    }
   
  }, [userData]);

  const handleSubmitTransactionPin = async (pin) => {
    try {
      const response = await api.put("/updateTransactionPin", { pin });
      themedSwal({

        icon: "success",
        title: "Success!",
        text: "Transaction Pin updated successfully.",
        showConfirmButton: false,  
  timer: 2000,               
  timerProgressBar: true,
      }, theme)
       


      setShowPinInput(false);
      await fetchData(); 
    } catch (error) {
      theme({
          icon: "error",
        title: "Oops...",
        text: "Failed to update transaction pin",
        showConfirmButton: false,  
  timer: 2000,               
  timerProgressBar: true,
      }, theme)
      
      console.error("Failed to update transaction pin:", error);
    }
  };

  const handleUpdateBvn = () => setBvn(true);

  if (!userData) {
    return (
      <div className="w-full flex justify-center">
        <Loader />
      </div>
    );
  }

  const trans = userData.transferHistory?.slice().reverse() || [];

  return (
    <div className="w-full justify-center flex font-roboto">
      <div className="w-full max-w-[560px] ">
        
        {/* <div className="flex items-center">
          <div>
            <p className="font-bold">
              {userData.firstname} {userData.lastname}
            </p>
            <p className="text-gray text-xs">KYC LEVEL {userData.kycLevel}</p>
            <p className="text-xs">{userData.accountNum}</p>
          </div>

          {userData.kycLevel === "1" && (
            <div className="flex items-center bg-white shadow-md p-4 rounded-[10px] text-private ml-10">
              <i className="fa fa-heart"></i>
              <div className="mx-4">
                <button onClick={handleUpdateBvn}>Upgrade to Level 2</button>
              </div>
              <span>
                <i className="fa fa-sort-up rotate-90"></i>
              </span>
            </div>
          )}
        </div> */}

       
        {showPinInput && (
          <form className="modal w-[300px] font-roboto modal-show">
            <div className="bg-white dark:bg-neutral-800 dark:text-white p-4 rounded-[6px]">
              <h2 className="text-19px dark:text-white text-center">Set Your Transaction Pin</h2>
              <TransPinForm onSubmit={handleSubmitTransactionPin} />
            </div>
          </form>
        )}

      {showUpdatePhoneNumber && (
            <div className="modal w-[300px] font-roboto modal-show">
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-[6px]">
              <h2 className="text-19px dark:text-opacity-70 dark:text-white text-center">Input your Phone Number</h2>
              <UpdatePhoneNumber setShowUpdatePhoneNumber= {setShowUpdatePhoneNumber} />
            </div>
          </div>
      )}
        
        {bvn && (
          <div className="modal font-roboto modal-show">
            <UpdateKyc onClose={() => setBvn(false)} />
          </div>
        )}

        {(showPinInput || bvn || showUpdatePhoneNumber) && <div className="overlay"></div>}
        <div className="flex justify-between mx-[20px] md:mx-0 mt-4">
          <p className="md:text-[18px] text-black dark:text-white text-opacity-70">
            Latest transactions
          </p>
          <Link to="/History">
            <p className="text-private">View all</p>
          </Link>
        </div>

        <TransComp
          transHis={userData.transferHistory}
          trans={trans.slice(0, 3)}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default AccDetails;
