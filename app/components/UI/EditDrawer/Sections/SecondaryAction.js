import React from 'react'
import EditShadow from '../components/EditShadow'
import EditColor from '../components/EditColor'


export const SecondaryActions = () => {
    return (
        <div>
            <EditShadow section='secondaryActionStyle' />
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Background Color:</span>
                <EditColor colorOf="background" item='secondaryActionStyle' />
            </div>


        </div>
    )
}
