import { useEffect, useState } from "react";
import api from "../services/api.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

import Header from "./Header.jsx";

const Notification = () => {
  const {userData} = useAuth()
  const [transHis, setTransHis] = useState(null);

  const option = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await api.get("/transactionHistory");

        setTransHis(response.data.transferHistory);
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
     <div className="flex justify-center  font-roboto">
      <div className="w-full max-w-[560px] ">
                 <Header header="Notification" />
         
          {transHis && transHis.length === 0 ? (
            <div>
              <h2 className="font-bold bg-white rounded-[10px] mx-[20px] md:mx-0 text-sm text-center p-[12px] ">
                No Notification Available
              </h2>
            </div>
          ) : (
            trans &&
            trans.map((transaction) =>
              userData && userData._id !== transaction.sender._id ? (
                <div className="text-sm my-3 bg-white mx-[20px] md:mx-0 p-[12px]">
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
