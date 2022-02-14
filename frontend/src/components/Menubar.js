import React from 'react'
import { FiLogOut, FiSearch, FiUserPlus, FiPlusCircle } from 'react-icons/fi'
// import { IoSchoolOutline } from 'react-icons/io5'
import './Menubar.css'

const Menubar = ({ page, setPage, logout }) => {
    const pages = ['StudentView', 'StudentAdd', 'SchoolView', 'SchoolAdd']

    return (
        <>
            <div className='menubar-container'>
                <div
                    className={`menubar-ele ${
                        page === pages[0] ? 'selected' : ''
                    }`}
                    onClick={() => setPage(pages[0])}
                >
                    <FiSearch />
                    <span>View Students</span>
                </div>
                <div
                    className={`menubar-ele ${
                        page === pages[1] ? 'selected' : ''
                    }`}
                    onClick={() => setPage(pages[1])}
                >
                    <FiUserPlus />
                    <span>Add Student</span>
                </div>
                {/* <div
                    className={`menubar-ele ${
                        page === pages[2] ? 'selected' : ''
                    }`}
                    onClick={()=>setPage(pages[2])}
                >
                    <IoSchoolOutline />
                    <span>View School</span>
                </div> */}
                <div
                    className={`menubar-ele ${
                        page === pages[3] ? 'selected' : ''
                    }`}
                    onClick={() => setPage(pages[3])}
                >
                    <FiPlusCircle />
                    <span>Add School</span>
                </div>

                <div className='menubar-ele logout' onClick={logout}>
                    <FiLogOut />
                    <span>Log out</span>
                </div>
            </div>
        </>
    )
}

export default Menubar
