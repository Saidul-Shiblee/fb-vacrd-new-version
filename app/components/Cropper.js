import { useGlobalContext } from "@/app/context/context";
import { resizeImage } from "@/utils/fileUtilities";
import { forwardRef, useEffect, useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
export const ImageCropper = forwardRef(({ image,setImage,setCoverPhotoMiniPreview, imageOf,imageFile,setGetPallets=undefined}, ref)=>{
      const fileName=imageFile?.name
      const mimeType=imageFile?.type
      const ext = fileName?.split('.').pop();
      const cropperRef = useRef("");
      const { dispatch } = useGlobalContext()
    const handleRotate=(direction)=>{
        const cropper = cropperRef.current;
        const degree = direction==='right'?5:-5
        if (cropper) {
            cropper.rotateImage(degree)
        }
    }
    const getCropData = () => {
            if (typeof cropperRef.current?.cropper !== "undefined") {
                const canvas = cropperRef.current?.cropper.getCroppedCanvas()
                const url = canvas.toDataURL(mimeType)
                setCoverPhotoMiniPreview(url)
                canvas.toBlob(
                    async (b) => {
                        let blob = new File([b], fileName, {
                            type: mimeType,
                        })
                        let resizedImage = await resizeImage(blob, imageOf, mimeType)
                        dispatch({
                            [imageOf]: {
                                url: url,
                                blob: blob,
                                ext: ext,
                                mime: mimeType,
                                resized: resizedImage
                            }
                        })
                        cropperRef.current.cropper.clear();
                        cropperRef.current.cropper.reset()
                    },
                    mimeType,
                    0.8
                )
            }
    };
    const handleClose=()=>{
        const cropper = cropperRef.current.cropper;
        // Reset Cropper state
        if (cropper) {
            cropperRef.current.cropper.clear();
            cropperRef.current.cropper.reset()
        }
        ref.current.close()
        setCoverPhotoMiniPreview("")
    }
    return (
        <>
            <dialog key={imageOf} ref={ref} id="cropper_modal" className="modal ">
            <div className="border-8 border-primary-dark-blue2 rounded-lg ">
                <div className="flex justify-center items-center" >
                    <Cropper
                        ref={cropperRef}
                        style={{ height: '300px', width: '450px' }}
                        zoomable={false}
                        scalable={true}
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={true}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={true}
                    />
                </div>
                <div className="h-16 p-4 bg-primary-dark-blue2 flex justify-center items-center gap-4  text-base">
                    <button className="py-2 px-4 bg-primary-dark-blue2 shadow-md rounded-lg flex justify-center items-center text-white border-[1px] border-white" onClick={
                        handleClose}>
                        Cancel
                    </button>
                    {image && (
                        <button className="py-2 px-4 border-[1px] border-white bg-white shadow-md rounded-lg flex justify-center items-center text-primary-dark-blue2" onClick={
                          ()=>  {
                            setGetPallets&& setGetPallets(true)
                            getCropData()
                        }
                        }
                            >
                            Crop
                        </button>
                    )}

                </div>
            </div>
        </dialog>
        </>
    );
})
