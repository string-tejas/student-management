import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Checkmark } from 'react-checkmark'
import ReactLoading from 'react-loading'
import './form.css'
import logoWide from '../images/logoWide.png'

export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const [regStat, setRegStat] = useState({ ok: false, message: '' })

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const handleRegisterSubmit = async e => {
        e.preventDefault()
        setRegStat({ ok: false, message: '' })
        let name = nameRef.current.value
        let email = emailRef.current.value
        let password = passwordRef.current.value
        setIsLoading(true)
        if (name && email && password) {
            const fetched = await fetch(
                `${process.env.REACT_APP_BACKEND}/user/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                    }),
                }
            ).then(res => res.json())

            console.log('Register.js', fetched)
            setRegStat(fetched)
            setIsLoading(false)
        }
    }
    return (
        <div className='form-container'>
            {regStat.ok ? (
                <Registered />
            ) : (
                <form onSubmit={handleRegisterSubmit}>
                    <img src={logoWide} className='form-logo' />
                    <div className='form-title'>Register new Account</div>

                    <div className='form-incorrect'>
                        {regStat?.ok ? '' : regStat.message}
                    </div>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='Name'
                        ref={nameRef}
                        required
                    />
                    <input
                        className='form-input'
                        type='email'
                        placeholder='Email'
                        ref={emailRef}
                        required
                    />

                    <input
                        className='form-input'
                        type='password'
                        placeholder='Password'
                        minLength={8}
                        ref={passwordRef}
                        required
                    />
                    <FormSubmit isLoading={isLoading} text='Register' />

                    <div className='form-footer'>
                        Already Registered ? <Link to='/login'>Login</Link>
                    </div>
                </form>
            )}
        </div>
    )
}

const Registered = () => {
    return (
        <>
            <form>
                <div className='form-title' style={{ marginBottom: '1rem' }}>
                    Successfully Registered
                </div>
                <Checkmark size='xLarge' />
                <Link to='/login'>
                    <button className='form-btn'>Login</button>
                </Link>
            </form>
        </>
    )
}

export const FormSubmit = ({ isLoading, text = 'Submit' }) => {
    return (
        <div className='form-submit-container'>
            {isLoading ? (
                <ReactLoading
                    type='bars'
                    height={70}
                    width={70}
                    color='#1625a5'
                />
            ) : (
                <input type='submit' className='form-btn' value={text} />
            )}
        </div>
    )
}
