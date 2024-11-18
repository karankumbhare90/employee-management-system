import React from 'react'
import logo from '../../assets/logo.png'

const Navbar = () => {
    return (
        <div className='shadow-custom flex space-x-1 items-center z-[100]'>
            <img src={logo} alt="EMS" className='w-14 p-3' />
            <span className='text-xl font-semibold'>Employee Management System</span>
        </div>
    )
}

export default Navbar