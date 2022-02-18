import React, { useState } from 'react'
import { FormSchool, RegisteredAnimation } from './componentsList'
import './form.css'

const SchoolAdd = () => {
    const [success, setSuccess] = useState({ ok: true, message: '' })
    const [isLoading, setIsloading] = useState(false)
    const [regMore, setRegMore] = useState(true)

    const handleFormSubmit = async (e, schoolRef, addressRef) => {
        e.preventDefault()
        setSuccess({ ok: true, message: '' })
        setIsloading(true)
        const school = schoolRef.current.value
        const address = addressRef.current.value.replace(/[\r\n]+/gm, ' ')
        console.log(school, address)
        if (school && address) {
            let response = await fetch(
                `${process.env.REACT_APP_BACKEND}/school/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `bearer ${JSON.parse(
                            localStorage.getItem('app:stud_man')
                        )}`,
                    },
                    body: JSON.stringify({
                        name: school,
                        address: address,
                    }),
                }
            ).then(res => res.json())
            setSuccess(response)
            if (response.ok) setRegMore(false)
        }
        setIsloading(false)
    }
    return (
        <>
            <div className='content-container'>
                <h1 className='page-heading'>Add School</h1>
                {regMore ? (
                    <FormSchool
                        submit={handleFormSubmit}
                        success={success}
                        isLoading={isLoading}
                    />
                ) : (
                    <RegisteredAnimation
                        btnText={'Add more ?'}
                        hide={setRegMore}
                    />
                )}
            </div>
        </>
    )
}

export default SchoolAdd
