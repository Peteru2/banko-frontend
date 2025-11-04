import React, { useState } from "react";
import api from "../services/api.jsx";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx"
import themedSwal from "../utils/themedSwal"

const TransactionForm = ({ handleShowTransferForm }) => {
  const { fetchData } = useAuth(); 
  const { theme } = useTheme()
  const [recipientAccountNumber, setRecipientAcctNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transPin, setTransPin] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recipientData, setRecipientData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [validating, setValidating] = useState(false); 

  const handleSubmitValidation = async (e) => {
    e.preventDefault();
    setValidating(true); 
    try {
      const response = await api.post("/validateTransfer", {
        recipientAccountNumber,
        amount,
      });
      
      if (response.data.message === "success") {
        setRecipientData(response.data.user);
        setShowConfirmModal(true);
      }
    } catch (error) {
      themedSwal({
      icon: "error",
        title: "Oops...",
        text: error.response?.data?.error || "Something went wrong!",
    }, theme);
     
    } finally {
      setValidating(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/transfer", {
        recipientAccountNumber,
        amount,
        transPin,
      });

      themedSwal({
        icon: "success",
        title: "Success!",
        text: response.data.message,
        showConfirmButton: false,  
  timer: 2000,               
  timerProgressBar: true,
      }, theme);
      
      if (response.data.message === "Funds transferred successfully") {
        await fetchData();
        setShowConfirmModal(false);
        setRecipientAcctNumber("");
        setAmount("");
        setTransPin("");
        handleShowTransferForm();
      }
    } catch (error) {
       themedSwal({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.error || "Transaction failed.",
        
      }, theme);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex mt-[50px] justify-center font-roboto">
      <div className="bg-white dark:bg-darkGray shadow-md rounded-[12px] p-8 w-[400px]">
        <h2 className="text-center font-bold text-private">Transfer Funds</h2>

        <form onSubmit={handleSubmitValidation}>
          <div className="my-4">
            <label htmlFor="recipientId" className="text-sm text-black dark:text-white text-opacity-50">
              Recipient Account:
            </label>
            <input
              type="number"
              id="recipientId"
              value={recipientAccountNumber}
              onChange={(e) => setRecipientAcctNumber(e.target.value)}
              required
              className="border-[1px] w-full dark:text-white text-sm dark:bg-neutral-900 text-sm rounded-[8px] p-2 outline-none border-gray"
              placeholder="Account Number"
            />
          </div>

          <div>
            <label htmlFor="amount" className="text-sm dark:text-white  text-black text-opacity-50">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border-[1px] w-full dark:text-white text-sm dark:bg-neutral-900 rounded-[8px] p-2 outline-none border-gray"
              placeholder="Minimum of ₦50"                                                                                                                                                                                                                                   
            />
          </div>

          <button
            type="submit"
            disabled={validating} 
            className="w-full text-center bg-private mt-4 rounded-[8px] py-2 text-white flex justify-center items-center"
          >
            {validating ? (
              <span>
                Validating <i className="fas fa-spinner fa-spin ml-1"></i>
              </span>
            ) : (
              <span>Proceed</span>
            )}
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && recipientData && (
        <div className="modal modal-show font-roboto w-[350px]">
          <div className="bg-white dark:bg-neutral-900 p-4 shadow-lg rounded-[8px]">
            <div className="flex w-full">
              <h2 className="mb-2 text-sm text-black dark:text-white dark:text-opacity-70 text-opacity-30">
                Recipient Name:{" "}
                <span className="text-private font-bold uppercase">
                  {recipientData.firstname + " " + recipientData.lastname}
                </span>
              </h2>
              <span
                onClick={() => setShowConfirmModal(false)}
                className="ml-auto text-sm text-black dark:text-white  cursor-pointer"
              >
                <i className="fa fa-times"></i>
              </span>
            </div>

            <div>
              <label className="text-sm text-black dark:text-white dark:text-opacity-40 text-opacity-50 text-center">
                Transaction Pin
              </label>
              <input
                type="number"
                value={transPin}
                onChange={(e) => setTransPin(e.target.value)}
                className="border-[1px] w-full text-sm mt-1 dark:text-white   rounded-[8px] p-2 dark:bg-neutral-900 outline-none border-gray"
                placeholder="Your pin"
              />
            </div>

            <button
              onClick={handleTransfer}
              disabled={loading}
              className="w-full text-center bg-private mt-4 rounded-[8px] py-2 text-white"
            >
              {loading ? (
                <span>
                  Transferring <i className="fas fa-spinner fa-spin"></i>
                </span>
              ) : (
                <span>Confirm Transfer</span>
              )}
            </button>
          </div>
        </div>
      )}

      <div className={`${showConfirmModal ? "overlay" : ""}`} />
    </div>
  );
};

export default TransactionForm;
