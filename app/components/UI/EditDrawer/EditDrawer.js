'use client'

import { useGlobalContext } from '@/app/context/context'
import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import Header from './Sections/Header';
import Body from './Sections/Body';
import { MainSections } from './Sections/MainSections';
import Icon from './Sections/Icon';
import { PrimaryActions } from './Sections/PrimaryAction';
import { SecondaryActions } from './Sections/SecondaryAction';
import { About } from './Sections/About';
import { Address } from './Sections/Address';
import FeaturedSectionTitle from './Sections/FeaturedSectionTitle';
import FeaturedSectionImage from './Sections/FeaturedSectionImage';
import FeaturedSectionText from './Sections/FeaturedSectionText';
import FeaturedSectionPDF from './Sections/FeaturedSectionPDF';
import FeaturedSectionProduct from './Sections/FeaturedSectionProduct';
import FeaturedSectionButton from './Sections/FeaturedSectionButton';

import FeaturedSectionContactForm from './Sections/FeaturedSectionContactForm';
import BrandImage from './Sections/BrandImage';



const EditDrawer = () => {

  const { drawerOpen, setDrawerOpen, editSection, state, editSectionType, setEditSectionType, editFeaturedSectionID, setEditFeaturedSectionID, editFeaturedSectionPosition, setEditFeaturedSectionPosition, editSectionItemID, setEditDectionItemID, editSectionItemPosition, setEditSectionItemPosition } = useGlobalContext()


  console.log(state)

  return (
      <div className={`w-[35%] h-screen top-0 left-0 flex flex-col duration-300 ease-in-out bg-slate-50 shadow-lg overflow-y-auto   fixed ${drawerOpen ? "translate-x-0" :"-translate-x-full"} z-[99999] `} >

        <div className='p-2 flex flex-col'>
          <IoMdCloseCircleOutline onClick={()=>setDrawerOpen(false)} className='self-end w-8 h-8 text-gray-600 cursor-pointer' />
        <h3 className="font-bold text-lg text-gray-500">Edit {editSection} Component</h3>
        {editSection==='Header' && <Header/>}
        {editSection === 'Body' && <Body/>}
        {editSection === 'Contact Info' && <MainSections/>}

        {editSection === 'Icon' && <Icon/>}
        {editSection === 'Primary Action' && <PrimaryActions/>}
        {editSection === 'Secondary Action' && <SecondaryActions />}
        {editSection === 'Address' && <Address />}
        {editSection === 'About' && <About />}
        {editSection === 'Featured Section' && editSectionType==="Title" && <FeaturedSectionTitle />}
        {editSection === 'Featured Section' && editSectionType === "image" && <FeaturedSectionImage />}
        {editSection === 'Featured Section' && editSectionType === "text" && <FeaturedSectionText />}
        {editSection === 'Featured Section' && editSectionType === "pdf" && <FeaturedSectionPDF />}
        {editSection === 'Featured Section' && editSectionType === "product" && <FeaturedSectionProduct />}
        {editSection === 'Featured Section' && editSectionType === "button" && <FeaturedSectionButton />}
        {editSection === 'Featured Section' && editSectionType === "contact" && <FeaturedSectionContactForm />}
        {editSection === 'brandimage'  && <BrandImage />}
        </div>
      </div>
  )
}

export default EditDrawer