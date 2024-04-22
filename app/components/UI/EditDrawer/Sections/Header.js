import React from 'react'
import EditColor from '../components/EditColor'

const Header = () => {
  return (
        <>
    <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Header Background Color:</span>
              <EditColor colorOf="headerBackground" item='headerStyle' />
            </div>
    <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Header Font Color:</span>
              <EditColor colorOf="headerFontColor" item='headerStyle' />
    </div> </>
  )
}

export default Header