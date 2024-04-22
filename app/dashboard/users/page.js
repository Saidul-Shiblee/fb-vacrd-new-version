'use client'

import notify from '@/utils/toastNotification'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users,setUsers]=useState([])


  useEffect(()=>{
   const getUseres=async()=>{
    try {
      const res = await axios.get('/api/getUsers')
      if (res.status === 200) {
        setUsers(res?.data?.data);
      }

    } catch (error) {
      notify("Something went wrong",'error',{})
    }


  }

  getUseres()
  },[])

  return (
    <div className='w-full p-10'>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Role
            </th>
            <th scope="col" class="px-6 py-3">
              Registerd At
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(el => <tr key={el?._id} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {el?.fullName}
              </th>
              <td class="px-6 py-4">
                {el?.email}
              </td>
              <td class="px-6 py-4">
                {el?.role ? el?.role:'user'}
              </td>
              <td class="px-6 py-4">
                {el?.createdAt}
              </td>

            </tr>
         )
          }


        </tbody>
      </table>
    </div>
  )
}

export default Users