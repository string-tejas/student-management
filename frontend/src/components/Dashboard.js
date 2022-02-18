import React, { useState } from 'react'
import {
    Navbar,
    Menubar,
    StudentView,
    StudentAdd,
    SchoolAdd,
    SchoolView,
} from './componentsList'
import './Dashboard.css'

const Dashboard = ({ user, getUser }) => {
    const [page, setPage] = useState('StudentView')

    const handleLogoutClick = async () => {
        const fetched = await fetch(
            `${process.env.REACT_APP_BACKEND}/user/login`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `bearer ${JSON.parse(
                        localStorage.getItem('app:stud_man')
                    )}`,
                },
            }
        ).then(res => res.json())
        console.log('logout', fetched)
        if (fetched.ok) {
            localStorage.removeItem('app:stud_man')
            getUser()
        } else {
            console.log(fetched.message)
        }
    }
    const switchTo = page => {
        switch (page) {
            case 'StudentView':
                return <StudentView />
            case 'StudentAdd':
                return <StudentAdd />
            case 'SchoolAdd':
                return <SchoolAdd />
            case 'SchoolView':
                return <SchoolView />
            default:
                return <StudentView />
        }
    }

    return (
        <>
            <Navbar user={user} logout={handleLogoutClick} />
            <div className='main-container'>
                <Menubar
                    page={page}
                    setPage={setPage}
                    logout={handleLogoutClick}
                />
                {switchTo(page)}
            </div>
        </>
    )
}
export default Dashboard
