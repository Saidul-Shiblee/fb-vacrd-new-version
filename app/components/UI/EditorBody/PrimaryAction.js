'use client'

import React, { useEffect, useState } from "react";
import PrimaryActions from "@/utils/primaryAction";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RxDragHandleDots1 } from 'react-icons/rx'
import { useGlobalContext } from "@/app/context/context";

import IconComponent from "@/utils/svgIcon";


const IndividualAction =(props) => {

    const { dispatch } = useGlobalContext()
    const { selectedAction, selectedActions, setSelectedActions, setActions,name,icon } = props


    const handleSelection = () => {
        let isExist = false
        selectedActions.map(el => {
            if (selectedAction.id === el.id) {
                isExist = true
                return
            }
        })
        if (isExist) return

        dispatch({
            primaryActions:{
                ...selectedAction
            }
        })
        setSelectedActions(pv => [...pv, selectedAction])
        setActions(pv => pv.filter(el => el.id !== selectedAction.id))
    }
    return <div
        onClick={handleSelection}
        className='w-[50px] h-[50px] rounded-full bg-primary-dark-blue2 shadow-sm border-[1px] border-primary-dark-blue2 flex justify-center items-center text-black'>

        <IconComponent icon={icon} style={{ fill: '#ffffff' ,width:'30px',height:'30px'}} />
    </div>

}

const PrimaryAction = () => {
    const [actions, setActions] = useState(PrimaryActions)
    const [selectedActions, setSelectedActions] = useState([])
    const [minHeight, setMinHeight] = useState('0px')
    const { dispatch } = useGlobalContext()



    useEffect(() => {
        let gap
        selectedActions.length > 1 ? gap = 24 * (selectedActions.length - 1) : gap = 0
        let height = 16 + gap + (48 * selectedActions.length)
        setMinHeight(height + 'px')
    }, [selectedActions.length])

    const searchHandler = event => {
        let SearchQuery = event.target.value.toLowerCase()
        const filteredArray = PrimaryActions.filter(el => !selectedActions.some(el1 => el.name === el1.name));
        let result = filteredArray.filter(el => {
                let searchValue = el.name.toLowerCase();
                return searchValue.indexOf(SearchQuery) !== -1;
            });
        setActions(result);
    };

    function handleOnDragEnd(result) {

        if (!result.destination) return;
        const items = Array.from(selectedActions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSelectedActions(items);
    }

    const handleRemove = (el) => {
        setSelectedActions(pv => pv.filter(item => item.id !== el.id))
        setActions(pv => {
           let newPv=[...pv]
            newPv.splice(el.id-1,0,el)
            return newPv
        })

        dispatch({
            removePrimaryAction:{
                id:el.id
            }
        })
    }

    const changeText=(e,el)=>{
        dispatch({
            changePrimaryActionText: {
                id: el.id,
                value:e.target.value
            }
        })
    }

    return (
        <div className="flex flex-col gap-4 ">
            <h2 className='text-2xl font-semibold text-primary-dark-blue2'>
                Primary actions
            </h2>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="actions">
                    {(provided) => (
                        <div style={{
                            minHeight: minHeight
                        }} className={`flex flex-col gap-6  px-4 py-2 `} {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                selectedActions.length > 0 && selectedActions.map((el, index) => {
                                    return (
                                        <Draggable key={el.id} draggableId={el.name} index={index}>
                                            {(provided) => (
                                                <>
                                                    <div className="flex gap-2 justify-start items-center " ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <RxDragHandleDots1 className="h-10 w-8 text-primary-dark-blue2" />
                                                        <div className=" grow" >
                                                            <input
                                                            onBlur={(e)=>changeText(e,el)}
                                                            placeholder={el.placeholder}
                                                            className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600
                                                                       p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px]
                                                                       focus:outline-none" />
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemove(el)}
                                                            className="text-primary-dark-blue2">
                                                            X
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </Draggable>
                                    )
                                }
                                )
                            }

                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <input
                placeholder="Search an action"
                type="text" className="w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" onChange={searchHandler} />
            <div className='flex gap-6 justify-center items-center flex-wrap px-2'>
                {actions.map(el => {
                    return (
                        <div
                        key={el.id}
                        className="relative group "
                        >
                        <IndividualAction
                            key={el.id}
                            name={el.name}
                            icon={el.icon}
                            selectedAction={el}
                            setSelectedActions={setSelectedActions}
                            selectedActions={selectedActions}
                            setActions={setActions}
                        />
                            <div className="px-2 py-1  capitalize justify-center items-center bg-black text-white text-sm hidden opacity-0 group-hover:flex group-hover:opacity-100 transition-all duration-100 ease-in-out rounded-xl absolute -top-6 -translate-x-1/2 left-1/2">{el.name}</div>
                        </div>
                    );
                })}
            </div>



        </div>
    );
};

export default PrimaryAction;



