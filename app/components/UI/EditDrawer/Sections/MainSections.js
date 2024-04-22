import React from 'react'
import EditShadow from '../components/EditShadow'
import EditColor from '../components/EditColor'
import EditText from '../components/EditText'
import EditAnimation from '../components/EditAnimation'
import EditBorderRadius from '../components/EditBorderRadius'

export const MainSections = () => {
  return (
    <div>
          <EditShadow section='mainsectionStyle' />
          <div className='flex  items-center gap-6 relative mt-6'>
              <span className='inline-block text-gray-400'>Contact Info Background Color:</span>
              <EditColor colorOf="backgroundColor" item='mainsectionStyle' />
          </div>
          <EditText title='Name:' section='mainsectionStyle' item='name' />
          <EditText title='Position:' section='mainsectionStyle' item='position' />
          <EditText title='Company Name:' section='mainsectionStyle' item='companyName' />
          <EditText title='Email:' section='mainsectionStyle' item='emailName' />
      <div className='flex  items-center gap-6 relative mt-6'>
        <span className='inline-block text-gray-400'>Button Background Color:</span>
        <EditColor colorOf="saveContactButtonColor" item='mainsectionStyle' />
      </div>
      <EditBorderRadius title='Button Border Radius:' section="mainsectionStyle" item='saveContactButtonBorderRadius' />
          <EditText title='Button:' section='mainsectionStyle' item='saveContact' />
          <EditAnimation section='mainsectionStyle' field='saveContactButtonAnimation' />

    </div>
  )
}
