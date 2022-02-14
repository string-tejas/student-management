import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut, FiEdit } from 'react-icons/fi'
import logoWide from '../images/logoWide.png'
import profile from '../images/profileEmpty.png'

import './Navbar.css'

const Navbar = ({ user, logout }) => {
    return (
        <>
            <nav className='navbar-container'>
                <div className='navbar-ex'>
                    <img className='navbar-logo' src={logoWide} alt='Logo' />
                </div>
                <div className='navbar-ex'>
                    <NavbarUser name={user.name} logout={logout} />
                </div>
            </nav>
        </>
    )
}

const NavbarUser = ({ name, logout }) => {
    return (
        <div className='navbar-user'>
            <div className='dropdown'>
                <div className='dropdown-btn'>
                    <img src={profile} alt='p' />
                    <section>{name}</section>
                </div>
                <ul className='dropdown-content'>
                    {/* <Link to='/'>
                        <li className='dropdown-ele'>
                            <FiEdit />
                            <span>Edit Profile</span>
                        </li>
                    </Link> */}
                    <li className='dropdown-ele' onClick={logout}>
                        <FiLogOut />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
