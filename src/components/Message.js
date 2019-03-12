import React from 'react'

export default ({message, hideMessage}) => (
  <div
    onClick={()=>hideMessage()}
    style={{
      display: message.show ? 'flex':'none',
      backgroundColor: message.type === 'error' ? '#f44336':'#4caf50',
      position: 'absolute',
      width: '100%',
      bottom: 0,
      height: 32,
      zIndex: 1000,
      color: 'white',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    {message.body}
  </div>
)