import React from 'react'

    const Cards = () => {
  return (
    <div className=" w-full justify-center  flex items-center font-roboto ">
      <div className=" w-full max-w-[560px]  rounded-md rounded-b-[0px] mb-[35px] mt-[25px]  mx-[20px] items-center">
       
            <h2 className='md:text-[18px] dark:text-white '>Cards</h2>
            <div className='flex justify-between w-full bg-white dark:bg-darkGray mb-[10px] rounded-[10px] p-[12px] w-full items-center'>
                <div className='flex relative'>
                    <div className='bg-private relative w-[72px]       rounded-[5px] h-[42px]'>
                        <h2 className='absolute bottom-0 right-[10px] text-white'>UBA</h2>
                    </div>
                    <div className='pl-[12px] dark:text-white'>
                        <h2 className='text-[12px]'>**** **** **** 1935</h2>
                        <h2 className='text-[14px]'>284 Naira</h2>

                    </div>
                </div>
                <div  className='text-[12px] dark:text-white'> <span className='fa fa-chevron-right'>

                </span></div>
            </div>
            <div className='flex justify-between w-full bg-white  dark:bg-darkGray mb-[10px] rounded-[10px] p-[12px] w-full items-center'>
                <div className='flex '>
                    <div className='bg-private relative w-[72px] rounded-[5px] h-[42px]'>
                        <h2 className='absolute bottom-0 right-[10px] text-white'>UBA</h2>
                    </div>
                    <div className='pl-[12px] dark:text-white'>
                        <h2 className='text-[12px]'>**** **** **** 1935</h2>
                        <h2 className='text-[14px]'>284 Naira</h2>

                    </div>
                </div>
                <div  className='text-[12px] dark:text-white'> <span className='fa fa-chevron-right'>

                </span></div>
            </div>
            
        </div>
    </div>
  )
}

export default Cards