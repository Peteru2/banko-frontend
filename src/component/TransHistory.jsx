import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { TransComp } from "./TransComp";
import Header from "./Header";

const TransHistory = () => {
  const { userData } = useAuth();
  const [transactions, setTransactions] = useState([]);

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
    if (!userData?.transferHistory) return;

    // Sort newest → oldest
    const sorted = [...userData.transferHistory].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setTransactions(sorted);
  }, [userData]);

  if (!transactions.length) {
    return (
      <div className="flex justify-center font-roboto">
        <div className="w-full max-w-[560px]">
          <Header header="Transaction history" />
          <div className="bg-white dark:bg-darkGray mt-[50px] text-neutral-800 dark:text-white mx-[20px] py-4 rounded-[10px] text-center">
            <h2 className="font-bold text-sm">No transaction history found</h2>
          </div>
        </div>
      </div>
    );
  }

  // Group transactions by day for display headers
  const groupedByDate = transactions.reduce((acc, tx) => {
    const day = new Date(tx.date).toDateString();
    if (!acc[day]) acc[day] = [];
    acc[day].push(tx);
    return acc;
  }, {});

  return (
    <div className="flex justify-center font-roboto">
      <div className="w-full max-w-[560px]">
        <Header header="Transaction history" />

        {Object.entries(groupedByDate).map(([date, txs]) => (
          <div key={date} className="mt-[50px]">
            <h3 className="font-semibold text-[12px] md:pl-[20px] pl-[20px] dark:text-white text-black text-opacity-60">
              {date}
            </h3>

            {txs.map((tx) => (
              <TransComp
                key={tx._id}
                trans={[tx]}   // still pass as array for TransComp
                userData={userData}
                option={option}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransHistory;
