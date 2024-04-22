import { useGlobalContext } from '@/app/context/context'
import React from 'react'
import EditShadow from '../components/EditShadow'
import EditColor from '../components/EditColor'
import EditText from '../components/EditText'
import EditBorderRadius from '../components/EditBorderRadius'


const FeaturedSectionButton = () => {

    const { editFeaturedSectionID } = useGlobalContext()



    return (
        <div>
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Button Color:</span>
            </div>
            <EditShadow section={editFeaturedSectionID} />
            <EditText title='Text:' section={editFeaturedSectionID} item='' />
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Button Background Color:</span>
                <EditColor colorOf="buttonBackgroundColor" item={editFeaturedSectionID} />
            </div>

            <EditBorderRadius title='Button Border Radius:' section={editFeaturedSectionID} item='buttonBorderRadius' />


        </div>
    )
}

export default FeaturedSectionButton

