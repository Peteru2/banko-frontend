import React, { useState } from "react";
import api from "../services/api.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";


const TransactionForm = () => {
  const { fetchData, setUserData } = useAuth()
  const [recipientAccountNumber, setRecipientAcctNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transPin, setTransPin] = useState("");
  const [trans, setTrans] = useState(false);
  const [userTransferData, setUserTransferData] = useState("");
  const [icon, setIcon] = useState(false);
  const [accountBalance, setAccountBalance] = useState(false);


  const handleSubmitVal = async (e) => {
    e.preventDefault();
    try {
     
      const response = await api.post("/val_transfer", {
        recipientAccountNumber,
        amount,
      });
      if (response){
        
      }
      setUserTransferData(response.data.user);
      
      console.log(userTransferData)

      if (response.data.message == "success") {
        setTrans(true);
      }
    } catch (error) {
      toast.error(error.response.data.error);

    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIcon(true)
    try {
      const response = await api.post("/transfer", {
        recipientAccountNumber,
        amount,
        transPin,
      });

      toast.success(response.data.message);
      if (response.data.message == "Funds transferred successfully") {
        setTrans(false);
        setRecipientAcctNumber("");
        setAmount("");
        setTransPin("");
        setIcon(false);
        setTimeout(() => {
            window.location.href = "/";
          } , 1000); 
        
      }
      const balResponse = await api.get("/balance");
      setAccountBalance(balResponse.data.balance);
      // Clear the form after successful transaction
    } catch (error) {
      toast.error(error.response.data.error);
        setIcon(false);

    }
  };

  return (
    <div className="w-full flex mt-[50px] justify-center font-roboto">
      <div className="bg-white shadow-md rounded-[12px] p-8 w-[400px]">
        <h2 className="text-center font-bold text-private">Transfer Funds</h2>
        <form>
          <div className="my-4">
            <label
              htmlFor="recipientId"
              className="text-sm text-black text-opacity-50"
            >
              Recipient Account:
            </label>
            <div className="w-full">
              <input
                type="number" // Set type to number
                id="recipientId"
                value={recipientAccountNumber}
                onChange={(e) => setRecipientAcctNumber(e.target.value)}
                required
                className="border-[1px] w-full text-sm rounded-[8px] p-2 outline-none border-gray"
                placeholder="Account Number"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="text-sm text-black text-opacity-50"
            >
              Amount:
            </label>
            <div className="">
              <input
                type="number" // Set type to number
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="border-[1px] w-full text-sm rounded-[8px] p-2 outline-none border-gray"
                placeholder="Minimum of ₦50"
              />
            </div>
          </div>

          {userTransferData && (
            <div
              className={`modal font-roboto w-[350px] ${trans ? "modal-show" : ""}`}
            >
              <div className="bg-white p-4 shadow-lg rounded-[8px]">
                <div className=" flex w-full">
                  <h2 className=" mb-2 text-sm text-black text-opacity-30">
                    Recipient Name:{" "}
                    <span className="text-private font-bold uppercase">
                      {userTransferData.firstname + " " + userTransferData.lastname}
                    </span>
                  </h2>
                  <span
                    onClick={() => setTrans(false)}
                    className="ml-auto  text-sm  cursor-pointer"
                  >
                    <i className="fa fa-times"></i>
                  </span>
                </div>

                <div className="flex w-full">
                  <label className="text-sm text-black text-opacity-50 text-center ">
                    Transaction Pin
                  </label>
                </div>
                <div className="">
                  <input
                    type="number"
                    value={transPin}
                    onChange={(e) => setTransPin(e.target.value)}
                    className="border-[1px] w-full text-sm mt-1 rounded-[8px] p-2 outline-none border-gray"
                    placeholder="Your pin"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full text-center bg-private mt-4 rounded-[8px] py-2 text-white"
                  disabled={icon}
                >
                  {icon ? (
                    <span>
                      Paying <i className="fas fa-spinner fa-spin"></i>
                    </span>
                  ) : (
                    <span>Pay</span>
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmitVal}
            className="w-full text-center bg-private mt-4 rounded-[8px] py-2 text-white"
            
          >
            Pay
          </button>
        </form>
      </div>
      <div className={`${trans ? "overlay" : ""} `}></div>
      <ToastContainer />
    </div>
  );
};

export default TransactionForm;
