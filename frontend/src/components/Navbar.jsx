import React, { useState } from 'react';
import MediConnect from '../assets/MediConnect.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Navbar = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [showMenu, setShowMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const imageURL = localStorage.getItem('userImage') || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

    const HandleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userImage');
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="p-4 bg-white shadow-md fixed w-full z-20 top-0 left-0">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div onClick={() => navigate('/')} className="flex items-center space-x-2 font-bold text-2xl cursor-pointer">
                    <img src={MediConnect} className="w-10 h-10" alt="MediConnect_Company_Logo" />
                    <h4>Medi<span className="text-blue-600">Connect</span></h4>
                </div>

                <div className="lg:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-3xl focus:outline-none">
                        {isMobileMenuOpen ? '✖' : '☰'}
                    </button>
                </div>

                <ul className={`flex space-x-2 lg:flex-row items-center absolute lg:static bg-white lg:bg-transparent w-full lg:w-auto top-16 left-0 lg:top-0 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:visible lg:opacity-100'} lg:space-x-10 space-y-4 lg:space-y-0 p-5 lg:p-0 shadow-lg lg:shadow-none`}>
                    <li><NavLink className={({ isActive }) => isActive ? "text-lg lg:text-xl bg-blue-200 rounded-full py-2 px-4 font-bold" : "text-lg lg:text-xl"} to="/">HOME</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? "text-lg lg:text-xl bg-blue-200 rounded-full py-2 px-4 font-bold" : "text-lg lg:text-xl"} to="/doctors">ALL DOCTORS</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? "text-lg lg:text-xl bg-blue-200 rounded-full py-2 px-4 font-bold" : "text-lg lg:text-xl"} to="/about">ABOUT</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? "text-lg lg:text-xl bg-blue-200 rounded-full py-2 px-4 font-bold" : "text-lg lg:text-xl"} to="/contact">CONTACT</NavLink></li>
                    <li><NavLink className="text-lg lg:text-xl rounded-full py-2 px-5 border hover:border-blue-500 hover:border-2" to="/adminLogin">Admin</NavLink></li>
                    <li><NavLink className="text-lg lg:text-xl rounded-full py-2 px-5 border hover:border-blue-500 hover:border-2" to="/doctorLogin">Doctor</NavLink></li>
                </ul>

                {token ? (
                    <div className="flex items-center space-x-2 relative ml-4">
                        <img className="h-10 w-10 lg:h-12 lg:w-12 rounded-full" src={imageURL} alt="profile_pic" />
                        {showMenu
                            ? <RiArrowDropUpLine onClick={() => setShowMenu(!showMenu)} size={25} className="cursor-pointer" />
                            : <RiArrowDropDownLine onClick={() => setShowMenu(!showMenu)} size={25} className="cursor-pointer" />
                        }

                        {showMenu && (
                            <div className="absolute top-16 right-0 bg-slate-100 shadow-lg rounded-md p-4 flex flex-col space-y-2 z-30">
                                <Link onClick={() => setShowMenu(false)} className="text-sm lg:text-lg text-gray-600 hover:text-black" to='/profile'>Profile</Link>
                                <Link onClick={() => setShowMenu(false)} className="text-sm lg:text-lg text-gray-600 hover:text-black" to='/my-appointments'>My Appointments</Link>
                                <Link onClick={HandleLogout} className="text-sm lg:text-lg text-gray-600 hover:text-black" to='/logout'>Logout</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className="bg-blue-600 rounded-full px-4 py-2 text-sm lg:text-xl text-white hover:bg-blue-700 ml-4 hidden lg:block">Create Account</button>
                )}
            </div>

            {!token && isMobileMenuOpen && (
                <div className="flex flex-col items-center space-y-4 mt-4 lg:hidden">
                    <button onClick={() => navigate('/login')} className="bg-blue-600 rounded-full px-4 py-2 text-sm text-white hover:bg-blue-700">Create Account</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
