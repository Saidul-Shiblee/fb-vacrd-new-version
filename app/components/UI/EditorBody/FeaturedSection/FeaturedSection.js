'use client'
import { useGlobalContext } from '@/app/context/context'
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import FeaturedSectionContent from './FeaturedSectionContent'
import { BiPlus } from 'react-icons/bi'
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
const FSection = () => {
    const [sections, setSections] = useState([])
    const { state, handleChange, dispatch } = useGlobalContext()
    const handleSections = () => {
        let id = uuidv4()
        dispatch({
            featuredSections: {
                [`featuredsection${id}`]: {
                    sectionTitle: "",
                    sectionItems: []
                }
            }
        })
        setSections(pv => [...pv,
        {
            name: "featuredsection" + id,
            id: id,
            section: (key, ref, draggableProps, dragHandleProps) => {
                return <FeaturedSectionContent
                    name={"featuredsection" + id}
                    key={key}
                    sectionId={id}
                    setSections={setSections}
                    ref={ref}
                    draggableProps={draggableProps}
                    dragHandleProps={dragHandleProps}
                />
            }
        }
        ])
    }
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSections(items);
        //
        const featredSectionsFromGlobalState = [...state?.featuredSections]
        const [reorderedFeatredSectionsForGlobalState] = featredSectionsFromGlobalState?.splice(result.source.index, 1)
        featredSectionsFromGlobalState?.splice(result.destination.index, 0, reorderedFeatredSectionsForGlobalState)
        dispatch({ reOrderFeaturedSections: featredSectionsFromGlobalState })
    }
    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold text-primary-dark-blue2'>
                Featured Section
            </h2>
            {sections.length > 0 ? <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="featuredSection" >
                    {(provided) => (
                        <div style={{ minHeight: 'fit-content' }} className='flex flex-col gap-2 pl-4' {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                sections?.map((el, index) =>
                                    <Draggable key={el.id} draggableId={el.name} index={index}>
                                        {
                                            (provided) =>
                                                el.section(el.id, provided.innerRef, { ...provided.draggableProps }, { ...provided.dragHandleProps })
                                        }
                                    </Draggable>
                                )
                            }
                            {provided.placeholder}
                        </div>
                    )
                    }
                </Droppable>
            </DragDropContext> : null}
            <div className='flex justify-start items-center gap-4 pl-4'>
                <button
                    onClick={handleSections}
                    className='w-10 h-10 rounded-full flex justify-center bg-primary-dark-blue2 text-white text-5xl  items-center'>
                    <BiPlus className='w-8 h-8' />
                </button>
                <div>
                    <p className=''>Add Section</p>
                </div>
            </div>
        </div>
    )
}
FSection.displayName = 'FSection'
export default FSection
