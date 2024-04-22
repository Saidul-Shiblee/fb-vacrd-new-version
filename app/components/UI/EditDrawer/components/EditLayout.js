
'use client'
import { useGlobalContext } from '@/app/context/context'
import React from 'react'
import { CiImageOn } from "react-icons/ci";

const EditLayout = ({ section, field =undefined }) => {
    const { state, dispatch } = useGlobalContext()
    const layouts = [1, 2]

    const HandleLayout = (value) => {
        dispatch({
            ChangeColorOrText: {
                field: field ? field: `layoutOrder`,
                item: section,
                value: value,
            },
        });

    }
    const fieldName = field ? state[section]?.[field] : state[section]?.layoutOrder


    return (<div className={`w-full  flex justify-between items-center mt-6`}>
        {layouts.map((el, index) =>
            <div
                key={el}
                onClick={() => HandleLayout(el)}
                className={` p-1 flex justify-center items-center rounded-xl ${fieldName ? fieldName == el && ' border border-orange-500' : index === 0 && ' border border-orange-500'}`}>
                <div className={`flex w-40 h-[100px] p-4`}>
                    <div className={`${index === 0 ? 'w-[60%] bg-slate-400' :'w-[40%] bg-slate-200' } flex justify-center items-center`}>
                        {index === 0 &&  <CiImageOn className='w-14 h-14' />}
                        {index === 1 &&  <p>
                            -----<br/>
                            -----<br />
                            -----<br />
                        </p>}

                    </div>
                    <div className={`${index !== 0 ? 'w-[60%] bg-slate-400' : 'w-[40%] bg-slate-200'} flex justify-center items-center`}>

                        {index === 1 && <CiImageOn className='w-14 h-14' />}
                        {index === 0 && <p>
                            -----<br />
                            -----<br />
                            -----<br />
                        </p>}

                    </div>
                </div>
            </div>

        )}
    </div >)


}

export default EditLayout