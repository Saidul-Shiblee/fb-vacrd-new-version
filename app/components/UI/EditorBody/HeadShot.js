'use client'

import React, { useRef, useState } from 'react'
import Toggle from '../../toggleButton';
import { ImageCropper } from '../../Cropper';
import Image from 'next/image';
import { CiCirclePlus } from "react-icons/ci";
import { PiAlignLeftSimpleBold, PiAlignRightSimpleBold, PiAlignCenterVerticalSimpleBold } from "react-icons/pi";
import { MdCancel } from "react-icons/md"
import { useGlobalContext } from '@/app/context/context';

const HeadShot = () => {
    const { state, dispatch } = useGlobalContext()
    const [image, setImage] = useState("");
    const [coverPhotoMiniPreview, setCoverPhotoMiniPreview] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const cropperModalRef = useRef()


    const handleFiles = (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file.type.match(/image\/(png|jpeg)/)) {
            alert('File type not supported')
            return
        }
        setImageFile(file)
        if (file) {
            let url = URL.createObjectURL(file)
            setImage(url);
            if (url) {
                cropperModalRef.current.showModal()

            }

        }

    }



    const handlePosition=(position)=>{
        dispatch({ 'headShotPosition': position })
    }
    return (
        <div className='flex flex-col justify-center items-start gap-4'>
            <h2 className='text-2xl font-semibold text-primary-dark-blue2 '>
                vCard Information
            </h2>

            <div className='pl-4 flex flex-col gap-8 '>
                <div className='flex items-center gap-4 h-14'>
                    {!coverPhotoMiniPreview ? (

                        <>
                            <div className='w-12 h-12 rounded-full flex justify-center bg-primary-dark-blue2 text-primary-light-blue text-5xl  items-center'>
                                <label htmlFor="for-headShot" className=' justify-center items-center flex'>
                                    <CiCirclePlus className='w-10 h-10' />
                                </label>
                                <input
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    id="for-headShot"
                                    type="file"
                                    onChange={handleFiles}
                                    onClick={(event) => {
                                        event.target.value = null;
                                    }}
                                />
                                <ImageCropper
                                    ref={cropperModalRef}
                                    image={image}
                                    coverPhotoMiniPreview={coverPhotoMiniPreview}
                                    setCoverPhotoMiniPreview={setCoverPhotoMiniPreview}
                                    imageOf={"headShot"}
                                    imageFile={imageFile}

                                    setImage={setImage}

                                />
                            </div>
                            <div>
                                <p>Upload your headshot</p>

                                <p className='text-sm'>Supported format: jpeg, png</p>
                            </div>
                        </>
                    ) : (<div className='h-12 w-12 relative cursor-pointer'>
                        <Image
                            fill
                            className="object-cover absolute"
                            src={coverPhotoMiniPreview}
                            alt=""
                        >
                        </Image>
                        <MdCancel onClick={() =>
                           { setCoverPhotoMiniPreview("")
                            dispatch({
                                "headShot": ""
                                })}
                            }
                            className='text-gray-900/60 w-5 h-5 absolute top-0 right-0 ' />
                    </div>)}

                </div>
                <div className='border-[1px] border-primary-dark-blue2 p-4 text-sm rounded-lg'>
                    <p>Recommended brand logo size is 300 x 300 pixels.</p>
                </div>


            </div>


        </div>
    )
}

export default HeadShot