import React from 'react'
import Home from '../chat/Home'
import WithHeader from '../commonComponents/HOC'

const Message = () => {
  return (
    <div>
        <Home />
    </div>
  )
}

export default WithHeader(Message)