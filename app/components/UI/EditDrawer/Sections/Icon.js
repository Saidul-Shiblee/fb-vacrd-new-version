import React from 'react'
import EditColor from '../components/EditColor'
import { useGlobalContext } from '@/app/context/context'
const Icon = () => {
    const { state, iconID } = useGlobalContext()
    const selectedIcon = state.primaryActions.filter(el => el.id === iconID)[0]
    return (
        <>
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Icon Background Color:</span>
                <EditColor icon={true} selectedIcon={selectedIcon} colorOf={'background'} />
            </div>
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Icon Color:</span>
                <EditColor icon={true} selectedIcon={selectedIcon} colorOf={'fill'} />
            </div>
            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Icon Text Color:</span>
                <EditColor icon={true} selectedIcon={selectedIcon} colorOf={'textColor'} />
            </div> </>
    )
}
export default Icon