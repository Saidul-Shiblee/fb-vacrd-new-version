import { useGlobalContext } from '@/app/context/context'
import React from 'react'
import EditShadow from '../components/EditShadow'
import EditColor from '../components/EditColor'
import EditText from '../components/EditText'


const FeaturedSectionPDF = () => {

    const { editFeaturedSectionID } = useGlobalContext()



    return (
        <div>
            <EditShadow section={editFeaturedSectionID} />
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Container Background Color:</span>
                <EditColor colorOf="backGroundColor" item={editFeaturedSectionID }/>
            </div>
            <EditText title='Text:' section={editFeaturedSectionID} item='' />
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Button Background Color:</span>
                <EditColor colorOf="buttonBackgroundColor" item={editFeaturedSectionID} />
            </div>
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Button Color:</span>
                <EditColor colorOf="buttonColor" item={editFeaturedSectionID} />
            </div>
        </div>
    )
}

export default FeaturedSectionPDF

