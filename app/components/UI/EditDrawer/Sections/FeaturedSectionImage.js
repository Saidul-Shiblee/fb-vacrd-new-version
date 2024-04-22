import { useGlobalContext } from '@/app/context/context'
import React from 'react'
import EditBorderRadius from '../components/EditBorderRadius'
import EditShadow from '../components/EditShadow'


const FeaturedSectionImage = () => {

    const {editFeaturedSectionID} = useGlobalContext()



  return (
      <div>
          <EditBorderRadius title='Border Radius:' section={editFeaturedSectionID} item='borderRadius'/>
          <EditShadow section={editFeaturedSectionID} />

      </div>
  )
}

export default FeaturedSectionImage

