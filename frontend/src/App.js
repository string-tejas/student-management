import React, { useLayoutEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { Login, Register, Dashboard } from './components/componentsList'
import './App.css'

function App() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getUser = async () => {
        console.log(
            'get user',
            `bearer ${JSON.parse(localStorage.getItem('app:stud_man'))}`
        )
        const fetched = await fetch(`${process.env.REACT_APP_BACKEND}/user/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `bearer ${JSON.parse(
                    localStorage.getItem('app:stud_man')
                )}`,
            },
        }).then(res => res.json())
        console.log('App.js', fetched)

        setUser(fetched)

        setIsLoading(false)
    }

    useLayoutEffect(() => {
        getUser()
        console.log('GetUser - App.js', user)
    }, [])

    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        user?.ok ? (
                            <Dashboard getUser={getUser} user={user} />
                        ) : isLoading ? (
                            <>loading...</>
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />

                <Route
                    path='/login'
                    element={
                        user?.ok ? (
                            <Navigate to='/' />
                        ) : isLoading ? (
                            <>loading...</>
                        ) : (
                            <Login getUser={getUser} />
                        )
                    }
                />
                <Route
                    path='/register'
                    element={
                        user?.ok ? (
                            <Navigate to='/' />
                        ) : isLoading ? (
                            <>loading...</>
                        ) : (
                            <Register />
                        )
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
