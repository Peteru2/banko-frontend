import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import themedSwal from "../utils/themedSwal";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../auth/AuthContext";
import TransPinForm from "./TransPinForm.jsx";
import mtnLogo from "../assets/image/mtnLogo.png"
import airtelLogo from "../assets/image/airtelLogo.jpeg"
import gloLogo from "../assets/image/gloLogo.jpeg"
import mobileLogo from "../assets/image/mobileLogo.jpeg"


import { Signal, Wifi, Smartphone, Radio } from "lucide-react";

const networks = [
  { label: "MTN", value: "mtn", img: mtnLogo },
  { label: "GLO", value: "glo", img: gloLogo },
  { label: "Airtel", value: "airtel", img: airtelLogo },
  { label: "9mobile", value: "etisalat", img: mobileLogo },
];

const AirtimePaymentForm = ({ close }) => {
  const { userData, fetchData } = useAuth();
  const { theme } = useTheme();

  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState(networks[0].value);
  const [showPinInput, setShowPinInput] = useState(false);
  const [loading, setLoading] = useState({ verify: false, purchase: false });

  const selectedNetwork = networks.find((n) => n.value === network);

  const formatAmount = (input) => {
    const raw = input.replace(/[^\d]/g, "");
    return raw ? Number(raw).toLocaleString() : "";
  };

  const handleAmountChange = (e) => setAmount(formatAmount(e.target.value));

  const validateForm = () => {
    const amt = Number(amount.replace(/,/g, ""));
    const phoneRegex = /^(\+?\d{1,4})?\d{10,14}$/;
    const sandboxNum = "08011111111";

    if (!phone || !amt) return { valid: false, msg: "Phone & amount required." };
    if (!phoneRegex.test(phone)) return { valid: false, msg: "Phone number not valid." };
    if (amt > userData.balance) return { valid: false, msg: "Insufficient account balance." };
    // if (phone !== sandboxNum) return {
    //   valid: false,
    //   msg: `Sandbox account only. Use: ${sandboxNum}`
    // };

    return { valid: true, amt };
  };

  const callApi = async (endpoint, payload) => {
    try {
      const { data } = await api.post(endpoint, payload);
      return data;
    } catch (err) {
      return { success: false, message: err?.response?.data?.message || "Something went wrong" };
    }
  };

  const handleShowInput = () =>{
    setShowPinInput(!showPinInput)
    setLoading({ ...loading, purchase: false, verify: false });
  } 
  const handleAirtimeVerify = async () => {
    const validation = validateForm();
    if (!validation.valid) return themedSwal({ icon: "error", title: "Error", text: validation.msg }, theme);

    setLoading({ ...loading, verify: true });

    const data = await callApi("/transactions/airtimeVerify", {
      phone,
      amount: validation.amt,
      network
    });

    if (data.success) {
      setShowPinInput(true);
    } else {
      themedSwal({ icon: "error", title: "Failed", text: data.message }, theme);
      setShowPinInput(false);
    }

    setLoading({ ...loading, verify: false });
  };

  const handleAirtimePurchase = async (pin) => {
    const amt = Number(amount.replace(/,/g, ""));
    console.log(pin.lenght+"lenght")
    console.log("Pin")
    if (pin.lenght != 0){
    // setLoading({ ...loading, purchase: true });
    }
    const data = await callApi("/transactions/airtimePurchase", { phone, amount: amt, network, pin });

    if (data.success) {
      themedSwal({ icon: "success", title: "Success", text: data.message }, theme);
      fetchData();
      setShowPinInput(false);
      close();
    } else {
      themedSwal({ icon: "error", title: "Failed", text: data.message }, theme);
      setLoading({ ...loading, verify: true });

    }

    setLoading({ ...loading, purchase: false });
    setLoading({ ...loading, verify: false });

  };

  return (
    <div  className="w-full flex mt-[50px] justify-center font-roboto">
    <div className="bg-white dark:bg-darkGray shadow-md rounded-[12px] p-8 w-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-private ">Buy Airtime</h2>
      </div>

      <label className="text-sm dark:text-white">Network</label>
      <div className="relative w-full mb-4">
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full p-2 pr-10 border rounded dark:bg-neutral-900 dark:text-white"
        >
          {networks.map((n) => (
            <>
            <option key={n.value} value={n.value}>{n.label}</option>
            </>
          ))}
        </select>
        {selectedNetwork && (
            <img
              src={selectedNetwork.img}
              alt={selectedNetwork.label}
              className="absolute right-[20px] top-2.5 w-5 h-5 rounded-sm object-cover"
            />
          )}

      </div>

      <label className="text-sm dark:text-white">Phone Number</label>
      <input
        type="tel"
        placeholder="08012345678"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border rounded mt-1 mb-4 dark:bg-neutral-900 dark:text-white"
      />

      <label className="text-sm dark:text-white">Amount (₦)</label>
      <input
        type="text"
        placeholder="1,000"
        value={amount}
        onChange={handleAmountChange}
        className="w-full p-2 border rounded mt-1 mb-4 dark:bg-neutral-900 dark:text-white"
      />

      <button
        onClick={handleAirtimeVerify}
        disabled={loading.verify || showPinInput}
        className="w-full bg-private text-white py-2 rounded disabled:opacity-60"
      >
        {loading.verify ? "Processing..." : "Buy Airtime"}
      </button>

            
{showPinInput && (
            <div className="overlay"></div>
)}
    
      {showPinInput && (
          <form className="modal w-[400px] font-roboto modal-show">
            <div className="bg-white dark:bg-neutral-800 dark:text-white  text-neutral-800 p-4 rounded-[6px]">
              <div className="flex items-center mb-3">
                <h2 className="text-14px  font-semibold text-private flex-1 text-center">Transaction Pin</h2>
                <button
                  onClick={() => handleShowInput()}
                  aria-label="Close modal"
                   className="ml-auto absolute right-[30px] top-[30px] hover:text-gray-700"
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
             

 <TransPinForm
                onSubmit={handleAirtimePurchase}
                buttonText="Proceed to pay"
                loadingText="Purchasing..."
                loading={loading.purchase}
                setLoading={(val) => setLoading({ ...loading, purchase: val })}
              />
             
            </div>
          </form>
        )}
  </div>
    </div>
  );
};

export default AirtimePaymentForm;
