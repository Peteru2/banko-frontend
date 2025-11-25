export const TransComp = ({ trans, userData, option }) => {
  if (!trans || trans.length === 0) {
    return (
      <div className="bg-white py-4 rounded-[10px] dark:bg-darkGray">
        <h2 className="font-bold text-sm text-black dark:text-white text-center">
          No transaction history found
        </h2>
      </div>
    );
  }


  const sorted = [...trans].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      {sorted.map((transaction) => {

        // ========== CHECK IF AIRTIME ==========
        if (transaction.isAirtime) {
          return (
            <div
              key={transaction._id}
              className="text-sm bg-white dark:bg-darkGray p-[14px] mx-[20px] md:mx-0 rounded-[10px] my-[6px]"
            >
              <div className="flex items-center w-full">
                <h2 className="font-normal text-xs dark:text-white truncate max-w-[220px] sm:max-w-none">
                  Airtime Purchase ({transaction.network}) to {transaction.phoneNumber}
                </h2>

                <h2
                  className={`${
                    transaction.status === 'failed'
                      ? 'text-red dark:text-opacity-100 text-opacity-60'
                      : 'text-private'
                  } ml-auto text-[11px]`}
                >
                  -₦{transaction.amount}.00
                </h2>
              </div>

              <div className="flex">
                <h2 className="text-black dark:text-white dark:text-opacity-50 text-opacity-60 text-[11px]">
                  {new Date(transaction.date).toLocaleString('en-US', option)}
                </h2>
                <h2
                  className={`${
                    transaction.status === 'failed'
                      ? 'text-red dark:text-opacity-100 text-opacity-60'
                      : 'text-private'
                  } ml-auto text-[11px]`}
                >
                  {transaction.status}
                </h2>
              </div>
            </div>
          );
        }

        // ========= NORMAL TRANSFERS =========
        const isSender =
          userData && userData._id === transaction.sender?._id;

        return (
          <div
            key={transaction._id}
            className="text-sm bg-white dark:bg-darkGray p-[14px] mx-[20px] md:mx-0 rounded-[10px] my-[6px]"
          >
            <div className="flex items-center w-full">
              {isSender ? (
                <h2 className="font-normal text-xs dark:text-white truncate max-w-[220px] sm:max-w-none">
                  Transfer to {transaction.recipient.firstname}{' '}
                  {transaction.recipient.lastname}
                </h2>
              ) : (
                <h2 className="font-normal text-xs dark:text-white truncate max-w-[220px] sm:max-w-none">
                  Transfer from {transaction.sender.firstname}{' '}
                  {transaction.sender.lastname}
                </h2>
              )}

              <h2
                className={`ml-auto text-[11px] ${
                  isSender
                    ? 'text-black dark:text-white dark:text-opacity-50 text-opacity-60'
                    : 'text-private'
                }`}
              >
                {isSender ? '-' : '+'}₦{transaction.amount}.00
              </h2>
            </div>

            <div className="flex">
              <h2 className="text-black dark:text-white dark:text-opacity-50 text-opacity-60 text-[11px]">
                {new Date(transaction.date).toLocaleString('en-US', option)}
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
