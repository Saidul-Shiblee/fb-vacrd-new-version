
import React from 'react'
import EditColor from '../components/EditColor'

import EditBorderRadius from '../components/EditBorderRadius'


const BrandImage = () => {




    return (
        <div>

            <div className='flex  items-center gap-6 relative mt-6'>
                <span className='inline-block text-gray-400'>Shadow Color:</span>
                <EditColor colorOf="shadowColor" item={'brandLogoStyle'} />
            </div>

            <EditBorderRadius title='Horizontal Offset:' section={'brandLogoStyle'} item='horizontalOffset' min={-50} max={50} />
            <EditBorderRadius title='Vertical Offset:' section={'brandLogoStyle'} item='verticalOffset' min={-50} max={50} />
            <EditBorderRadius title='Blur:' section={'brandLogoStyle'} item='blur' min={0} max={50} />


        </div>
    )
}

export default BrandImage