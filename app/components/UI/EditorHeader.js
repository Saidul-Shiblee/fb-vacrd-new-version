"use client"
import Image from 'next/image'
import React from 'react'
import Vlogo from '../../../public/images/vcardLogo.png'
import { FaRegUserCircle } from "react-icons/fa";
import { RxComponent1 } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react"


const EditorHeader = () => {




    return (<>

        <div className='flex flex-col items-start  h-screen  pt-20 pb-8'>

            <div className='flex justify-between items-center w-full '>

                <Image src={Vlogo} width={200} height={80} className=' drop-shadow-md' />

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1" style={{backgroundColor:'transparent'}}><FaRegUserCircle className='w-8 h-8 text-primary-dark-blue2' /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md  ">
                        <div className=''>Welcome,User!</div>
                        <hr className='mb-2'/>
                        <div className='flex justify-start items-center gap-2 text-primary-dark-blue2 flex-row hover:bg-primary-light-blue px-2 py-1 rounded-md cursor-pointer duration-150 ease-in-out transition-all'> <RxComponent1 className='w-4 h-4 text-primary-dark-blue2' /><a>Profile</a></div>
                        <div onClick={() => { signOut({ callbackUrl: '/login' }) }} className='flex justify-start items-center gap-2 text-primary-dark-blue2 flex-row hover:bg-primary-light-blue px-2 py-1 rounded-md cursor-pointer duration-150 ease-in-out transition-all'> <MdLogout className='w-4 h-4 text-primary-dark-blue2' /><a>Logout</a></div>
                    </ul>
                </div>






            </div>




            <div className='flex flex-col items-start gap-6 pt-28'>
                <h1 className='text-4xl font-semibold text-primary-dark-blue2'>
                    Digital Business Card Generator
                </h1>
                <div>
                    <p>
                        FLAMEBACK vCARD helps you create beautiful, responsive HTML‑based digital business cards that can be hosted on your domain.
                    </p>
                </div>
                <div>
                    <h6>- FLAMEBACK vCARD is a digital business card generator tool</h6>
                    <h6>- Generate digital business cards for you and your team</h6>
                    <h6>- .vcf file included with every business card</h6>
                    <h6>- Share your contact details effortlessly by link or QR code</h6>
                    <h6>- Host your card for free on your domain</h6>
                    <h6>- Customize your visitng card as you like</h6>
                </div>

                <div className="flex gap-4 justify-center xmd:justify-start items-start mb-[80px] md:mb-0">
                    <button className="font-semibold duration-500 ease-in-out transition uppercase px-4 sm:px-8 hover:bg-primary-dark-blue2 hover:text-primary-light-blue border-[1px] border-primary-dark-blue2 py-4 rounded-full bg-primary-light-blue text-primary-dark-blue2">
                        Create Your Card!
                    </button>
                    <button className="font-semibold duration-500 ease-in-out transition uppercase px-4  sm:px-8 hover:bg-primary-light-blue hover:text-primary-dark-blue2 border-[1px] border-primary-dark-blue2 py-4 rounded-full bg-primary-dark-blue2 text-primary-light-blue">
                        Demo
                    </button>
                </div>
            </div>

    </div>


    </>


    )
}

export default EditorHeader