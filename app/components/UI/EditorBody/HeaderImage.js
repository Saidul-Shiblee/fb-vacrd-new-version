'use client'

import React, { useRef, useState, useEffect } from 'react'
import Toggle from '../../toggleButton';
import { ImageCropper } from '../../Cropper';
import NextImage from 'next/image';
import { MdCancel } from "react-icons/md"
import { LuImagePlus } from "react-icons/lu"
import { useGlobalContext } from '@/app/context/context';
import generateTetradicColors from "@/utils/generateTetradicColors";
import ColorThief from 'colorthief';
import generateGradient from '@/utils/geneateGradient';


const HeaderImage = () => {

    const { dispatch } = useGlobalContext()
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState(null)
    const [coverPhotoMiniPreview, setCoverPhotoMiniPreview] = useState("")
    const [palettes, setPalettes] = useState([]);
    const [getPallets, setGetPallets] = useState(false);


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





    useEffect(() => {

        let colorThief = new ColorThief();
        if (imageFile) {
            const image = new Image();
            image.src = URL.createObjectURL(imageFile);
            image.onload = () => {
                let palette = colorThief.getPalette(image, 5);
                if (palette.length) dispatch({ headShotRingColor: generateGradient(palette) });
                palette = [];

            };
        }
    }, [getPallets]);





    const handle_color_theme_suggestion_modal = (color) => {
        dispatch({
            ChangeColorOrText: {
                field: "bodyBackground",
                item: 'color',
                value: `rgb(${color[0].r}, ${color[0].g}, ${color[0].b})`,
            },
        })
        dispatch({
            ChangeColorOrText: {
                field: "buttonBackground",
                item: 'color',
                value: `rgb(${color[1].r}, ${color[1].g}, ${color[1].b})`
            },
        })
        dispatch({
            ChangeColorOrText: {
                field: 'featuredContentBackground',
                item: 'color',
                value: `rgb(${color[2].r}, ${color[2].g}, ${color[2].b})`
            },
        })
        dispatch({
            ChangeColorOrText: {
                field: 'headerBackground',
                item: 'color',
                value: `rgb(${color[3].r}, ${color[3].g}, ${color[3].b})`,
            },
        })
        document.getElementById("color_theme_suggestion_modal").close()
        setGetPallets(false)
        setPalettes([])
        setImageFile(null)
    }


    return (
        <div className='flex flex-col justify-center items-start gap-4'>
            <h2 className='text-2xl font-semibold text-primary-dark-blue2 '>
                Header Image
            </h2>

            <div className='pl-4 flex flex-col gap-8'>
                <h3>Select your brand logo</h3>
                {/* <div className='flex items-center gap-4'>
                    <Toggle toggle={toggle} setToggle={setToggle} />
                    <p className=''>{toggle ? "Brand Logo" : "Cover Photo"}</p>
                </div> */}

                <div className='flex items-center gap-4 h-14'>
                    {!coverPhotoMiniPreview ? (

                        <>
                            <div className='w-12 h-12 rounded-full flex justify-center items-center bg-primary-dark-blue2 text-white  cursor-pointer'>
                                <label htmlFor="for-coverPhoto" className='m-0 p-0 ' >
                                    <LuImagePlus className='w-6 h-6 text-primary-light-blue' />
                                </label>
                                <input
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    id="for-coverPhoto"
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
                                    imageOf={"brandLogo"}
                                    imageFile={imageFile}
                                    setGetPallets={setGetPallets}
                                    setImage={setImage}
                                />
                            </div>
                            <div>
                                <p>{"Upload your brand logo"}</p>

                                <p className='text-sm'>Supported format: jpeg, png</p>
                            </div>
                        </>
                    ) : (<div className='h-12 w-[70px] relative cursor-pointer'>
                        <NextImage
                            fill
                            className="object-cover absolute"
                            src={coverPhotoMiniPreview}
                            alt=""
                        >
                        </NextImage>
                        <MdCancel onClick={() => {
                            setPalettes([])
                            setCoverPhotoMiniPreview("")
                            const imageOf = "brandLogo"
                            dispatch({
                                [imageOf]: {}
                            })
                            dispatch({
                                headShotRingColor: ""
                            })
                            setGetPallets(false)

                        }} className='text-gray-900/60 w-5 h-5 absolute -top-[10px] -right-[10px] ' />





                    </div>)}

                </div>
                <div className='border-[1px] border-primary-dark-blue2 p-4 text-sm rounded-lg'>

                    <p>Recommended brand logo size is 130 x 60 pixels.</p>



                </div>


            </div>




        </div>
    )
}

export default HeaderImage