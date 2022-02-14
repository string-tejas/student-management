import React, { useEffect, useRef } from 'react'
import ReactLoading from 'react-loading'
import './form.css'

const FormSchool = ({
    submit,
    success,
    isLoading,
    placeholder = {
        school: '',
        address: '',
        ok: false,
    },
}) => {
    const schoolRef = useRef(null)
    const addressRef = useRef(null)
    const onFormSubmit = e => {
        submit(e, schoolRef, addressRef)
    }
    const handleReset = e => {
        if (placeholder.ok) e.preventDefault()
        addressRef.current.value = placeholder.address
        schoolRef.current.value = placeholder.school
    }
    useEffect(() => {
        if (placeholder.ok) {
            addressRef.current.value = placeholder.address
            schoolRef.current.value = placeholder.school
        }
    }, [])
    return (
        <form id='school-form' onSubmit={onFormSubmit}>
            <table className='form-table'>
                <tbody>
                    <tr>
                        <td>School Name</td>
                        <td>
                            <input type='text' ref={schoolRef} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <textarea
                                ref={addressRef}
                                cols='30'
                                rows='5'
                                form='shool-form'
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        {isLoading ? (
                            <td>
                                <ReactLoading
                                    type='bubbles'
                                    height={70}
                                    width={70}
                                    color='#1625a5'
                                />
                            </td>
                        ) : (
                            <td colSpan={2}>
                                <input type='submit' />
                                <input type='reset' onClick={handleReset} />
                            </td>
                        )}
                    </tr>
                    <tr>
                        <td colSpan={2} style={{ color: 'red' }}>
                            {success?.ok ? '' : success.message}
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default FormSchool
