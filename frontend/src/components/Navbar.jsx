
import React, { useState } from 'react'
import MediConnect from '../assets/MediConnect.png'
import { Link ,NavLink, useNavigate } from 'react-router-dom'
import { RiArrowDropDownLine ,RiArrowDropUpLine } from "react-icons/ri";

const Navbar = () => {
    const navigate =useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [showMenu, setShowMenu] = useState(false)

    const imageURL = localStorage.getItem('userImage')  || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'

    const HandleLogout = () => {
       localStorage.removeItem('token')
       localStorage.removeItem('userImage')
       localStorage.removeItem('userName')
       navigate('/')
       window.location.reload()
    }
  return (
    <div className='flex justify-between items-center p-5 bg-white shadow-md mx-3'>
        <div onClick={()=>navigate('/')} className='flex items-center space-x-2 font-bold text-2xl cursor-pointer'>
            <img src={MediConnect} className='w-10 h-10' alt="MediConnect_Company_Logo" />
            <h4>Medi<span className='text-blue-600'>Connect</span></h4>
        </div>
        
        <ul className='flex flex-row items-center space-x-10'>
            <li><NavLink  className={({ isActive }) => isActive ? "text-xl bg-blue-200 rounded-full py-2 px-4 font-bold  " : "text-xl"}  to="/">HOME</NavLink></li>
            <li><NavLink  className={({ isActive }) => isActive ? "text-xl bg-blue-200 rounded-full py-2 px-4 font-bold" : "text-xl"}  to="/doctors">ALL DOCTORS</NavLink></li>
            <li><NavLink  className={({ isActive }) => isActive ? "text-xl bg-blue-200 rounded-full py-2 px-4 font-bold" : "text-xl"}  to="/about">ABOUT</NavLink></li>
            <li><NavLink  className={({ isActive }) => isActive ? "text-xl bg-blue-200 rounded-full py-2 px-4 font-bold" : "text-xl"}  to="/contact">CONTACT</NavLink></li>
            <li><NavLink  className="text-xl rounded-full py-2 px-5 border hover:border-blue-500 hover:border-2" to="/adminLogin">Admin</NavLink></li>
            <li><NavLink  className="text-xl rounded-full py-2 px-5 border hover:border-blue-500 hover:border-2" to="/doctorLogin">Doctor</NavLink></li>
        </ul>
        {
            token ? 
            <div className='flex items-center space-x-2'>
               <img  className=' h-12 w-12 rounded-full' src={imageURL} alt="profil_pic" />
               {
                showMenu?<RiArrowDropUpLine onClick={()=>setShowMenu(!showMenu)} size={25} />:<RiArrowDropDownLine onClick={()=>setShowMenu(!showMenu)} size={25} />
               }
               {
                showMenu && (
                    <div className='absolute top-20 right-5 shadow-md p-5 bg-slate-100'>
                        <div className='flex flex-col space-y-2'>
                            <Link onClick={()=>setShowMenu(false)} className="text-gray-600 hover:text-black text-xl" to='/profile'>Profile</Link>
                            <Link onClick={()=>setShowMenu(false)} className="text-gray-600 hover:text-black text-xl" to='/my-appointments'>My Appointments</Link>
                            <Link onClick={HandleLogout} className="text-gray-600 hover:text-black text-xl" to='/logout' >Logout</Link>
                        </div>
                    </div>
                )
               }
               
            </div>
            :
            <button onClick={()=>navigate('/login')} className='bg-blue-600 rounded-full px-4 py-2 text-white text-xl hover:bg-blue-700'>Create Account</button>
        }
        
    </div>
  )
}

export default Navbar