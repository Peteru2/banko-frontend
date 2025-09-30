import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import { TransComp } from "./TransComp";
import Loader from "./Loader";

const TransHistory = () => {
  const [transHis, setTransHis] = useState(null);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
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
        const userResponse = await api.get("/");
        const response = await api.get("/trans-history");
        setTransHis(response.data.transferHistory || []);
        setUserData(userResponse.data.user);
        console.log(transHis)

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

  const groupByDate = (transactions) => {
    if (!Array.isArray(transactions)) return {};
    return transactions.reduce((groups, tx) => {
      const date = new Date(tx.date).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(tx);
      return groups;
    }, {});
  };
  const groupedTrans = groupByDate(trans);
  return (
    <>
      <div className="flex justify-center font-roboto">
        <div className="justify-center  w-full max-w-[560px] ">
          <div className=" flex text my-2 text-black text-opacity-60  items-center h-[48px] text-[18px]">
            <h2 className="cursor-pointer md:px-[10px] pl-[20px] pr-[0px]" onClick={() => navigate(-1)}>
              <i className="fa fa-arrow-left"> </i>
            </h2>
            <h2 className="  w-full text-center text-black text-opacity-70">
              Transaction history
            </h2>
          </div>
          {transHis ? (
            <>
            {transHis.length === 0? (<>
             <div className="bg-white mx-[20px] py-4 rounded-[10px]">
              <h2 className="font-bold text-sm text-center ">
                No transaction history found
              </h2>
            </div>
            </>
            ):(
              <>
            {Object.entries(groupedTrans).map(([date, txs]) => (
                <div key={date} className>
                  <h3 className="font-semibold text-[12px] mt-[10px]  md:pl-[0px] pl-[20px] text-black text-opacity-60">
                    {date}
                  </h3>
                  {txs.map((tx, idx) => (
                    <TransComp
                      key={idx}
                      transHis={transHis}
                      trans={[tx]}
                      userData={userData}
                      option={option}
                    />
                  ))}
                </div>
              ))}</>)}
              
            </>
          ) : (
            <>
              <Loader />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TransHistory;
