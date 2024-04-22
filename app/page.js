'use client'
import { useEffect, useState } from 'react'
import ReactLogo from './assets/icons/ellipsis.svg'
import { useGlobalContext } from './context/context'
import Preview from './components/Preview'
import EditorBody from './components/UI/EditorBody/EditorBody'
import EditorHeader from './components/UI/EditorHeader'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


const Page = () => {

  const [isBrowser, setIsBrowser] = useState(false)
  const { state }=useGlobalContext()
  const preViewURL = "yoursite/vcard/"+state?.personalInfo?.firstName+"/"
  useEffect(() => setIsBrowser(true), [])


  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    }
  })

  if (!isBrowser) return null




  return (

      <div className="bg-primary-light-blue/50 w-full">
        <div
          style={{ maxWidth: "960px" }}
          className=" container   mx-auto      text-black relative">
    <div className='flex flex-col relative'>
        <EditorHeader/>
        <div className='md:grid md:grid-cols-2 '>

          <EditorBody />
          < div
            style={{ marginLeft: '20px' }}
            id="preview-container"
            class="relative w-full  sm:mt-0 hidden md:block"
          >
            <div

              id="preview"
              class="flex flex-col items-center justify-center sm:sticky sm:top-0 "
            >
              <div id="device" style={{ borderRadius: "1rem",width: "100%",minHeight:'500px'}} class="bg-primary-dark-blue2 rounded sm:mt-10 drop-shadow-2xl">
                <h2 class="text-center py-4 font-extrabold text-primary-light-blue  fon font-new_sds">
                 live preview
                </h2>
                <div id="browserFrame" class="overflow-y-scroll flex flex-col rounded-b-2xl max-h-[calc(100vh_-_100px)] no-scrollbar">
                  <div
                    id="topBar"
                      class="topbar border-r-4 border-l-4 border-primary-dark-blue2/40  bg-primary-dark-blue2/40  z-10"
                  >
                    <div id="searchField" class="p-2 flex items-center">
                      <input
                        value={preViewURL}
                        type="text"
                          class="pl-4 h-12 w-full border-gray-300 bg-primary-light-blue text-primary-dark-blue2 rounded "
                        aria-label="vCard URL"
                        disabled
                        tabindex="-1"
                      />
                      <div className="w-6 ml-2">
                        <ReactLogo />
                      </div>

                    </div>
                  </div>
                  <Preview
                  />
                </div>
              </div>
            </div>
          </div >

        </div>





    </div>

        </div>
      </div>



  )
}

export default Page


