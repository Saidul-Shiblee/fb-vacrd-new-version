'use client'
import { useGlobalContext } from '@/app/context/context'
import { handleImageFile, handleMusicFile, handlePDFFile, handleVideoFile, mediaType } from '@/utils/fileUtilities'
import Image from 'next/image'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { CiBoxes } from 'react-icons/ci'
import { ImEmbed2 } from 'react-icons/im'
import { LuFrame } from 'react-icons/lu'
import { MdOutlinePermMedia, MdTextFields } from 'react-icons/md'
import { RxButton, RxDragHandleDots1 } from 'react-icons/rx'
import { v4 as uuidv4 } from 'uuid'
import AddProduct from './IndividualItem.js/AddProduct'
import AddText from './IndividualItem.js/AddText'
import AttachMedia from './IndividualItem.js/AttachMedia'
import CustomButton from './IndividualItem.js/CustomButton'
import EmbedCode from './IndividualItem.js/EmbedCode'
import IframeCode from './IndividualItem.js/IframeCode'
import { MdOutlineContactMail } from "react-icons/md";
import ContactForm from './IndividualItem.js/ContactFrom'
const FeaturedSectionContent = React.forwardRef((props, ref) => {
    const { setSections, sectionId, draggableProps, dragHandleProps, name } = props
    const { state, handleChange, dispatch } = useGlobalContext()
    const [sectionItem, setSectionItem] = useState([])
    const [url, setUrl] = useState("")
    const removeSection = () => {
        setSections(pv => {
            let result = pv.filter(el => el.id !== sectionId)
            return result
        })
        dispatch({ removeFeaturedSection: name })
    }
    const setSectionTitle = (e, name) => {
        dispatch({
            setFeaturedSectionTitle: {
                sectionName: name,
                value: e.target.value
            }
        })
    }
    const handleFiles = async (event, id, cb) => {
        if (event.target.name === 'attachMedia') {
            const file = event.target.files && event.target.files[0];
            let type = mediaType(file.type)
            if (file) {
                switch (type) {
                    case 'image':
                        const img = await handleImageFile(file, type, file.type)
                        dispatch({
                            attachMedia: {
                                type: 'image',
                                data: img,
                                id: id,
                                sectionName: name
                            }
                        })
                        break
                    case 'music':
                        const msc = await handleMusicFile(file, type)
                        dispatch({
                            attachMedia: {
                                type: 'music',
                                data: msc,
                                id: id,
                                sectionName: name
                            }
                        })
                        break
                    case 'video':
                        const vdo = await handleVideoFile(file, type)
                        dispatch({
                            attachMedia: {
                                type: 'video',
                                data: vdo,
                                id: id,
                                sectionName: name
                            }
                        })
                        break
                    case 'document':
                        const pdf = await handlePDFFile(file, type)
                        dispatch({
                            attachMedia: {
                                type: 'pdf',
                                data: pdf,
                                id: id,
                                sectionName: name
                            }
                        })
                        break
                    default:
                        alert(
                            'Unsupported file format.\n\nOnly jpeg, png, mp3, mp4, webm and pdf files can be attached.'
                        )
                        break
                }
            }
            if (file) {
                let url = URL.createObjectURL(file)
                setSectionItem(pv => [...pv, {
                    id, item: (provided) => {
                        let element = cb(id, { fileName: file.name, url, itemId: id, setSectionItem, sectionName: name })
                        const clonedElement = React.cloneElement(element, {
                            ...element.props,
                            provided: { ...provided },
                        });
                        return clonedElement
                    }
                }])
            }
            return
        } else {
            setSectionItem(pv => [...pv, {
                id,
                item: (provided) => {
                    let element = cb(id, { itemId: id, setSectionItem, sectionName: name })
                    const clonedElement = React.cloneElement(element, {
                        ...element.props,
                        provided: { ...provided },
                    });
                    return clonedElement
                }
            }])
            dispatch({
                [event.target.name]: {
                    id: id,
                    sectionName: name,
                }
            })
        }
    }
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(sectionItem);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSectionItem(items);
        const featredSectionItemsFromGlobalState = [...state?.featuredSections.filter(el => Object.keys(el)[0] === name)[0][name].sectionItems]
        const [reorderedFeatredSectionItemsForGlobalState] = featredSectionItemsFromGlobalState?.splice(result.source.index, 1)
        featredSectionItemsFromGlobalState?.splice(result.destination.index, 0, reorderedFeatredSectionItemsForGlobalState)
        dispatch({ reOrderFeaturedSectionItems: { items: featredSectionItemsFromGlobalState, sectionName: name } })
    }
    return (
        <div
            ref={ref}
            {...draggableProps}
            className='flex flex-col bg-gray-200 p-2 rounded-lg min-w-[448px]'>
            <div className="flex gap-2 justify-start items-center " >
                <div {...dragHandleProps} className="h-10 w-8 text-5xl"><RxDragHandleDots1 className="h-10 w-8 text-primary-dark-blue2" /></div>
                <div className="flex flex-col grow gap-4 py-2 pl-2 rounded-lg" >
                    <div>
                        <input
                            name='secationTitle'
                            onBlur={(e) => setSectionTitle(e, name)}
                            placeholder='Type text content here'
                            className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12
                        rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />
                    </div>
                </div>
                <div className='flex justify-center items-center w-[36px]'>
                    <button
                        onClick={removeSection}
                        className="text-primary-dark-blue2 text-xl ">
                        X
                    </button>
                </div>
            </div>
            {sectionItem.length > 0 &&
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="SectionItem"  >
                        {(provided) => (
                            <div
                                style={{ minHeight: 'fit-content' }}
                                className='flex flex-col gap-2 p-2 SectionItem' {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    sectionItem.map((el, index) =>
                                        <Draggable key={el.id} draggableId={`${el.id}`} index={index}>
                                            {
                                                (provided) =>
                                                    el.item(provided)
                                            }
                                        </Draggable>
                                    )
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            }
            <div className='flex flex-col gap-2 p-2'>
                <div className='flex justify-center items-center gap-2'>
                    <input
                        name='attachMedia'
                        style={{ display: "none" }}
                        accept="image/jpeg, image/png, audio/mpeg, video/mp4, video/webm, application/pdf"
                        id={`for-attachMedia-${sectionId}`}
                        type="file"
                        onChange={(e) => handleFiles(e, uuidv4(), (id, props) => <AttachMedia key={id} {...props} />)}
                        onClick={(event) => {
                            event.target.value = null;
                        }}
                    />
                    <label
                        htmlFor={`for-attachMedia-${sectionId}`}
                        className='flex flex-col justify-center items-center w-[40%] h-16 bg-primary-light-blue rounded-lg shadow-md'>
                        <MdOutlinePermMedia />
                        Attach Media
                    </label>
                    <button
                        name='text'
                        onClick={(e) => handleFiles(e, uuidv4(), (id, props) => <AddText key={id} {...props} />)}
                        className='flex flex-col justify-center items-center w-[40%] h-16 bg-primary-light-blue rounded-lg shadow-md'>
                        <MdTextFields />
                        Add Text
                    </button>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <button
                        name='product'
                        onClick={(e) => handleFiles(e, uuidv4(), (id, props) => <AddProduct key={id} {...props} />)}
                        className='flex flex-col justify-center items-center w-[40%] h-16 bg-primary-light-blue rounded-lg shadow-md'>
                        <CiBoxes />
                        Add Product
                    </button>
                    <button
                        name='button'
                        onClick={(e) => handleFiles(e, uuidv4(), (id, props) => <CustomButton key={id} {...props} />)}
                        className='flex flex-col justify-center items-center w-[40%] h-16 bg-primary-light-blue rounded-lg shadow-md'>
                        <RxButton />
                        Custom Button
                    </button>
                </div >
                <div className='flex justify-center items-center gap-2'>
                    <button
                        name='iframe'
                        onClick={(e) => handleFiles(e, uuidv4(), (id, props) => <IframeCode key={id} {...props} />)}
                        className='flex flex-col justify-center items-center w-[40%] h-16 bg-primary-light-blue rounded-lg shadow-md'>
                        <LuFrame />
                        Iframe Code
                    </button>
                    <button
                        name='code'
                        onClick={(e) => handleFiles(e, uuidv4(), (id, props) => <EmbedCode key={id} {...props} />)}
                        className='flex flex-col justify-center items-center w-[40%] h-16 bg-primary-light-blue rounded-lg shadow-md'>
                        <ImEmbed2 />
                        Map Embed Code
                    </button>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <button
                        name='contact'
                        onClick={(e) => handleFiles(e, uuidv4(), (id, props) => <ContactForm key={id} {...props} />)}
                        className='flex flex-col justify-center items-center w-[40%] h-16 bg-primary-light-blue rounded-lg shadow-md'>
                        <MdOutlineContactMail />
                        Add Contact Form
                    </button>
                </div>
            </div>
            {url && <div className='relative w-48 h-48'>
                <Image fill className='object-cover rounded-lg' src={url} alt="productImage " >
                </Image>
            </div>}
        </div>
    )
})
export default FeaturedSectionContent
