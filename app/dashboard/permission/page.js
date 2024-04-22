'use client'

import notify from '@/utils/toastNotification'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Permission = () => {
  const [permission, setPermission] = useState({})
  const [edit, setEdit] = useState(false)
  const [card, setCard] = useState(0)
  const [rewrite, setRewrite] = useState(0)
  const [productName, setProductName] = useState(0)

  useEffect(()=>{

    setCard(permission?.cardGeneration)
    setRewrite(permission?.rewrite)
    setProductName(permission?.productNameGeneration)

  }, [permission?.cardGeneration, permission?.rewrite, permission?.productNameGeneration])


  useEffect(() => {
    const getPermission = async () => {
      try {
        const res = await axios.get('/api/permission')
        if (res.status === 200) {
          setPermission(res?.data?.data);
        }

      } catch (error) {
        notify("Something went wrong", 'error', {})
      }


    }

    getPermission()
  }, [])


  const handleEdit=()=>{
    setEdit(!edit)
  }



  const handleUpdate=async()=>{
  try {
    const res = await axios.post('/api/permission',{
      id: permission?._id,
      cardGeneration:card,
      rewrite:rewrite,
      productNameGeneration:productName
    })
    if (res.status === 200) {
      setPermission(res?.data?.data);
      setEdit(false)
    }

  } catch (error) {
    notify("Something went wrong", 'error', {})
  }
  }



  return (
    <div className='w-full p-10 flex flex-col justify-start items-start gap-3'>

      <button
        onClick={handleEdit}

      className='self-end mr-10 bg-primary-dark-blue2 text-primary-light-blue active:scale-95 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1  ease-linear transition-all duration-150 disabled:text-gray-300 disabled:active:scale-100'>Edit</button>
    {!edit?

    <>
    <div>
        <p>Card Generation Limit: <span>{permission?.cardGeneration}</span></p>
     </div>
     <div>
        <p>Rewrite Limit: <span>{permission?.rewrite}</span></p>
     </div>
     <div>
        <p>Product Nmae Generation Limit: <span>{permission?.productNameGeneration}</span></p>
     </div>
        </>

     :
     <>
          <div className='flex justify-start items-center gap-4 w-full '>
            <p className=' w-64'>Card Generation Limit: </p>
            <input value={card} onChange={(e)=>setCard(e.target.value)} name='cardGenerationLimit' type="number" class="border-[2px] px-3 py-3 w-56
                                  text-primary-blue bg-primary-light-blue rounded text-sm shadow   ease-linear transition-all duration-150 focus:border-primary-mid-blue focus:border-[2px]  focus:outline-none focus:ring-none"
             />
          </div>
          <div className='flex justify-start items-center gap-4 w-full'>
            <p className='w-64'>Rewrite Limit: </p>
            <input value={rewrite} onChange={(e)=>setRewrite(e.target.value)} name='cardGenerationLimit' type="number" class="border-[2px] px-3 py-3 w-56
                                  text-primary-blue bg-primary-light-blue rounded text-sm shadow   ease-linear transition-all duration-150 focus:border-primary-mid-blue focus:border-[2px]  focus:outline-none focus:ring-none"
            />
          </div>
          <div className='flex justify-start items-center gap-4 w-full'>
            <p className='w-64'>Product Name Generation Limit: </p>
            <input value={productName} onChange={(e)=>setProductName(e.target.value)} name='cardGenerationLimit' type="number" class="border-[2px] px-3 py-3 w-56
                                  text-primary-blue bg-primary-light-blue rounded text-sm shadow   ease-linear transition-all duration-150 focus:border-primary-mid-blue focus:border-[2px]  focus:outline-none focus:ring-none"
            />
          </div>

          <button
            onClick={handleUpdate}

            className=' text-primary-dark-blue2 bg-primary-light-blue active:scale-95 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1  ease-linear transition-all duration-150 disabled:text-gray-300 disabled:active:scale-100'>Update</button>


     </>

     }


    </div>
  )
}

export default Permission

