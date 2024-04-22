'use client'

import { useGlobalContext } from '@/app/context/context'
import React from 'react'
const EditAnimation = ({ section, field }) => {
    const { state, dispatch } = useGlobalContext()
    const shadowStyle = ['', 'ping', 'bounce', 'tada']
    const handleAnimation = (value) => {
        dispatch({
            ChangeColorOrText: {
                field: field,
                item: section,
                value: value,
            },
        });
    }
    return (<div className={`w-full  flex justify-between items-center mt-6`}>
        {shadowStyle.map((el,index) =>
            <div
                key={el+index}
                onClick={() => handleAnimation(el)}
                className={`flex justify-center items-center gap-2 `}>
                <div className={`w-6 h-6 rounded-full border-[1px]   ${state[section][field] === el ? '  border-orange-500' : "border-gray-400"} flex justify-center items-center `}>
                    <div className={`w-4 h-4 rounded-full border-[1px] bg-gray-400 ${state[section][field] == el ? '  bg-orange-500' : "bg-gray-400"}`}>
                    </div>
                </div>
                <p className={` capitalize`}>{!el ? "No Animation" : el}</p>
            </div>
        )}
    </div >)
}
export default EditAnimation