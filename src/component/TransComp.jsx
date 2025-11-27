export const TransComp = ({ trans, userData, option }) => {
  // Ensure we always have an array
  const sorted = Array.isArray(trans) ? [...trans] : [];

  // Sort newest first just in case backend didn't
  sorted.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sorted.length === 0) {
    return (
      <div className="bg-white py-4 rounded-[10px] dark:bg-darkGray">
        <h2 className="font-bold text-sm text-black dark:text-white text-center">
          No transaction history found
        </h2>
      </div>
    );
  }

  return (
    <div>
      {sorted.map((transaction) => {
        const isSender =
          userData && userData._id === transaction.sender?._id;

        // Common class names
        const statusClass =
          transaction.status?.toLowerCase() === "failed"
            ? "text-red dark:text-opacity-100 text-opacity-60"
            : "text-private";

        // ---- AIRTIME ----
        if (transaction.isAirtime) {
          return (
            <div
              key={transaction._id || Math.random()}
              className="text-sm bg-white dark:bg-darkGray p-[14px] mx-[20px] md:mx-0 rounded-[10px] my-[6px]"
            >
              <div className="flex items-center w-full">
                <h2 className="font-normal text-xs dark:text-white truncate max-w-[220px] sm:max-w-none">
                  Airtime Purchase ({transaction.network}) to {transaction.phone}
                </h2>

                <h2 className={`${statusClass} ml-auto text-[11px]`}>
                  -₦{transaction.amount}.00
                </h2>
              </div>

              <div className="flex">
                <h2 className="text-black dark:text-white dark:text-opacity-50 text-opacity-60 text-[11px]">
                  {new Date(transaction.date).toLocaleString("en-US", option)}
                </h2>
                <h2 className={`${statusClass} ml-auto text-[11px]`}>
                  {transaction.status}
                </h2>
              </div>
            </div>
          );
        }

        // ---- NORMAL TRANSFER ----
        const recipientName = transaction.recipient
          ? `${transaction.recipient.firstname} ${transaction.recipient.lastname}`
          : "Unknown";
        const senderName = transaction.sender
          ? `${transaction.sender.firstname} ${transaction.sender.lastname}`
          : "Unknown";

        return (
          <div
            key={transaction._id || Math.random()}
            className="text-sm bg-white dark:bg-darkGray p-[14px] mx-[20px] md:mx-0 rounded-[10px] my-[6px]"
          >
            <div className="flex items-center w-full">
              <h2 className="font-normal text-xs dark:text-white truncate max-w-[220px] sm:max-w-none">
                {isSender ? `Transfer to ${recipientName}` : `Transfer from ${senderName}`}
              </h2>

              <h2
                className={`ml-auto text-[11px] ${
                  isSender
                    ? "text-black dark:text-white dark:text-opacity-50"
                    : "text-private"
                }`}
              >
                {isSender ? "-" : "+"}₦{transaction.amount}.00
              </h2>
            </div>

            <div className="flex">
              <h2 className="text-black dark:text-white dark:text-opacity-50 text-opacity-60 text-[11px]">
                {new Date(transaction.date).toLocaleString("en-US", option)}
              </h2>
              <h2 className="text-private ml-auto font-bold text-[11px]">
                {transaction.status}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};
