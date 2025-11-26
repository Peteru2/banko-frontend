import React, { useState } from "react";
import api from "../services/api.jsx";
import { useAuth } from "../auth/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import themedSwal from "../utils/themedSwal";
import TransPinForm from "./TransPinForm.jsx";

const TransactionForm = () => {
  const { fetchData } = useAuth();
  const { theme } = useTheme();

  const [recipientAccountNumber, setRecipientAcctNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientData, setRecipientData] = useState(null);

  const [showPinInput, setShowPinInput] = useState(false);
  const [validating, setValidating] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatAmount = (value) => {
  const raw = value.replace(/[^\d]/g, "");  
  return raw ? Number(raw).toLocaleString() : "";
};
  const handleShowInput = () => {
    setShowPinInput(!showPinInput);
    setLoading(false);
    setValidating(false);
  };

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
        setShowPinInput(true);
      }
    } catch (error) {
      themedSwal(
        {
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.error || "Something went wrong!",
        },
        theme
      );
    } finally {
      setValidating(false);
    }
  };

  const handleTransfer = async (pin) => {
    setLoading(true);

    try {
      const response = await api.post("/transfer", {
        recipientAccountNumber,
        amount,
        transPin: pin,
      });

      themedSwal(
        {
          icon: "success",
          title: "Success!",
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        },
        theme
      );

      if (response.data.success === true) {
        await fetchData();
        setShowPinInput(false);
        setRecipientAcctNumber("");
        setAmount("");
      }
    } catch (error) {
      themedSwal(
        {
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.error || "Transaction failed.",
        },
        theme
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex mt-[50px] justify-center font-roboto">
      <div className="bg-white dark:bg-darkGray shadow-md rounded-[12px] p-8 w-[400px]">
        <h2 className="font-semibold text-private">Transfer Funds</h2>

        <form onSubmit={handleSubmitValidation}>
          <div className="my-4">
            <label className="text-sm text-black dark:text-white text-opacity-50">
              Recipient Account:
            </label>
            <input
              type="number"
              value={recipientAccountNumber}
              onChange={(e) => setRecipientAcctNumber(e.target.value)}
              required
              className="border-[1px] w-full dark:text-white text-sm dark:bg-neutral-900 rounded-[8px] p-2 outline-none border-gray"
              placeholder="Account Number"
            />
          </div>

          <div>
            <label className="text-sm dark:text-white text-opacity-50">
              Amount:
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(formatAmount(e.target.value))}
              required
              className="border-[1px] w-full dark:text-white text-sm dark:bg-neutral-900 rounded-[8px] p-2 outline-none border-gray"
              placeholder="Minimum of ₦50"
            />
          </div>

          <button
            type="submit"
            disabled={validating}
            className="w-full bg-private mt-4 rounded-[8px] py-2 text-white"
          >
            {validating ? (
              <span>
                Validating <i className="fas fa-spinner fa-spin ml-1"></i>
              </span>
            ) : (
              "Proceed"
            )}
          </button>
        </form>
      </div>

      {/* PIN Modal (same structure as AirtimePurchase) */}
      {showPinInput && (
        <>
          <div className="overlay"></div>

          <form className="modal w-[400px] modal-show font-roboto">
            <div className="bg-white dark:bg-neutral-800 dark:text-white text-neutral-800 p-8 rounded-[6px]">
              <div className="flex items-center mb-3">
                <h2 className="text-[14px] font-semibold text-private flex-1 text-center">Confirm Transfer</h2>
                <button
                  onClick={handleShowInput}
                  aria-label="Close modal"
                  className="ml-auto absolute   right-[30px] top-[30px]  hover:text-gray-700"
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>

              <p className="text-xs mb-4 text-center text-primary">
                Sending ₦{amount.toLocaleString()} to{" "}
                <strong className="uppercase">
                  {recipientData?.firstname + " " + recipientData?.lastname}
                </strong>
              </p>

              <TransPinForm
                onSubmit={handleTransfer}
                buttonText="Confirm Transfer"
                loadingText="Transferring..."
                loading={loading}
                setLoading={(val) => setLoading(val)}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default TransactionForm;
