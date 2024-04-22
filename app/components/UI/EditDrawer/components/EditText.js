'use client'
import { useGlobalContext } from '@/app/context/context'
import React from 'react'
import EditColor from './EditColor'
import FontFaces from '@/utils/fontConst'


const EditText = ({ title, section, item }) => {

    const { state, dispatch } = useGlobalContext()

    const handleFont = (e) => {
        const value = JSON.parse(e.target.value)


        dispatch({
            ChangeColorOrText: {
                field: `${item}Font`,
                item: section,
                value: value,
            },
        });

    }
    const handleFontSize = (e) => {
        const value = e.target.value


        dispatch({
            ChangeColorOrText: {
                field: `${item}FontSize`,
                item: section,
                value: value,
            },
        });

    }
    const handleFontWeight = (e) => {
        const value = e.target.value


        dispatch({
            ChangeColorOrText: {
                field: `${item}FontWeight`,
                item: section,
                value: value,
            },
        });

    }
    const handleFontStyle = (e) => {
        const value = e.target.value


        dispatch({
            ChangeColorOrText: {
                field: `${item}FontStyle`,
                item: section,
                value: value,
            },
        });

    }


    return (
        <>
            <div className='flex flex-col  gap-2 w-full relative mt-6'>
                <p className='inline-block text-gray-400'>{title}</p>
                <div className='flex w-full justify-between'>

                    <div className='flex flex-col justify-start items-start'>
                        <p className="text-xs">Color:</p>
                        <div className=' relative '>
                            <EditColor title='Color:' colorOf={`${item}Color`} item={section} />
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <p className="text-xs">Font:</p>

                        <select className=" w-28 border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  px-4 !h-10 rounded-xl focus:border-[#ff544b] focus:border-[1px] border-[1px] focus:outline-none text-xs"
                        value={JSON.stringify(state?.[section]?.[`${item}Font`])} onChange={handleFont}>

                            {FontFaces.map((el, ind) => {
                                return <option key={ind} className={`font-${el.cls} text-xs`} value={JSON.stringify(el)}>{el.fontFace}</option>
                            })}
                        </select>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <p className="text-xs">Size:</p>
                        <select className=" w-fit border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  px-4 !h-10 rounded-xl focus:border-[#ff544b] focus:border-[1px] border-[1px] focus:outline-none text-xs" value={state?.[section]?.[`${item}FontSize`]} onChange={handleFontSize}>
                            {[16, 18, 20, 22, 24, 28, 30, 32].map((el, ind) => {
                                return <option key={ind} className={`text-xs`} value={el.toString()}>{el}</option>
                            })}
                        </select>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <p className="text-xs">Weight:</p>
                        <select className=" w-fit border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  px-4 !h-10 rounded-xl focus:border-[#ff544b] focus:border-[1px] border-[1px] focus:outline-none text-xs" value={state?.[section]?.[`${item}FontWeight`]} onChange={handleFontWeight}>
                            {[400, 500, 600, 700].map((el, ind) => {
                                return <option key={ind} className={`text-xs`} value={el.toString()}>{el}</option>
                            })}
                        </select>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <p className="text-xs">Font Style :</p>

                        <select className=" w-fit border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  px-4 !h-10 rounded-xl focus:border-[#ff544b] focus:border-[1px] border-[1px] focus:outline-none text-xs" value={state?.[section]?.[`${item}FontStyle`]} onChange={handleFontStyle}>
                            {['normal', 'italic'].map((el, ind) => {
                                return <option  key={ind} className={`text-xs capitalize`} value={el}>{el}</option>
                            })}
                        </select>
                    </div>


                </div>

            </div>


        </>

    )
}

export default EditText