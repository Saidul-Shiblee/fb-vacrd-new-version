'use client '
import { useGlobalContext } from '@/app/context/context'
import React,{useState} from 'react'


const Hosting = () => {
    const [url,setUrl]=useState("")
    const {state,dispatch}=useGlobalContext()

  return (
      <div className='flex flex-col justify-center items-start gap-4 max-w-[448px]'>
          <h2 className='text-2xl font-semibold text-primary-dark-blue2'>
              Business or hosting URL
          </h2>


          <div className='pl-4 flex flex-col gap-4'>
              <input
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
                  onBlur={() => dispatch({
                      hostedUrl : url,

                  })}
                  placeholder="www.yourdomain.com" className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-primary-dark-blue2 focus:border-[1px] border-[1px] focus:outline-none" />

              <p className='p-4 border-primary-dark-blue2 border-[1px] border-dotted rounded-lg'>
                  Paste your hosting URL or business URL here.
              </p>
          </div>
          </div>
  )
}

export default Hosting



// footer text link text url




// return (
//     <div className='flex flex-col justify-center items-start gap-4 max-w-[448px]'>
//         <h2 className='text-2xl font-semibold text-primary-dark-blue2'>
//             Hosting
//         </h2>


//         <div className='pl-4 flex flex-col gap-4'>
//             <h3 className='text-lg font-semibold text-primary-dark-blue2'>
//                 Hosted card URL
//             </h3>
//             <input
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 onBlur={() => dispatch({
//                     hostedUrl: url,

//                 })}
//                 placeholder="Paste your tracking code here" className="min-w-[446px] border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  p-4 h-12 rounded-xl focus:border-[#ff544b] focus:border-[1px] border-[1px] focus:outline-none" />

//             <p className='p-4 border-[#ff544b] border-[1px] border-dotted rounded-lg'>
//                 Only paste your hosting URL if you've already decided where you want to host this digital business card. If you haven't decided yet, please skip this step.
//             </p>
//         </div>
//     </div>
// )

