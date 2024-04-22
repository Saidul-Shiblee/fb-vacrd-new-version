import { useGlobalContext } from '@/app/context/context'
import React from 'react'
import EditBorderRadius from '../components/EditBorderRadius'
import EditShadow from '../components/EditShadow'
import EditOpacity from '../components/EditOpacity'
import EditColor from '../components/EditColor'
import EditText from '../components/EditText'
import EditLayout from '../components/EditLayout'


const FeaturedSectionProduct = () => {

    const {editFeaturedSectionID} = useGlobalContext()



  return (
      <div>
              <EditBorderRadius title='Container Border Radius:' section={editFeaturedSectionID} item='containerBorderRadius' />

          <div className='flex flex-col  items-start  relative mt-6'>
              <span className='inline-block text-gray-400'>Container Shadow:</span>
              <EditShadow section={editFeaturedSectionID} field='containerBoxShadow' />
          </div>
          <div className='flex  items-center gap-6 relative mt-6'>
              <span className='inline-block text-gray-400'>Container background:</span>
              <EditColor colorOf="containerBackgroundColor" item={editFeaturedSectionID} />
          </div>

        <EditBorderRadius title='Image Border Radius:' section={editFeaturedSectionID} item='imageBorderRadius' />

          <div className='flex flex-col  items-start  relative mt-6'>
              <span className='inline-block text-gray-400'>Image Shadow:</span>
              <EditShadow section={editFeaturedSectionID} field='imageBoxShadow' />
          </div>

          <EditOpacity title='Image Opacity' section={editFeaturedSectionID} item='imageOpacity' />

          <EditText title='Product Heading:' section={editFeaturedSectionID} item='producHeading' />
          <EditText title='Product Description:' section={editFeaturedSectionID} item='productDescription' />
          <EditText title='Product Price:' section={editFeaturedSectionID} item='productPrice' />
          <div className='flex  items-center gap-6 relative mt-6'>
              <span className='inline-block text-gray-400'>Button Color:</span>
              <EditColor colorOf="button" item={editFeaturedSectionID} />
          </div>
          <EditBorderRadius title='Button Border Radius:' section={editFeaturedSectionID} item='buttonBorderRadius' />
          <EditText title='Button Text:' section={editFeaturedSectionID} item='buttonText' />
          <div className='flex  items-center gap-6 relative mt-6'>
              <span className='inline-block text-gray-400'>Section Layout:</span>
          <EditLayout section={editFeaturedSectionID} />
          </div>

      </div>
  )
}

export default FeaturedSectionProduct

