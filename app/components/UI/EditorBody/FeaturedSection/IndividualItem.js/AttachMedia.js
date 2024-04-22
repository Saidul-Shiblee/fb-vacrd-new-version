'use client'

import { useGlobalContext } from '@/app/context/context'
import Image from 'next/image'
import React from 'react'
import { RxDragHandleDots1 } from 'react-icons/rx'

const AttachMedia = (props) => {
    const {  fileName,url, itemId, setSectionItem,sectionName }=props
    const {state,dispatch}=useGlobalContext()


    const handleRemove=()=>{
        setSectionItem(pv=>pv.filter(el=>el.id!==itemId))
        dispatch({
            removeFeaturedSctionItem: {
                item: `attachMedia_${itemId}`,
                sectionName: sectionName,
            }
        })
    }

  return (
      <div ref={props.provided.innerRef} {...props.provided.draggableProps} {...props.provided.dragHandleProps} className="flex gap-2 justify-start items-center max-w-[416px] bg-gray-100 rounded-lg p-1" >
          <div className='w-8'>
              <RxDragHandleDots1 className="h-10 w-8 text-primary-dark-blue2" />

          </div>
          <div className="flex justify-start items-center grow  gap-4" >

              <div className='h-8 w-12 relative cursor-pointer'>
                  <Image
                      fill
                      className="object-cover absolute rounded-lg"
                      src={url}
                      alt=""
                  >
                  </Image>
              </div>
              <p className='overflow-hidden'>{fileName}</p>


          </div>
          <div className='flex justify-center items-center w-6'>
              <button
              onClick ={handleRemove}
                  className="text-primary-dark-blue2 text-xl ">
                  X
              </button>
          </div>

      </div >
  )
}

export default AttachMedia


