import { useGlobalContext } from '@/app/context/context'
import React from 'react'
import EditText from '../components/EditText'

const FeaturedSectionTitle = () => {

    const {editFeaturedSectionID} = useGlobalContext()



  return (
      <div>
          <EditText title='Title:' section={editFeaturedSectionID} item='' />


      </div>
  )
}

export default FeaturedSectionTitle

