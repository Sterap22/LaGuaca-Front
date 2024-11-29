import React from 'react'
import Logo from '../../assets/img/logo-2.png'
import '../../assets/styles/loader.css'

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <img src={Logo} alt='logo' className='Logo-loader'/>
    </div>
  )
}

export default Loader