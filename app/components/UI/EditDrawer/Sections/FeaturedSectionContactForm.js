import { useGlobalContext } from '@/app/context/context'
import React from 'react'
import EditShadow from '../components/EditShadow'
import EditColor from '../components/EditColor'
import EditText from '../components/EditText'
import EditPadding from '../components/EditPadding'
import EditBorderRadius from '../components/EditBorderRadius'
import EditBorderWidth from '../components/EditBorderWidth'


const FeaturedSectionContactForm = () => {

    const { editFeaturedSectionID } = useGlobalContext()



    return (
        <div>
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Container Shadow:</span>
            </div>
            <EditShadow section={editFeaturedSectionID} field='containerBoxShadow' />

            <div className='flex flex-col items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Container Background:</span>
                <EditColor colorOf="containerBackgroundColor" item={editFeaturedSectionID} />
            </div>
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Container Padding</span>
                <EditPadding section={editFeaturedSectionID} field = "container" direction ='x' defaultValue={10}/>
                <EditPadding section={editFeaturedSectionID} field = "container" direction ='y' defaultValue={10}/>
            </div>

            <EditBorderRadius title='Container Border Radius:' section={editFeaturedSectionID} item='containerBorderRadius' />
            <EditBorderRadius title='Input Border Radius:' section={editFeaturedSectionID} item='inputBorderRadius' />
            <EditBorderRadius title='Input Field Gap:' section={editFeaturedSectionID} item='inputgap' />
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Input Padding</span>
                <EditPadding section={editFeaturedSectionID} field="input" direction='x' defaultValue={10} />
                <EditPadding section={editFeaturedSectionID} field="input" direction='y' defaultValue={4} />
            </div>
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Input Background Color:</span>
                <EditColor colorOf="inputBackgroundColor" item={editFeaturedSectionID} />
            </div>
            {/* <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Input Border Color:</span>
                <EditColor colorOf="inputBorderColor" item={editFeaturedSectionID} />
            </div>
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Input Focus Color:</span>
                <EditColor colorOf="inputFocusColor" item={editFeaturedSectionID} />
            </div> */}
            <EditText title='Input Text:' section={editFeaturedSectionID} item='input' />

            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Button Background Color:</span>
                <EditColor colorOf="buttonBackgroundColor" item={editFeaturedSectionID} />
            </div>

            <EditBorderRadius title='Button Border Radius:' section={editFeaturedSectionID} item='buttonBorderRadius' />

            <EditText title='Button Text:' section={editFeaturedSectionID} item='button' />
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Button Shadow:</span>
            </div>
            <EditShadow section={editFeaturedSectionID} field='buttonBoxShadow' />


        </div>
    )
}

export default FeaturedSectionContactForm
