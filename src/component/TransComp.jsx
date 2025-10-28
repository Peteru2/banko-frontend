import React from 'react'

export const TransComp = ({ trans, userData, option }) => {
  if (!trans || trans.length === 0) {
    return (
      <div className="bg-white py-4 rounded-[10px]">
        <h2 className="font-bold text-sm text-center">
          No transaction history found
        </h2>
      </div>
    )
  }

  return (
    <div>
      {trans.map((transaction) =>
        userData && userData._id === transaction.sender._id ? (
          <div
            key={transaction._id}
            className="text-sm bg-white dark:bg-darkGray p-[14px] mx-[20px] md:mx-0 rounded-[10px] my-[6px]"
          >
            
              <div className="flex items-center  w-full">
              <h2 className="font-normal text-xs truncate max-w-[220px] dark:text-white sm:max-w-none sm:whitespace-normal">
                Transfer to {transaction.recipient.firstname} {transaction.recipient.lastname}
              </h2>

              <h2 className="ml-auto font-bold dark:text-white">-₦{transaction.amount}.00</h2>
            </div>
            <div className="flex">
              <h2 className="text-black  text-opacity-60 dark:text-white dark:text-opacity-50 text-[11px]">
                {new Date(transaction.date).toLocaleString('en-US', option)}
              </h2>
              <h2 className="text-private ml-auto font-bold text-[11px]">
                {transaction.status}
              </h2>
            </div>
          </div>
        ) : (
          <div
            key={transaction._id}
            className="text-sm bg-white dark:bg-darkGray p-[14px] mx-[20px] md:mx-0 rounded-[10px] my-[6px]"
          >
           <div className="flex items-center  w-full">
              <h2 className="font-normal text-xs truncate max-w-[220px] dark:text-white sm:max-w-none sm:whitespace-normal">
                Transfer from {transaction.sender.firstname}{' '}
                {transaction.sender.lastname}
              </h2>
              <h2 className="ml-auto font-bold text-private">
                +₦{transaction.amount}.00
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
        )
      )}
    </div>
  )
}
