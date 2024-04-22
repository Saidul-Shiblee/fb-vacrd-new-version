'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image';
import Toggle from '../../toggleButton';

import { MdCancel } from "react-icons/md"
import { useGlobalContext } from '@/app/context/context';
import { useEffect } from 'react';
import { handleImageFile } from '@/utils/fileUtilities';
import notify from '@/utils/toastNotification';
import { BiPlus } from 'react-icons/bi';

const CustomizeFavIcon = () => {
    const { dispatch } = useGlobalContext()
    const [toggle, setToggle] = useState(false);
    const [firstRender, setFirstRender] = useState(false);
    const [image, setImage] = useState("");



    useEffect(() => {
        if (firstRender) {
            dispatch({
                toggleItem: {
                    itemName: 'favIcon',
                    fields: {
                        image: "",
                        altText: "",
                    }
                }
            })
            setImage("")
        }
    }, [toggle])

    useEffect(() => setFirstRender(true), [])



    const handleFiles = async (event) => {
        const file = event.target.files && event.target.files[0];

        if(!file.type.match(/image\/(png)/)) {
            alert('File type not supported')
            return
        }

        let type = 'icon'
        if (file) {
            let url = URL.createObjectURL(file)
            setImage(url);
            const img = await handleImageFile(file, type, file.type)

            dispatch({
                ChangeColorOrText: {
                    field: 'image',
                    item: 'favIcon',
                    value: img,
                },
            });
        }
    }
    return (
        <div className='flex flex-col justify-center items-start gap-4'>
            <h2 className='text-2xl font-semibold text-primary-dark-blue2'>
                Customize Your Favicon/Share Image?
            </h2>
            <div className='flex items-center gap-4 pl-4'>
                <Toggle toggle={toggle} setToggle={setToggle} />
                <p className=''>{toggle ? "Yes I want to customize the Favicon" : "No,Thanks"}</p>
            </div>

            {toggle  && <div className='pl-4 flex flex-col gap-8'>
                <div className='flex items-center gap-4 h-14'>
                    {!image ? (

                        <>
                            <div className='w-12 h-12 rounded-full flex justify-center bg-primary-dark-blue2 text-primary-light-blue text-5xl  items-center'>
                                <label htmlFor="for-favicon" > <BiPlus className='w-8 h-8' /></label>
                                <input
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    id="for-favicon"
                                    type="file"
                                    onChange={handleFiles}
                                    onClick={(event) => {
                                        event.target.value = null;
                                    }}
                                />

                            </div>
                            <div>
                                <p className='text-sm'>Supported format: png</p>
                            </div>

                        </>
                    ) : (<div className='h-[40px] w-[40px] relative cursor-pointer'>
                        <Image
                            fill
                            className="object-cover absolute"
                            src={image}
                            alt=""
                        >
                        </Image>
                            <MdCancel onClick={() => setImage("")} className='text-gray-900/60 w-5 h-5 absolute -top-2 -right-2 ' />

                    </div>)}

                </div>
                <div className='border-[1px] border-primary-dark-blue2 p-4 text-sm rounded-lg'>

                <p>Recommended favicon size is 16 x 16 pixels.</p>



                </div>

                <div>
                    <input
                    onBlur={(e)=>{
                            dispatch({
                                ChangeColorOrText: {
                                    field: 'altText',
                                    item: 'favIcon',
                                    value: e.target.value,
                                },
                            })
                    }}
                        placeholder="Alt text" className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
                </div>
            </div>}


        </div>
    )
}

export default CustomizeFavIcon