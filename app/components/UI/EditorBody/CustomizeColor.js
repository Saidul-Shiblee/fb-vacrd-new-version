'use client '
import React,{useState} from 'react'
import ColorPicker from '../../ColorPicker'
import { useGlobalContext } from '@/app/context/context'


const CustomizeColor = () => {

  const {state}=useGlobalContext()

  const [featuredContent, setFeaturedContent]=useState(false)
  const [header, setHeader]=useState(false)
  const [body, setBody]=useState(false)
  const [button, setButton]=useState(false)
   
  return (
      <div className='flex flex-col justify-center items-start gap-4'>
          <h2 className='text-2xl font-semibold text-[#FF534B]'>
              Customize Color?
          </h2>
          

          <div className='pl-4 flex flex-col gap-8'>
        <div className='flex justify-start items-center gap-4 cursor-pointer relative'>
          <div
          
            style={{ backgroundColor: state.color.headerBackground}}
          className={`w-16 h-16 z-10 rounded-full   drop-shadow-sm`}  onClick={() => setHeader(!header)}>
           
          </div>
          {header ? <ColorPicker colorOf="headerBackground" setOpen={setHeader} /> : null}
          <div>Header background</div>
              </div>
        <div className='flex justify-start items-center gap-4 cursor-pointer relative'>
          <div
            style={{ backgroundColor: state.color.bodyBackground }}
          className={`w-16 h-16 z-10 rounded-full  drop-shadow-sm`} onClick={() => setBody(!body)}>
            
          </div>
          {body ? <ColorPicker colorOf="bodyBackground" setOpen={setBody} /> : null}
          <div>Body background</div>
        </div>
        <div className='flex justify-start items-center gap-4 cursor-pointer relative'>
          <div 
            style={{ backgroundColor: state.color.buttonBackground }}
          className={`w-16 h-16 z-10 rounded-full   drop-shadow-sm`} onClick={() => setButton(!button)}>
           
          </div>
          {button ? <ColorPicker colorOf="buttonBackground" setOpen={setButton} /> : null}
          <div>Button background</div>
        </div>
        <div className='flex justify-start items-center gap-4 cursor-pointer relative'>
          <div 
            style={{ backgroundColor: state.color.featuredContentBackground }}
          className={`w-16 h-16 z-10 rounded-full drop-shadow-sm`} onClick={() => setFeaturedContent(!featuredContent)}>
           
          </div>
          {featuredContent ? <ColorPicker colorOf="featuredContentBackground" setOpen={setFeaturedContent} /> : null}
          <div className='relative'>
            Featured Content background
            </div>
        </div>
              
          </div>

    </div>
  )
}

export default CustomizeColor



// footer text link text url