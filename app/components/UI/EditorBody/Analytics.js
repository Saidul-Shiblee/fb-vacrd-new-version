'use client '
import { useGlobalContext } from '@/app/context/context'
import React, { useState } from 'react'


const Analytics = () => {

    const {dispatch}=useGlobalContext()



    return (
        <div className='flex flex-col justify-center items-start gap-4'>
            <h2 className='text-2xl font-semibold text-primary-dark-blue2'>
                Analytics
            </h2>


            <div className='pl-4 '>

                <textarea
                name='analyticsCode'
                onBlur={(e)=>{
                    dispatch({
                        [e.target.name]: e.target.value
                    })
                }}

                placeholder="Paste your tracking code here"
                    className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-28 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
            </div>
        </div>
    )
}

export default Analytics