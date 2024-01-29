import React from 'react'

const Box = (props) => {
  return (
    <div className='flex justify-between h-24 text-white border rounded-md'>
        <p className='text-2xl'>{props.title}</p>
        <p className='text-xl text-amber-500'>{props.quantity}</p>
    </div>
  )
}

export default Box
