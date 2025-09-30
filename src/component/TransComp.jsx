import React from 'react'
import Loader from './Loader'
export const TransComp = ({trans, transHis, userData, option}) => {
  return (
    <div>

         {transHis? (
          <div>
        
          {transHis && transHis.length === 0 ? (
            <div className="bg-white  py-4 rounded-[10px] ">
              <h2 className="font-bold text-sm text-center ">
                No transaction history found
              </h2>
            </div>

          ) : (
            trans &&
            trans.map((transaction) =>
              userData && userData._id === transaction.sender._id ? (
                <div className="text-sm bg-white p-[14px] mx-[20px] md:mx-[0px] rounded-[10px] my-[6px]">
                  <p>
                    <div className="flex w-full">
                      <h2 className="font-bold text-xs">Money Sent</h2>
                      <h2 className="ml-auto font-bold">
                        -₦{transaction.amount}.00
                      </h2>
                    </div>
                    <div className="flex">
                      <h2 className="text-black text-opacity-60 text-[13px]">
                        {" "}
                        {new Date(transaction.date).toLocaleString(
                          "en-US",
                          option
                        )}{" "}
                        {transaction.recipient.firstname}{" "}
                        {transaction.recipient.lastname}{" "}
                      </h2>
                      <h2 className="text-private ml-auto font-bold text-[13px]">
                        {transaction.status}
                      </h2>
                    </div>
                  </p>
                </div>
              ) : (
                <div className="text-sm bg-white p-[14px] mx-[20px] md:mx-[0px] rounded-[10px] my-[6px]">
                  <p>
                    <div className="flex w-full">
                      <h2 className="font-bold text-xs">Bank Deposit from {" "}
                        
                        {transaction.sender.firstname}{" "}
                        {transaction.sender.lastname}{" "} </h2>
                      <h2 className="ml-auto font-bold text-private">
                        +₦{transaction.amount}.00
                      </h2>
                    </div>
                    <div className="flex">
                      <h2 className="text-black text-opacity-60 text-[13px]">
                        {" "}
                        {new Date(transaction.date).toLocaleString(
                          "en-US",
                          option
                        )}{" "}
                      </h2>
                      <h2 className="text-private ml-auto font-bold text-[13px]">
                        {transaction.status}
                      </h2>
                    </div>
                  </p>
                </div>
              )
            )
          )}
      

       
        </div>
        ):(<>
          <Loader className="max-w-[600px]" />
     </>)}

    </div>
  )
}
