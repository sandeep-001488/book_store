import React from 'react'
import './message.css'
import { useNavigate } from 'react-router-dom'

function Message() {
  const navigate=useNavigate()

  return (
    <>
    <div className='message'>
      <p className='title'>Thank You for placing order.. <span><img src="/emoji.jpeg" alt="emoji" /></span></p>
      <p className='response'>We will respond to it shortly..Have patience!!</p>
      <button onClick={()=>navigate('/')} className="order-again">Buy More</button>
      <button className="view-order-btn" onClick={()=>navigate('/book/orders')}>View Ur Order</button>
    </div>
    
    </>
  )
}

export default Message
