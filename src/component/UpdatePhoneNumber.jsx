import api from "../services/api.jsx";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthContext.jsx";

const UpdatePhoneNumber = ({setShowUpdatePhoneNumber}) => {
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
// const {fetchData} = useAuth()
  const phoneRegex = /^\d{11}$/;

  const handleUpdatePhoneNumber = async (e) => {
    e.preventDefault();
    console.log("clicked")
    setLoading(true);

    if (!updatePhoneNumber.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Phone number cannot be empty",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      setLoading(false);
      return; 
    }

    if (!phoneRegex.test(updatePhoneNumber) || updatePhoneNumber.length !== 11) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Phone Number",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      setLoading(false);
      return; 
    }

    try {
      const response = await api.put("/updatePhoneNumber", { updatePhoneNumber });
      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Phone number updated successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      // fetchData()
      if(response.status= 200){
      setShowUpdatePhoneNumber(false)
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.error,
        showConfirmButton: false,
        timer: 2000,
      });
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
            className="border-[1px] w-full text-sm rounded-[8px] p-2 outline-none border-gray"
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
