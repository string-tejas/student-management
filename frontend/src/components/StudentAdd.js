import React, { useState, useEffect } from 'react'
import { FormStudent, RegisteredAnimation } from './componentsList'

const StudentAdd = () => {
    const [schools, setSchools] = useState([])

    const [success, setSuccess] = useState({ ok: true, message: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [regMore, setRegMore] = useState(true)

    const getSchoolNames = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND}/school/name`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(res => res.json())
        console.log('get school names', response)
        setSchools(response)
    }

    const handleSubmit = async reqObj => {
        setSuccess({ ok: true, message: '' })
        setIsLoading(true)
        console.log(reqObj)
        let response = await fetch(
            `${process.env.REACT_APP_BACKEND}/student/register`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqObj),
            }
        ).then(res => res.json())
        setSuccess(response)
        console.log(response)
        if (response.ok) setRegMore(false)
        setIsLoading(false)
    }
    useEffect(() => getSchoolNames(), [])
    const classes = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const division = ['A', 'B', 'C', 'D']
    return (
        <>
            <div className='content-container'>
                <h1 className='page-heading'>Add Student</h1>
                {regMore ? (
                    <FormStudent
                        onSubmit={handleSubmit}
                        problem={success}
                        setProblem={setSuccess}
                        classes={classes}
                        isLoading={isLoading}
                        division={division}
                        schools={schools}
                    />
                ) : (
                    <RegisteredAnimation
                        message='Student Added Successfully'
                        btnText='Add more ?'
                        hide={setRegMore}
                    />
                )}
            </div>
        </>
    )
}

export default StudentAdd
