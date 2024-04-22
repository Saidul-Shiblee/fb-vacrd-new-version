'use client'
import React from 'react'
import { RxDragHandleDots1 } from 'react-icons/rx'
import { useGlobalContext } from '@/app/context/context'

const ContactForm = (props) => {
    const { itemId, setSectionItem ,sectionName} = props
    const { dispatch } = useGlobalContext()
    const handleRemove = () => {
        setSectionItem(pv => pv.filter(el => el.id !== itemId))
        dispatch({
            removeFeaturedSctionItem: {
                item: `contact_${itemId}`,
                sectionName: sectionName,
            }
        })
    }


    return (
        <div ref={props.provided.innerRef} {...props.provided.draggableProps} {...props.provided.dragHandleProps} className="flex gap-2 justify-start items-center max-w-[416px] bg-gray-100 rounded-lg p-1" >
            <div className='w-8'>
                <RxDragHandleDots1 className="h-10 w-8 text-primary-dark-blue2" />

            </div>
            <div className='bg-gray-100 rounded-lg grow flex justify-start items-center'>
              <p>Your Contact Form</p>
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
export default ContactForm