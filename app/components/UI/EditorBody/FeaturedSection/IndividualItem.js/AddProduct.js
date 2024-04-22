'use client'

import React, { useState } from 'react'
import { RxDragHandleDots1 } from 'react-icons/rx'

import { LuImagePlus } from 'react-icons/lu'
import Image from 'next/image'
import { useGlobalContext } from '@/app/context/context'
import { handleImageFile, mediaType } from '@/utils/fileUtilities'

const AddProduct = (props) => {
  const { itemId, setSectionItem, sectionName } = props
  const { state, handleChange, dispatch } = useGlobalContext()
  const [productImageURL, setProductImageURL] = useState(null)
  const handleRemove = () => {
    setSectionItem(pv => pv.filter(el => el.id !== itemId))
    dispatch({
      removeFeaturedSctionItem: {
        item: `product_${itemId}`,
        sectionName: sectionName,
      }
    })
  }


  const handleFiles = async(event) => {
    const file = event.target.files && event.target.files[0];
    if (!file.type.match(/image\/(png|jpeg)/)) {
      alert('File type not supported')
      return
    }
    let type = mediaType(file.type)
    if (file) {
      let url = URL.createObjectURL(file)
      setProductImageURL(url)
      const img = await handleImageFile(file, type, file.type)
      dispatch({
        changeFeaturedSectionItemText: {
          item: `product_${itemId}`,
          sectionName: sectionName,
          field: 'image',
          value: img
        }
      })

    }
  }
  const removeImage = () => {
    setProductImageURL(null)
    dispatch({
      changeFeaturedSectionItemText: {
        item: `product_${itemId}`,
        sectionName: sectionName,
        field: 'image',
        value: ""
      }
    })
  }

  const changeText = (event) => {
    dispatch({
      changeFeaturedSectionItemText: {
        item: `product_${itemId}`,
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
      <div className="flex flex-col grow gap-2     " >
        <div className='flex justify-center items-center gap-4  '>
          <div>
            {!productImageURL ?
              <label htmlFor={`for-attachMedia-${itemId}`}>
                <LuImagePlus

                  className='w-10 h-10 text-primary-dark-blue2 hover:text-primary-dark-blue2/70 transition-all duration-150 hover:scale-102 cursor-pointer' />
              </label> :
              <div className='relative w-10 h-10'>
                <Image fill className='object-cover rounded-lg' src={productImageURL} alt="productImage " >

                </Image>
                <button
                  onClick={removeImage}
                  className='absolute flex justify-center items-center  w-5 h-5 text-white bg-gray-800/75 text-xs rounded-full -top-2 -right-2'>X</button>

              </div>

            }
            <input
              name='attachMedia'
              style={{ display: "none" }}
              accept="image/*"
              id={`for-attachMedia-${itemId}`}
              type="file"
              onChange={(e) => handleFiles(e)}
              onClick={(event) => {
                event.target.value = null;
              }}
            />

          </div>
          <div>
            <input
              name='title'
              placeholder="Product title" className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none grow"
              onBlur={(e) => {
                changeText(e)
              }}

            />
          </div>

        </div>
        <div className='bg-gray-100 rounded-lg grow flex justify-center items-center'>
          <textarea
            name='description'
            onBlur={(e) => {
              changeText(e)
            }}
            placeholder='Product Description' className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-24 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
        </div>
        <div>

          <input
            name='price'
            onBlur={(e) => {
              changeText(e)
            }}
            placeholder='Price' className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
        </div>
        <div className='flex justify-center items-center gap-2'>
          <input
            name='buttonLink'
            onBlur={(e) => {
              changeText(e)
            }}
            placeholder='Button link or email' className="w-full placeholder:text-xs border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
          <input
            name='buttonText'
            onBlur={(e) => {
              changeText(e)
            }}
            placeholder='Button label' className="w-full placeholder:text-xs border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />

        </div>

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

export default AddProduct