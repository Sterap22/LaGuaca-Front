import React from 'react'
import 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js'

const UIIconn = ({ CustomName = '', CustomStyle = {}}) => {
  return (
    <ion-icon name={CustomName} style={{...CustomStyle}} />
  )
}

export default UIIconn