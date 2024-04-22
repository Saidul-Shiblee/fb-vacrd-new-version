'use client'
import React from 'react'
import { RxDragHandleDots1 } from 'react-icons/rx'
import { useGlobalContext } from '@/app/context/context'

const IframeCode = (props) => {
    const { itemId, setSectionItem ,sectionName} = props
    const { state, handleChange, dispatch } = useGlobalContext()
    const handleRemove = () => {
        setSectionItem(pv => pv.filter(el => el.id !== itemId))
        dispatch({
            removeFeaturedSctionItem: {
                item: `iframe_${itemId}`,
                sectionName: sectionName,
            }
        })
    }

    const changeText = (event) => {
        dispatch({
            changeFeaturedSectionItemText: {
                item: `iframe_${itemId}`,
                sectionName: sectionName,
                field: event.target.name,
                value: event.target.value
            }
        })
    }
    return (
        <div ref={props.provided.innerRef} {...props.provided.draggableProps} {...props.provided.dragHandleProps} className="flex gap-2 justify-start items-center max-w-[416px] bg-gray-100 rounded-lg p-1" >
            <div className='w-8'>
                <RxDragHandleDots1 className="h-10 w-8 text-primary-dark-blue2" />

            </div>
            <div className='bg-gray-100 rounded-lg grow flex justify-start items-center'>
                <textarea
                    name="text"
                    onBlur={changeText} placeholder='Paste iframe code here' className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-16 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
            </div>
            <div className='flex justify-center items-center w-6'>
                <button
                onClick={handleRemove}
                    className="text-primary-dark-blue2 text-xl ">
                    X
                </button>
            </div>
        </div>
    )
}
export default IframeCode