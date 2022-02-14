import React from 'react'
import { Checkmark } from 'react-checkmark'
import './form.css'

const RegisteredAnimation = ({
    message = 'Successfully Registered !',
    btnText = 'Next',
    hide,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '25rem',
            }}
        >
            <div className='form-title' style={{ marginBottom: '1rem' }}>
                {message}
            </div>
            <Checkmark size='xLarge' />
            <button
                type='button'
                className='form-btn'
                style={{ width: 'fit-content', fontSize: '1.2rem' }}
                onClick={() => hide(true)}
            >
                {btnText}
            </button>
        </div>
    )
}

export default RegisteredAnimation
