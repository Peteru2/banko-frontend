import api from "../services/api.jsx";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext"
import themedSwal from "../utils/themedSwal"

const UpdatePhoneNumber = ({setShowUpdatePhoneNumber}) => {
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const {theme} = useTheme()
const {fetchData} = useAuth()
  const phoneRegex = /^\d{11}$/;

  const handleUpdatePhoneNumber = async (e) => {
    e.preventDefault();
    console.log("clicked")
    setLoading(true);

    if (!updatePhoneNumber.trim()) {
themedSwal({
  icon: "error",
        title: "Oops...",
        text: "Phone number cannot be empty",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
}, theme)
      
      setLoading(false);
      return; 
    }

    if (!phoneRegex.test(updatePhoneNumber) || updatePhoneNumber.length !== 11) {
      themedSwal({
icon: "error",
        title: "Oops...",
        text: "Invalid Phone Number",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }, theme)
      
      setLoading(false);
      return; 
    }

    try {
      const response = await api.put("/updatePhoneNumber", { updatePhoneNumber });
        themedSwal({
          icon: "success",
        title: "Success!",
        text: "Phone number updated successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        },theme)
      
      if(response.status= 200){
      setShowUpdatePhoneNumber(false)
      fetchData()
      }
    } catch (error) {
  
      themedSwal({
          icon: "error",
        title: "Oops...",
        text: error.response?.data?.error,
        showConfirmButton: false,
        timer: 2000,
      }, theme)
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdatePhoneNumber}>
        <div className="my-4">
          <input
            type="number"
            id="phoneNumberId"
            value={updatePhoneNumber}
            onChange={(e) => setUpdatePhoneNumber(e.target.value)}
            required
            className="border-[1px] w-full dark:text-white  text-sm rounded-[8px] dark:bg-neutral-900 p-2 outline-none border-gray"
            placeholder="Phone Number"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-center bg-private mt-4 rounded-[8px] py-2 text-white flex justify-center items-center"
        >
          {loading ? (
            <h2>
              Updating <i className="fas fa-spinner fa-spin"></i>
            </h2>
          ) : (
            <h2>Update</h2>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdatePhoneNumber;
