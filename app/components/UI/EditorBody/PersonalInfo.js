import { useGlobalContext } from '@/app/context/context'
import Image from 'next/image'
import React, { useState } from 'react'
import FB from '../../../../public/images/Logo.png'

import Loader from '@/app/components/UI/Loader';
import notify from '@/utils/toastNotification';
import axios from 'axios';
const PersonalInfo = () => {
    const { dispatch, state } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const changeText = (e) => {
        dispatch({
            personalInfo: {
                property: e.target.name,
                value: e.target.value
            }
        })
    }
    const handleRewrite = async (field) => {
        if (state.personalInfo[field].length <= 20) {
            notify("Too short description",'error')
            return
        }
        try {
            setLoading(true)
            const res = await axios.post("/api/rewrite", {
                prompt: state.personalInfo[field]
            })

            if (res?.status === 200) {
                dispatch({
                    personalInfo: {
                        property: field,
                        value: res?.data?.data
                    }
                })
            }
        } catch (error) {
            if (error?.response?.status === 400 || error?.response?.status === 400) {
                notify(error?.response?.data?.message, 'error', {})
            } else {
                notify('Something went wrong', 'error', {})
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex flex-col gap-4'>
            <div>
                <input
                    name="prefix"
                    //   value={formData.email}
                    //   onChange={(e) => handleFormDataChange(e)}
                    onBlur={(e) => changeText(e)}
                    className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                    type="text"
                    placeholder="Prefix-(e.g-Dr./Prof./Eng.)"
                />
            </div>
            <div className='flex gap-2'>
                <input
                    name="firstName"
                    //   value={formData.email}
                    //   onChange={(e) => handleFormDataChange(e)}
                    onBlur={(e) => changeText(e)}
                    className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                    type="text"
                    placeholder="First Name"
                />
                <input
                    name="lastName"
                    //   value={formData.email}
                    //   onChange={(e) => handleFormDataChange(e)}
                    onBlur={(e) => changeText(e)}
                    className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                    type="text"
                    placeholder="Last Name"
                />
            </div>
            <div>
                <input
                    name="email"
                    //   value={formData.email}
                    //   onChange={(e) => handleFormDataChange(e)}
                    onBlur={(e) => changeText(e)}
                    className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div>
                <input
                    name="jobTitle"
                    //   value={formData.email}
                    //   onChange={(e) => handleFormDataChange(e)}
                    onBlur={(e) => changeText(e)}
                    className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                    type="text"
                    placeholder="Job Title"
                />
            </div>
            <div>
                <input
                    name="businessName"
                    //   value={formData.email}
                    //   onChange={(e) => handleFormDataChange(e)}
                    onBlur={(e) => changeText(e)}
                    className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                    type="text"
                    placeholder="Business Name"
                />
            </div>
            <div className='flex flex-col gap-2'>
                <input
                    name="streetAddress"
                    //   value={formData.email}
                    //   onChange={(e) => handleFormDataChange(e)}
                    onBlur={(e) => changeText(e)}
                    className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                    type="text"
                    placeholder="Street Address"
                />
                <div className='flex gap-2'>
                    <input
                        name="city"
                        //   value={formData.email}
                        //   onChange={(e) => handleFormDataChange(e)}
                        onBlur={(e) => changeText(e)}
                        className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                        type="text"
                        placeholder="City"
                    />
                    <input
                        name="state"
                        //   value={formData.email}
                        //   onChange={(e) => handleFormDataChange(e)}
                        onBlur={(e) => changeText(e)}
                        className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className='flex gap-2'>
                    <input
                        name="postalCode"
                        //   value={formData.email}
                        //   onChange={(e) => handleFormDataChange(e)}
                        onBlur={(e) => changeText(e)}
                        className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                        type="text"
                        placeholder="Posta Code"
                    />
                    <input
                        name="country"
                        //   value={formData.email}
                        //   onChange={(e) => handleFormDataChange(e)}
                        onBlur={(e) => changeText(e)}
                        className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                        type="text"
                        placeholder="Country"
                    />
                </div>
            </div>
            <div className='relative'>
                <textarea
                    name="businessDescription"
                    value={state?.personalInfo?.businessDescription}
                    //   value={formData.email}
                    onChange={(e) => changeText(e)}
                    onBlur={(e) => changeText(e)}
                    className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600 mt-2 p-4 h-28 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none"
                    type="text"
                    placeholder="Business Description"
                />
                <button
                    onClick={() => handleRewrite('businessDescription')}
                    className='absolute drop-shadow-xl bottom-3 right-2 rounded-full bg-white ring-1 ring-primary-dark-blue2 z-50 group w-10 h-10 hover:w-28 transition-all duration-100 ease-in-out flex justify-center items-center gap-1'>
                    <div className='flex justify-center items-center w-10 h-10 '>
                        {!loading && <Image src={FB} width={34} height={34} className='rounded-full' />}
                         {loading && <Loader />}
                    </div>
                    <span className='hidden group-hover:block text-primary-dark-blue2 font-semibold text-sm'>Rewrite</span>
                </button>
            </div>
        </div>
    )
}
export default PersonalInfo