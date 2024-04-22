import React from 'react'
import EditColor from '../components/EditColor'
import { useGlobalContext } from '@/app/context/context'
import EditText from '../components/EditText'
import EditShadow from '../components/EditShadow'

const FeaturedSectionText = () => {

    const { editFeaturedSectionID } = useGlobalContext()
    return (
        <>
            <EditShadow section={editFeaturedSectionID} />
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Container Background Color:</span>
                <EditColor colorOf="backGroundColor" item={editFeaturedSectionID }/>
            </div>
            <EditText title='Text:' section={editFeaturedSectionID} item='' />


            </>
    )
}

export default FeaturedSectionText