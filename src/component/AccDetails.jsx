import { useState, useEffect } from "react";
import api from "../services/api.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransPinForm from "./TransPinForm.jsx";
import UpdateKyc from "./UpdateKyc.jsx";
import TransHistory from "./TransHistory.jsx";
import TransactionForm from "./TransactionForm.jsx";
import Loader from "./Loader.jsx";
import { useNavigate } from "react-router-dom";
import { TransComp } from "./TransComp.jsx";
import { useAuth } from "./AuthContext.jsx";
import { Link } from "react-router-dom";
import Cards from "./Cards.jsx";
import Swal from "sweetalert2";

// const socket = io.connect('http://localhost:8000');

const AccDetails = () => {
  const {userData, setUserData} = useAuth()
  const [bvn, setBvn] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [acctNum, setAcctNum] = useState(null);
  const [transHis, setTransHis] = useState(null);

  const option = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", // Adjust the time zone as needed
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/balance");
        const transactionResponse = await api.get("/trans-history");
        setTransHis(transactionResponse.data.transferHistory || []);
        setAcctBalance(response.data.balance);
        setAcctNum(response.data.accountNum);

        if (userData.transactionPin === "0") {
          setShowPinInput(true);
        }
        console.log(userData)
      } catch (error) {
        if (error.response?.data?.error == "No history found") {
          setTransHis([]);

        }
      }
    };
    fetchData();
  }, [userData]);

  const handleSubmitTransactionPin = async (pin) => {
    try {
      const response = await api.put("/updateTransactionPin", { pin });
      if(response.data){
        Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Transaction Pin updated successfully.",
      });
        
        setShowPinInput(false);
        setUserData(response?.data)
      }
      console.log(userData?.transactionPin)
      // setTimeout(() => {
      //   window.location.href = "/";
      // }, 100);
   
    } catch (error) {
      Swal.fire({
    icon: "error",
    title: "Oops...",
    text:   "Invalid BVN Pin",
  });
      console.error("Failed to update transaction pin:", error);
    }
  };
  const handleUpdateBvn = () => {
    setBvn(true);
  };
  const trans = transHis && transHis.slice().reverse();

  return (
    <div className=" w-full justify-center  flex  font-roboto ">
      <div className="w-full max-w-[560px]  mx-[20px]  ">        
            <div className="flex items-center ">
            {/* <h4 className="bg-private text-[20px] mr-4 px-3 rounded-[2px]">
              ₦
            </h4> */}
            {/* <div>
              {userData && (
                <div>
                  <p className="font-bold">
                    {" "}
                    {userData?.firstname + " " + userData?.lastname}
                  </p>
                  <p className="text-gray text-xs">
                    KYC LEVEL {userData?.kycLevel}{" "}
                  </p>
                </div>
              )}
              {acctNum && <p className="text-xs">{acctNum}</p>}
            </div>
            {userData.kycLevel === "1" && (
              <div className="flex items-center bg-white shadow-md p-4 rounded-[10px] text-private ml-10">
                <i className="fa fa-heart"></i>
                <div className="mx-4">
                  <h2>
                    <button onClick={() => handleUpdateBvn()}>
                      Upgrade to Level 2
                    </button>
                  </h2>
                </div>
                <span>
                  <i className="fa fa-sort-up rotate-90"></i>
                </span>
              </div>
            )} */}
          </div>
        {userData ? (
          <div className="font-roboto">
            <form
              onSubmit={handleSubmitTransactionPin}
              className={`modal w-[300px]  font-roboto ${showPinInput ? "modal-show" : ""}`}
            >
              <div className="bg-white p-4 rounded-[6px] ">
                <h2 className="text-19px text-center">
                  Set Your Transaction Pin
                </h2>
                <TransPinForm onSubmit={handleSubmitTransactionPin} />
              </div>
            </form>

           
          <div className={`modal font-roboto ${bvn ? "modal-show" : ""}`}>
            <UpdateKyc onClose={() => setBvn(false)} />
          </div>

            <div className={`${showPinInput || bvn ? "overlay" : ""} `}></div>

            <div className="flex justify-between ">
              <p className="md:text-[18px] text-black text-opacity-70">
                Latest transactions
              </p>
              <Link to="/History">
                <p className="text-private">View all</p>
              </Link>
            </div>

            <TransComp
              transHis={transHis}
              trans={trans?.slice(0, 3)}
              userData={userData}
              option={option}
            />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AccDetails;
