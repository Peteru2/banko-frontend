import React, { useState } from "react";
import TransactionForm from "./TransactionForm.jsx";
import {
  Send,
  CreditCard,
  Smartphone,
  University,
} from "lucide-react";

const Payment = () => {
const [showTransferForm, setShowTransferForm] = useState(false);
const [activeForm, setActiveForm] = useState(null);


  const handleShowTransferForm = () => {
    setShowTransferForm((trans) => !trans);
  };
  

  const forms ={
    transfer:TransactionForm,
  }
const FormComponent = activeForm ? forms[activeForm] : null;
  const paymentList = [
    {
      title1: "Money",
      title2: "Transfer",
      icon: Send,
     key: "transfer",
    },
    {
      title1: "Top Up",
      title2: "Payment",
      icon: CreditCard,
      key:"topup",
    },
    {
      title1: "Buy",
      title2: "Airtime",
      icon: Smartphone,
      key: "airtime",
    },
    {
      title1: "Mobile",
      title2: "Payment",
      icon: University,
      key: "billpay",
    },
  ];

  return (
    <>
      <div className="w-full justify-center flex font-roboto">
        <div className="flex w-full max-w-[560px] gap-4 md:gap-8 justify-center py-[15px] md:px-[13px]">
          {paymentList.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index}>
                <div
                  className={`cursor-pointer flex justify-center`}
                  onClick={()=>setActiveForm(item.key)}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-white dark:bg-neutral-800">
                      <Icon className="w-7 h-7 text-black dark:text-white" />
                    </div>

                    <div className="text-center dark:text-white text-[13px] mt-1">
                      <p>{item.title1}</p>
                      <p>{item.title2}</p>
                    </div>
                  </div>
                </div>

                {/* Transfer Modal */}
               
              
                    <div className={`genModal font-roboto ${activeForm ? "border border-white modal-show w-full" : ""}`}>
                      <h2 className="absolute top-4 cursor-pointer" onClick={() => setActiveForm(null)}>
                        <i className="fa fa-arrow-left dark:text-white text-black text-opacity-70"></i>
                      </h2>
                      {FormComponent&&(
                      <FormComponent close={() => setActiveForm(null)} />

                      )}
                    </div>
                 
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Payment;
