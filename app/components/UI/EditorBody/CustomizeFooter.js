'use client '
import React,{useEffect, useState} from 'react'
import Toggle from '../../toggleButton';
import { useGlobalContext } from '@/app/context/context';

const CustomizeFooter = () => {
    const {dispatch } = useGlobalContext()
    const [toggle, setToggle] = useState(false);
    const [firstRender, setFirstRender] = useState(false);


    useEffect(()=>{
        if(firstRender){
        dispatch({toggleItem:{
            itemName:'footer',
            fields:{
                footerText: "",
                footerLinkText: "",
                footerURL: "",
            }
        }})

    }
    },[toggle])

    const handleTextChange=(e)=>{
        dispatch({
            ChangeColorOrText: {
                field: e.target.name,
                item: 'footer',
                value: e.target.value,
            },
        })
    }
    useEffect(()=>setFirstRender(true),[])
  return (
      <div className='flex flex-col justify-center items-start gap-4'>
          <h2 className='text-2xl font-semibold text-primary-dark-blue2'>
              Customize the footer credit?
          </h2>


          <div className='pl-4 flex flex-col gap-8'>
              <div className='flex items-center gap-4'>
                  <Toggle toggle={toggle} setToggle={setToggle} />
                  <p className=''>{toggle ? "Yes I want to customize the footer credit" : "No,Thanks"}</p>
              </div>

              {toggle &&<>
              <div>
                  <input
                          onBlur={(e)=>handleTextChange(e)}
                  name='footerText'
                  placeholder="Footer text"
                  className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900
                   placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2
                   focus:border-[1px] border-[1px] focus:outline-none" />
              </div>
              <div>
                  <input
                          onBlur={(e) => handleTextChange(e)}
                  name='footerLinkText'
                  placeholder="Link text"
                  className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900
                   placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2
                   focus:border-[1px] border-[1px] focus:outline-none" />
              </div>
              <div>
                  <input
                          onBlur={(e) => handleTextChange(e)}
                  name='footerURL'
                  placeholder="URL"
                  className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900
                   placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2
                   focus:border-[1px] border-[1px] focus:outline-none" />
              </div>

              </>}
          </div>
          </div>
  )
}

export default CustomizeFooter



// footer text link text url