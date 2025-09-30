import { useEffect, useState } from "react";
import api from "../services/api.jsx";
import { useAuth } from "./AuthContext.jsx";


const Notification = () => {
  const {userData} = useAuth()
  const [transHis, setTransHis] = useState(null);
  // const [userData, setUserData] = useState("");

  const option = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", // Adjust the time zone as needed
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userResponse = await api.get("/");
        const response = await api.get("/trans-history");

        setTransHis(response.data.transferHistory);
        // setUserData(userResponse.data.user);
      } catch (error) {
        if (error.response.data.error == "No history found") {
          setTransHis([]);
          console.log(transHis);
        }
      }
    };

    fetchData();
  }, []);
  const trans = transHis && transHis.slice().reverse();

  return (
    <>
      <div className="flex justify-center font-roboto">
        <div className="shadow-md justify-center w-[400px] px-4">
          <h2 className="text-private my-4 font-bold text-[19px]">NOTICE</h2>

          {transHis && transHis.length === 0 ? (
            <div>
              <h2 className="font-bold text-sm text-center ">
                No Notification Available
              </h2>
            </div>
          ) : (
            trans &&
            trans.map((transaction) =>
              userData && userData._id !== transaction.sender._id ? (
                <div className="text-sm my-3">
                  <h2 className="text-xs text-black text-opacity-40 text-center my-2">
                    {new Date(transaction.date).toLocaleString("en-US", option)}
                  </h2>
                  <p>
                    <h2 className="font-bold text-xs">
                      Account successfully Credited
                    </h2>

                    <div className="flex items-center">
                      <h2 className="text-black text-opacity-60 text-[13px]">
                        {" "}
                        Banko user{" "}
                        <span className="uppercase">
                          {" "}
                          '{transaction.sender.firstname}{" "}
                          {transaction.sender.lastname}(
                          {transaction.sender.accountNumber})'
                        </span>{" "}
                        has successfully sent you ₦
                        {transaction.amount.toLocaleString()}.00
                      </h2>
                      <h2 className="text-private ml-auto  text-[13px] bg-private bg-opacity-10 px-2 rounded-md">
                        view
                      </h2>
                    </div>
                  </p>
                </div>
              ) : null
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
