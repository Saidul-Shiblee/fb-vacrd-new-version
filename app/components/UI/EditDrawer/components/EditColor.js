'use client'
import { useGlobalContext } from '@/app/context/context'
import React, { useState } from 'react'
import ColorPicker from '../../../ColorPicker'

const EditColor = ({ colorOf = undefined, item = undefined, selectedIcon =undefined,icon=false, }) => {
    const { state } = useGlobalContext()
    const [color, setColor] = useState(false)


    return (
        <>
            <div style={{

                backgroundColor: icon ? selectedIcon?.style?.[colorOf] : state?.[item]?.[colorOf]

                 }} className={`w-16 h-10 border-4 border-gray-200 rounded-xl`} onClick={() => setColor(!color)}>
            </div>
            {color ? <ColorPicker colorOf={colorOf} setOpen={setColor} item={item} selectedIcon={selectedIcon} icon={icon} /> : null}
        </>
    )

}


export default EditColor