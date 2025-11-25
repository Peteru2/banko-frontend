import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import themedSwal from "../utils/themedSwal";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../auth/AuthContext";

import { Signal, Wifi, Smartphone, Radio } from "lucide-react";

const networks = [
  { label: "MTN", value: "mtn", icon: Signal },
  { label: "GLO", value: "glo", icon: Radio },
  { label: "Airtel", value: "airtel", icon: Smartphone },
  { label: "9mobile", value: "etisalat", icon: Wifi },
];

const AirtimePaymentForm = ({ close }) => {
  const { userData, fetchData } = useAuth();
  const { theme } = useTheme();

  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState(networks[0].value);
  const [loading, setLoading] = useState(false);

  const selectedIcon = networks.find((n) => n.value === network)?.icon;

  // Auto-format amount input (e.g. 1000 -> 1,000)
  const formatAmount = (input) => {
    const raw = input.replace(/[^\d]/g, "");
    return raw ? Number(raw).toLocaleString() : "";
  };

  const handleAmountChange = (e) => {
    setAmount(formatAmount(e.target.value));
  };

  const handleSubmit = async () => {
    const sandBoxNum = "08011111111"
    const amt = Number(amount.replace(/,/g, ""));
    const phoneRegex = /^(\+?\d{1,4})?\d{10,14}$/;

    if (!phone || !amt) {
      return themedSwal({ icon: "error", title: "Missing Fields", text: "Phone & amount required." }, theme);
    }
if (!phoneRegex.test(phone)){
       return themedSwal({ icon: "error", title: "Invalid Phone Number", text: "Phone number not valid." }, theme);
}
    if (amt > userData.balance) {
      return themedSwal({ icon: "error", title: "Low Balance", text: "Insufficient account balance." }, theme);
    }
   
    if (phone != sandBoxNum) {
      return themedSwal({ icon: "error", title: "Incorrect Phone Number", text: "Error purchasing Airtime, this is a sandbox account you can only purchase using this number: 08011111111" }, theme);
    }

    setLoading(true);
    try {
      const { data } = await api.post("/transactions/airtime", { phone, amount: amt, network });

      if (data.success) {
        themedSwal({ icon: "success", title: "Success", text: data.message }, theme);
        fetchData();
        close();
      } else {
        themedSwal({ icon: "error", title: "Failed", text: data.message }, theme);
      }
    } catch (err) {
      themedSwal({ icon: "error", text: err?.response?.data?.message || "Something went wrong" }, theme);
    } finally {
      setLoading(false);
    }
  };

  return (
  
      <div
        
        className="fixed top-16 left-0 right-0 max-w-[560px] mx-auto bg-white dark:bg-darkGray rounded-t-2xl p-5 shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold dark:text-white">Buy Airtime</h2>
          <button onClick={close} className="text-gray-400 hover:text-black dark:hover:text-white">✕</button>
        </div>

        <label className="text-sm dark:text-white">Network</label>
        <div className="relative w-full mb-4">
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full p-2 pr-10 border rounded dark:bg-neutral-900 dark:text-white"
          >
            {networks.map((n) => (
              <option key={n.value} value={n.value}>{n.label}</option>
            ))}
          </select>

          {/* Show network icon */}
          {selectedIcon && (
            <selectedIcon className="absolute right-3 top-2.5 w-5 h-5 text-primary" />
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
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-private  text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Processing..." : "Buy Airtime"}
        </button>
      </div>
    
  );
};

export default AirtimePaymentForm;
