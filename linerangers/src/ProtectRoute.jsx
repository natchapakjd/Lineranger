import React from 'react'

const ProtectRoute = (props) => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return null; // Optional, depending on your use case
  } else {
    return <div>{props}</div>
  }
}

export default ProtectRoute
