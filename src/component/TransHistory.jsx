import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { TransComp } from "./TransComp";
import Loader from "./Loader";
import Header from "./Header";

const TransHistory = () => {
  const { userData } = useAuth();
  const [groupedTrans, setGroupedTrans] = useState(null);

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
    if (userData?.transferHistory) {
      const transactions = [...userData.transferHistory].reverse();
      const grouped = transactions.reduce((groups, tx) => {
        const date = new Date(tx.date).toDateString();
        (groups[date] = groups[date] || []).push(tx);
        return groups;
      }, {});

      setGroupedTrans(grouped);
    }
  }, [userData]);

  

  const hasTransactions = userData?.transferHistory && userData?.transferHistory?.length > 0;

  return (
    <div className="flex justify-center font-roboto">
      <div className="w-full max-w-[560px]">
        <Header header="Transaction history" />

        {!hasTransactions ? (
          <div className="bg-white mx-[20px] py-4 rounded-[10px] text-center">
            <h2 className="font-bold text-sm">No transaction history found</h2>
          </div>
        ) : (
          Object.entries(groupedTrans || {}).map(([date, txs]) => (
            <div key={date}>
              <h3 className="font-semibold text-[12px] mt-[10px] md:pl-[20px] pl-[20px] dark:text-white text-black text-opacity-60">
                {date}
              </h3>
              {txs.map((tx, idx) => (
                <TransComp
                  key={idx}
                  trans={[tx]}
                  userData={userData}
                  option={option}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransHistory;
