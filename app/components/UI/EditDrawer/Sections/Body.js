import React from 'react'
import EditColor from '../components/EditColor'

const Body = () => {
  return (
      <div className='flex  items-center gap-6 relative mt-6'>
          <span className='inline-block text-gray-400'>Body Background Color:</span>
          <EditColor colorOf="bodyBackground" item='bodyStyle'/>
      </div>
  )
}

export default Body