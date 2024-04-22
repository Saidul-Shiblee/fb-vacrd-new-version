'use client '
import React, { useEffect, useState } from 'react'
import Toggle from '../../toggleButton';
import { useGlobalContext } from '@/app/context/context';

const CustomizeMetaData = () => {
    const {dispatch } = useGlobalContext()
    const [toggle, setToggle] = useState(false);
    const [firstRender, setFirstRender] = useState(false);

    const handleTextChange = (e) => {
        dispatch({
            ChangeColorOrText: {
                field: e.target.name,
                item: 'metaData',
                value: e.target.value,
            },
        })
    }
    useEffect(() => {
        if (firstRender) {
            dispatch({
                toggleItem: {
                    itemName: 'metaData',
                    fields: {
                        name: "",
                        serviceOrProductName: "",
                        url: ""
                    }
                }
            })

        }
    }, [toggle])

    useEffect(() => setFirstRender(true), [])
    return (
        <div className='flex flex-col justify-center items-start gap-4'>
            <h2 className='text-2xl font-semibold text-primary-dark-blue2'>
                Customize your Meta Data
            </h2>


            <div className='pl-4 flex flex-col gap-8'>
                <div className='flex items-center gap-4'>
                    <Toggle toggle={toggle} setToggle={setToggle} />
                    <p className=''>{toggle ? "Yes, I will customize my meta data" : "No,Thanks"}</p>
                </div>

                {toggle && <>
                    <div>
                        <input onBlur={(e) => handleTextChange(e)} name='name' placeholder="Enter your personal name or business name" className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
                    </div>
                    <div>
                        <input onBlur={(e) => handleTextChange(e)} name='serviceOrProductName' placeholder="Enter your product or service name" className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
                    </div>
                    <div>
                        <input onBlur={(e) => handleTextChange(e)} name='url' placeholder="Enter your card offer url" className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
                    </div>

                </>}
            </div>
        </div>
    )
}

export default CustomizeMetaData



// footer text link text url