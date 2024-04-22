import React from 'react'
import EditShadow from '../components/EditShadow'
import EditColor from '../components/EditColor'
import EditText from '../components/EditText'


export const About = () => {
    return (
        <div>
            <EditShadow section='aboutStyle' />
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Background Color:</span>
                <EditColor colorOf="background" item='aboutStyle' />
            </div>

            <EditText title='About:' section='aboutStyle' item='about' />

        </div>
    )
}
