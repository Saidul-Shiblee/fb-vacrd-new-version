
'use client'
import { useGlobalContext } from '@/app/context/context'
import React, { useRef } from 'react'
import { TbSpacingHorizontal } from "react-icons/tb";
import { TbSpacingVertical } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const EditPadding = ({ section, field = undefined, direction, defaultValue }) => {
    const { state, dispatch } = useGlobalContext()
    const ref = useRef(null)
    const hanldePadding = (action) => {
        const value = action === 'addition' ? Number(ref.current.value) + 1 : Number(ref.current.value) - 1
        dispatch({
            ChangeColorOrText: {
                field: field ? field + direction : 'padding' + direction,
                item: section,
                value: value,
            },
        });
    }
    const fieldName = field ? state[section]?.[field + direction] : state[section]?.['padding' + direction]
    return (<div className={`flex flex-col p-2 justify-center items-center mt-6 border border-gray-400`}>
        <div className='flex flex-col justify-center items-center'>
            {direction === "x" ? < TbSpacingHorizontal className='w-8 h-14' /> : <TbSpacingVertical className='w-8 h-14' />}
            <div className='flex justify-center items-center gap-4'>
                <div className='active:scale-95 flex justify-center items-center font-semibold w-6 h-6 rounded-full bg-slate-500 shadow-sm text-lg cursor-pointer' onClick={() => hanldePadding('subtraction')}>
                    <FaMinus className='w-4 h-4' />
                </div>
                <input className='w-14 pl-4 rounded-md bg-slate-200' ref={ref} type='text' value={fieldName ? fieldName : defaultValue} />
                <div className=' active:scale-95 flex justify-center items-center font-semibold w-6 h-6 rounded-full bg-slate-500 shadow-sm text-lg cursor-pointer' onClick={() => hanldePadding('addition')}>
                    <FaPlus className='w-4 h-4' />
                </div>
            </div>
        </div>
        {/* {shadowStyle.map((el, index) =>
            <div
                onClick={() => handleShadow(el)}
                className={` p-1 flex justify-center items-center rounded-xl `}>
                <div className={`${el} w-16 h-16 rounded-xl `}></div>
            </div>
        )} */}
    </div >)
}
export default EditPadding