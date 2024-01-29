import React from 'react'
import Box from './Box'
const BoxList = (props) => {
  let boxs = props.boxs
  return (
    <div>
        {boxs.map((box,index)=>(
            <Box key ={index} title = {box.title} quantity = {box.quantity} />
        ))}
    </div>
  )
}

export default BoxList
