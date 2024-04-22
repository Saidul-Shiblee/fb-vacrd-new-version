'use client'
import { useGlobalContext } from '@/app/context/context'
import React from 'react'
const EditShadow = ({ section, field = undefined }) => {
    const { state, dispatch } = useGlobalContext()
    const shadowStyle = ['badge0', 'badge1', 'badge2', 'badge3', 'badge4', 'badge5']
    const handleShadow = (value) => {
        dispatch({
            ChangeColorOrText: {
                field: field ? field : `boxShadow`,
                item: section,
                value: value,
            },
        });
    }
    const fieldName = field ? state[section]?.[field] : state[section]?.boxShadow
    return (<div className={`w-full  flex justify-between items-center mt-6`}>
        {shadowStyle.map((el, index) =>
            <div
                key={el}
                onClick={() => handleShadow(el)}
                className={` p-1 flex justify-center items-center rounded-xl ${fieldName ? fieldName == el && ' border border-orange-500' : index === 1 && ' border border-orange-500'}`}>
                <div className={`${el} w-16 h-16 rounded-xl `}></div>
            </div>
        )}
    </div >)
}
export default EditShadow