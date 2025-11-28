import React from 'react'

    const Cards = () => {
        const cardInfo =[
            {bankName: "UBA",
                cardNumber: "**** **** **** 1935",
                amount: "284",
                bgColor:"bg-[#A3323A]"
            },
            {bankName: "GTB",
                cardNumber: "**** **** **** 3967",
                amount: "789",
                bgColor:"bg-[#D94F00]"
            },
        ]



  return (
    <div className=" w-full justify-center  flex items-center font-roboto ">
      <div className=" w-full max-w-[560px]  rounded-md rounded-b-[0px] mb-[35px] mt-[25px]  mx-[20px] items-center">
       
            <h2 className='md:text-[18px] dark:text-white '>Cards</h2>
                {cardInfo.map((info)=>(
            <div className='flex justify-between w-full bg-white dark:bg-darkGray mb-[10px] rounded-[10px] p-[12px] w-full items-center'>

                                   <div className='flex'>
                    <div className={`${info.bgColor}  w-[72px]  rounded-[5px] h-[42px]`}>
                        <div className='relative w-full'>
                        <h2 className='absolute top-0 right-[10px] text-white'>{info.bankName}</h2>
                        </div>
                    </div>
                    <div className='pl-[12px] dark:text-white'>
                        <h2 className='text-[12px]'>{info.cardNumber}</h2>
                        <h2 className='text-[14px]'>{info.amount} Naira</h2>
                    </div>
                </div>
                <div  className='text-[12px] dark:text-white'> <span className='fa fa-chevron-right'>

                </span>
                </div>
            </div>
                ))}
            
        </div>
    </div>
  )
}

export default Cards