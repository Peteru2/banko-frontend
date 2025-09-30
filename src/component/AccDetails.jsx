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

// const socket = io.connect('http://localhost:8000');

const AccDetails = ({ userData, setUserData }) => {
  const [bvn, setBvn] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [acctBalance, setAcctBalance] = useState(null);
  const [acctNum, setAcctNum] = useState(null);
  const [transHis, setTransHis] = useState(null);
  const [useData, setUseData] = useState("");
  const navigate = useNavigate();
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
        const userResponse = await api.get("/");
        const response1 = await api.get("/trans-history");
        setTransHis(response1.data.transferHistory || []);
        setUseData(userResponse.data.user);
        setAcctBalance(response.data.balance);
        setAcctNum(response.data.accountNum);

        if (userData.transactionPin == "0") {
          setShowPinInput(true);
        }
      } catch (error) {
        // console.error("Failed to fetch user data:");
        if (error.response.data.error == "No history found") {
          setTransHis([]);
          console.log(transHis);
        }
      }
      console.log(userData);
    };
    fetchData();
  }, []);

  const handleSubmitPin = async (pin) => {
    try {
      const response = await api.put("/updateTransactionPin", { pin });  
      setShowPinInput(false);
      toast.success("Transaction Pin updated", {
        position: "top-right",
      });
      setTimeout(() => {
            window.location.href = "/";
          } , 100); 
      console.log(response.data);
    } catch (error) {
      console.error("Failed to update transaction pin:", error);
    }
  };
  const handleUpdateBvn = () => {
    setBvn(true);
  };
  const trans = transHis && transHis.slice().reverse();

  return (
    <>
      { acctBalance ? (
        <div className="font-roboto">
          <form
            onSubmit={handleSubmitPin}
            className={`modal w-[300px]  font-roboto ${showPinInput ? "modal-show" : ""}`}
          >
            <div className="bg-white p-4 rounded-[6px] ">
              <h2 className="text-19px text-center">
                Set Your Transaction Pin
              </h2>
              <TransPinForm onSubmit={handleSubmitPin} />
            </div>
          </form>
        
        
          {/* <div className="flex items-center ">
            <h4 className="bg-private text-[20px] mr-4 px-3 rounded-[2px]">
              ₦
            </h4>
            <div>
              {userData && (
                <div>
                  <p className="font-bold">
                    {" "}
                    {userData.firstname + " " + userData.lastname}
                  </p>
                  <p className="text-gray text-xs">
                    KYC LEVEL {userData.kycLevel}{" "}
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
            )}
          </div>
           
          <div className={`modal font-roboto ${bvn ? "modal-show" : ""}`}>
            <UpdateKyc onClose={() => setBvn(false)} />
          </div> */}

          <div className={`${showPinInput || bvn ? "overlay" : ""} `}></div>

          <div className="w-full max-w-[560px]  ">
            <div className="flex justify-between w-full">
              <p className="text-[20px] text-black text-opacity-70 ">Latest transactions</p>
               <Link to="/History"><p className="text-private">View all</p></Link>
            </div>
            <TransComp
              transHis={transHis}
              trans={trans.slice(0,3)}
              userData={userData}
              option={option}
            />
          </div>
          <ToastContainer />
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default AccDetails;