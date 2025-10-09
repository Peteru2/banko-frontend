import React, { useState } from "react";
import api from "../services/api.jsx";
import Swal from "sweetalert2";
import { useAuth } from "./AuthContext.jsx";

const TransactionForm = ({ handleShowTransferForm }) => {
  const { fetchData } = useAuth(); 
  const [recipientAccountNumber, setRecipientAcctNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transPin, setTransPin] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recipientData, setRecipientData] = useState(null);
  const [loading, setLoading] = useState(false); // For final transfer
  const [validating, setValidating] = useState(false); // 👈 For validation step

  const handleSubmitValidation = async (e) => {
    e.preventDefault();
    setValidating(true); 
    try {
      const response = await api.post("/val_transfer", {
        recipientAccountNumber,
        amount,
      });

      if (response.data.message === "success") {
        setRecipientData(response.data.user);
        setShowConfirmModal(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.error || "Something went wrong!",
      });
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

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
      });

      if (response.data.message === "Funds transferred successfully") {
        await fetchData();
        setShowConfirmModal(false);
        setRecipientAcctNumber("");
        setAmount("");
        setTransPin("");
        handleShowTransferForm();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.error || "Transaction failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex mt-[50px] justify-center font-roboto">
      <div className="bg-white shadow-md rounded-[12px] p-8 w-[400px]">
        <h2 className="text-center font-bold text-private">Transfer Funds</h2>

        <form onSubmit={handleSubmitValidation}>
          <div className="my-4">
            <label htmlFor="recipientId" className="text-sm text-black text-opacity-50">
              Recipient Account:
            </label>
            <input
              type="number"
              id="recipientId"
              value={recipientAccountNumber}
              onChange={(e) => setRecipientAcctNumber(e.target.value)}
              required
              className="border-[1px] w-full text-sm rounded-[8px] p-2 outline-none border-gray"
              placeholder="Account Number"
            />
          </div>

          <div>
            <label htmlFor="amount" className="text-sm text-black text-opacity-50">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border-[1px] w-full text-sm rounded-[8px] p-2 outline-none border-gray"
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
          <div className="bg-white p-4 shadow-lg rounded-[8px]">
            <div className="flex w-full">
              <h2 className="mb-2 text-sm text-black text-opacity-30">
                Recipient Name:{" "}
                <span className="text-private font-bold uppercase">
                  {recipientData.firstname + " " + recipientData.lastname}
                </span>
              </h2>
              <span
                onClick={() => setShowConfirmModal(false)}
                className="ml-auto text-sm cursor-pointer"
              >
                <i className="fa fa-times"></i>
              </span>
            </div>

            <div>
              <label className="text-sm text-black text-opacity-50 text-center">
                Transaction Pin
              </label>
              <input
                type="number"
                value={transPin}
                onChange={(e) => setTransPin(e.target.value)}
                className="border-[1px] w-full text-sm mt-1 rounded-[8px] p-2 outline-none border-gray"
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
