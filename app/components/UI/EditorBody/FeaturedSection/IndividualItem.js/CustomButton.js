'use client'
import React from 'react'
import { RxDragHandleDots1 } from 'react-icons/rx'
import { LuImagePlus } from 'react-icons/lu'
import { useGlobalContext } from '@/app/context/context'
const CustomButton = (props) => {
    const { state, handleChange, dispatch } = useGlobalContext()
    const { itemId, setSectionItem, sectionName } = props
    const handleRemove = () => {
        setSectionItem(pv => pv.filter(el => el.id !== itemId))
        dispatch({
            removeFeaturedSctionItem: {
                item: `button_${itemId}`,
                sectionName: sectionName,
            }
        })
    }
    return (
        <div ref={props.provided.innerRef} {...props.provided.draggableProps} {...props.provided.dragHandleProps} className="flex gap-2 justify-start items-center max-w-[416px] bg-gray-100 rounded-lg p-1" >
            <div className='w-8'>
                <RxDragHandleDots1 className="h-10 w-8 text-primary-dark-blue2" />
            </div>
            <div className='flex justify-between items-center gap-2'>
                <input
                    onBlur={(el) => dispatch({
                        changeFeaturedSectionItemText: {
                            item: `button_${itemId}`,
                            sectionName: sectionName,
                            field: 'link',
                            value: el.target.value
                        }
                    })}
                    placeholder='Button link' className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
                <input
                    onBlur={(el) => dispatch({
                        changeFeaturedSectionItemText: {
                            item: `button_${itemId}`,
                            sectionName: sectionName,
                            field: 'text',
                            value: el.target.value
                        }
                    })}
                    placeholder='Button label' className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
            </div>
            <div className='flex justify-center items-center w-8'>
                <button
                    onClick={handleRemove}
                    className="text-primary-dark-blue2 text-xl ">
                    X
                </button>
            </div>
        </div>
    )
}
export default CustomButton