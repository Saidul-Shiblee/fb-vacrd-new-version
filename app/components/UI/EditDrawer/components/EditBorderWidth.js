'use client'

import { useGlobalContext } from '@/app/context/context'
import React from 'react'

const EditBorderWidth = ({ title, section, item }) => {
    const { state, dispatch } = useGlobalContext()
    const hanldeChange = (e) => {
        const value = e.target.value
        dispatch({
            ChangeColorOrText: {
                field: item,
                item: section,
                value: value,
            },
        });
    }

    return (
        <>
            <div className='flex flex-col  gap-2 w-full relative mt-6'>
                <p className='inline-block text-gray-400'>{title}</p>
                <div className='flex w-full justify-between'>
                    <input type="range" min={1} max={10} value={state?.[section]?.[item] ? state?.[section]?.[item] : 2} className="w-full rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 " onChange={(e)=>hanldeChange(e)}/>
                </div>
            </div>
        </>
    )
}
export default EditBorderWidth