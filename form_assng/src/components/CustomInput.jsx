import React from 'react'
import { forwardRef } from 'react'

const CustomInput = forwardRef(({ type, placeholder }, ref) => {

  return (
    <input type={type} placeholder={placeholder} ref={ref} className='custom-input' />
  )

})

export default CustomInput
