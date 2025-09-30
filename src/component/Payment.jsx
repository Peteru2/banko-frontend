import React from "react";
import TopUp from "../assets/image/top-up.svg";
import MobilePayment from "../assets/image/mobile-payment.svg";
import MakeAPayment from "../assets/image/make-a-payment.svg";
import MoneyTranser from "../assets/image/money-transfer.svg";
import { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm.jsx";

const Payment = () => {
  const [transfer, setTransfer] = useState(false);

  const handleTransfer = () => {
    setTransfer((trans) => !trans);
  };
  const paymentList = [
    {
      title1: "Money",
      title2: "Transfer",
      url: "/",
      img: MoneyTranser,
      func: handleTransfer,
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
      <div className="flex  gap-4 md:gap-8 w-full   justify-center my-[15px] md:px-[13px]">
        {paymentList.map((item, index) => {
          return (
            <>
            <div className=" max-w-[600px]">
              <div
                className={`${item.func===""?"":"cursor-pointer"} "flex   justify-center"`}
                onClick={item.func}
              >
                <div className="flex flex-col items-center">
                  <div className="">
                    <img
                      src={item.img}
                      alt="profileImage"
                      className="text-black  w-[60px] h-[60px]  rounded-full"
                    />
                  </div>
                  <div className="text-center text-[13px]">
                    <p>{item.title1}</p>
                    <p>{item.title2}</p>
                  </div>
                </div>
              </div>
              <div
                className={`genModal font-roboto ${transfer ? "modal-show w-full" : ""}`}
              >
                <h2
                  onClick={handleTransfer}
                  className="absolute top-0 cursor-pointer"
                >
                  <i className="fa fa-arrow-left"> </i>
                </h2>
                <TransactionForm />
              </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Payment;
