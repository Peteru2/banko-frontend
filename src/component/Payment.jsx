import React from "react";
import TopUp from "../assets/image/top-up.svg";
import MobilePayment from "../assets/image/mobile-payment.svg";
import MakeAPayment from "../assets/image/make-a-payment.svg";
import MoneyTranser from "../assets/image/money-transfer.svg";
import { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm.jsx";

const Payment = () => {
  const [showTransferForm, setShowTransferForm] = useState(false);

  const handleShowTransferForm = () => {
    setShowTransferForm((trans) => !trans);
  };
  const paymentList = [
    {
      title1: "Money",
      title2: "Transfer",
      url: "/",
      img: MoneyTranser,
      func: handleShowTransferForm,
    },
    {
      title1: "Top Up",
      title2: "Payment",
      url: "/",
      img: TopUp,
      func:""
    },

    {
      title1: "Buy",
      title2: "Airtime",
      url: "/",
      img: MakeAPayment,
      func:""

    },
    {
      title1: "Mobile",
      title2: "Payment",
      url: "/",
      img: MobilePayment,
      func:""

    },
    
  ];
  return (
    <>
     
         <div className="w-full justify-center flex font-roboto">
      <div className="flex w-full max-w-[560px] gap-4 md:gap-8 justify-center   py-[15px] md:px-[13px]">
        {paymentList.map((item, index) => { 
          return (
            <>
            <div key={index} className=" ">
              <div
                className={`${item.func===""?"":"cursor-pointer"} "flex   justify-center"`}
                onClick={item.func}
              >
                <div className="flex flex-col items-center">
                  <div className="">
                    <img
                      src={item.img}
                      alt="profileImage"
                      className="text-black dark:text-white  w-[60px] h-[60px]  rounded-full"
                    />
                  </div>
                  <div className="text-center dark:text-white  text-[13px]">
                    <p>{item.title1}</p>
                    <p>{item.title2}</p>
                  </div>
                </div>
              </div>
              <div
                className={`genModal font-roboto ${showTransferForm ? "border border-white modal-show w-full" : ""}`}
              >
                <h2
                  onClick={handleShowTransferForm}
                  className="absolute top-4 cursor-pointer"
                >
                  <i className="fa fa-arrow-left dark:text-white text-black text-opacity-70 "> </i>
                </h2>
                <TransactionForm handleShowTransferForm = {()=>setShowTransferForm((trans) => !trans)}/>
              </div>
              </div>
            </>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default Payment;
