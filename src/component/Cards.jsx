import React from 'react'

const Cards = () => {
  return (
    <div>
        <div className="justify-center w-max-[560px] w-full mb-[35px] mt-[25px]  ">
            <h2 className='text-[12px]'>Cards</h2>
            <div className='flex justify-between w-full bg-white mb-[10px] rounded-[10px] p-[12px] w-full items-center'>
                <div className='flex '>
                    <div className='bg-private relative w-[72px] rounded-[5px] h-[42px]'>
                        <h2 className='absolute bottom-0 right-[10px] text-white'>UBA</h2>
                    </div>
                    <div className='pl-[12px]'>
                        <h2 className='text-[12px]'>**** **** **** 1935</h2>
                        <h2 className='text-[14px]'>284 Naira</h2>

                    </div>
                </div>
                <div  className='text-[12px]'> <span className='fa fa-chevron-right'>

                </span></div>
            </div>
            <div className='flex justify-between w-full bg-white mb-[10px] rounded-[10px] p-[12px] w-full items-center'>
                <div className='flex '>
                    <div className='bg-private relative w-[72px] rounded-[5px] h-[42px]'>
                        <h2 className='absolute bottom-0 right-[10px] text-white'>UBA</h2>
                    </div>
                    <div className='pl-[12px]'>
                        <h2 className='text-[12px]'>**** **** **** 1935</h2>
                        <h2 className='text-[14px]'>284 Naira</h2>

                    </div>
                </div>
                <div  className='text-[12px]'> <span className='fa fa-chevron-right'>

                </span></div>
            </div>
            
        </div>
    </div>
  )
}

export default Cards