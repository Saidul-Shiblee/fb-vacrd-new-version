'use client'
import { useGlobalContext } from '@/app/context/context'
import { saveAs } from 'file-saver'
import { useRef } from 'react'
import FontFaces from '../../../../utils/fontConst'
import Analytics from './Analytics'
import CustomizeFavIcon from './CustomizeFavIcon'
import CustomizeFooter from './CustomizeFooter'
import CustomizeMetaData from './CustomizeMetaData'
import CustomizeVisibility from './CustomizeVisibility'
import Download from './Download'
import FeaturedSection from './FeaturedSection/FeaturedSection'
import GenerateKeys from './GenerateKeys'
import HeaderImage from './HeaderImage'
import Hosting from './Hosting'
import PersonalInfo from './PersonalInfo'
import PrimaryAction from './PrimaryAction'
import ProductNameGenerator from './ProductNameGenerator'
import SecondaryAction from './SecondaryAction'
import VCardInfo from './VCardInfo'
const EditorBody = () => {
  const preRef = useRef(null);
  const { dispatch, state } = useGlobalContext();
  async function handlevcf() {
    let blob = new Blob([preRef.current.innerText], {
      type: "text/plain"
    });
    saveAs(window.URL.createObjectURL(blob), `untitled.vcf`);
  }
  const handleChange = (e) => {
    const value = JSON.parse(e.target.value)
    dispatch({
      selectedFont: value
    });
  }
  return (
    <div className='flex flex-col gap-16 '>
      <HeaderImage />
      <VCardInfo />
      <PersonalInfo />
      <Hosting />
      <PrimaryAction />
      <SecondaryAction />
      <ProductNameGenerator />
      <FeaturedSection />
      {/* <div className='flex flex-col justify-center items-start gap-4'>
        <h2 className='text-2xl font-semibold text-[#FF534B] '>
          Choose your font
        </h2>
        <select className="select w-full border-gray-300 bg-primary-light-blue text-gray-900 placeholder-gray-600  px-4 h-12 rounded-xl focus:border-[#ff544b] focus:border-[1px] border-[1px] focus:outline-none" value={JSON.stringify(state.selectedFont)} onChange={handleChange}>
          {FontFaces.map((el, ind) => {
            return <option key={ind} className={`font-${el.cls}`} value={JSON.stringify(el)}>{el.fontFace}</option>
          })}
        </select>

      </div> */}
      <input className=' font-poppins font-roboto font-roboto font-inter font-dsd font-ds font-noto' hidden ></input>
      <GenerateKeys />
      <CustomizeFooter />
      <CustomizeFavIcon />
      <CustomizeMetaData />
      <CustomizeVisibility />
      {/* <CustomizeColor/> */}
      <Analytics />
      <Download />

    </div>
  )
}
export default EditorBody