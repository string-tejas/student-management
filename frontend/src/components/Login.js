import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FormSubmit } from './Register'
import axios from 'axios'
import './form.css'
import logoWide from '../images/logoWide.png'

export default function Login({ getUser }) {
    const [loginStat, setLoginStat] = useState({
        email: true,
        password: true,
        message: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const handleFormSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)
        setLoginStat({
            email: true,
            password: true,
            message: '',
        })
        const email = emailRef.current.value
        const password = passwordRef.current.value

        if (email && password) {
            let result = await fetch(
                `${process.env.REACT_APP_BACKEND}/user/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `bearer ${JSON.parse(
                            localStorage.getItem('app:stud_man')
                        )}`,
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            ).then(res => res.json())

            console.log('Login.js', result)

            if (result.ok) {
                localStorage.setItem(
                    'app:stud_man',
                    JSON.stringify(result.token)
                )
                getUser()
            } else {
                setLoginStat(prevError => {
                    return {
                        ...prevError,
                        ...result,
                    }
                })
                console.log(loginStat)
                setIsLoading(false)
            }
        }
    }
    return (
        <div className='form-container'>
            <form onSubmit={handleFormSubmit}>
                <img src={logoWide} className='form-logo' />
                <div className='form-title'>Login to your Account</div>

                <div className='form-incorrect'>
                    {loginStat?.email ? '' : loginStat.message}
                </div>
                <input
                    className='form-input'
                    type='email'
                    placeholder='Email'
                    ref={emailRef}
                    required
                />
                <div className='form-incorrect'>
                    {loginStat?.password ? '' : loginStat.message}
                </div>
                <input
                    className='form-input'
                    type='password'
                    placeholder='Password'
                    minLength={8}
                    ref={passwordRef}
                    required
                />
                <FormSubmit isLoading={isLoading} text='Login' />
                <div className='form-footer'>
                    Don't have an Account ? <Link to='/register'>Register</Link>
                </div>
            </form>
        </div>
    )
}
