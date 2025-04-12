import React, { useState } from 'react'
import MediConnect from '../assets/MediConnect.png'
import { Link ,NavLink, useNavigate } from 'react-router-dom'
import { RiArrowDropDownLine ,RiArrowDropUpLine } from "react-icons/ri";

const DoctorNavbar = () => {
    const navigate =useNavigate()
    const [token, setToken] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const handleAdminLogout = () => {
       localStorage.removeItem('userProfile')
       navigate('/')
       window.location.reload();
       
    }
  return (
    <div className='flex justify-between items-center p-5 bg-white shadow-md mx-3'>
        <div onClick={()=>navigate('/')} className='flex items-center space-x-2 font-bold text-2xl cursor-pointer'>
            <img src={MediConnect} className='w-10 h-10' alt="MediConnect_Company_Logo" />
            <h4>Medi<span className='text-blue-600'>Connect</span></h4>
            <h4  className="text-xl rounded-full py-2 px-5 border">Doctor</h4>
        </div>
        <button onClick={handleDoctorLogout} className='bg-blue-600 rounded-full px-4 py-2 text-white text-xl hover:bg-blue-700'>Logout</button>
        
    </div>
  )
}

export default DoctorNavbar