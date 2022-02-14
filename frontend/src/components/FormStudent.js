import React, { useState, useRef, useEffect } from 'react'
import { createStudentId, intToStd } from '../misc/misc'
import ReactLoading from 'react-loading'
import './form.css'

const FormStudent = ({
    onSubmit,
    problem,
    setProblem,
    classes,
    division,
    isLoading,
    schools,
    placeholder = null,
}) => {
    const [isActive, setIsActive] = useState(null)
    const nameRef = useRef(null)
    const dobRef = useRef(null)
    const schoolRef = useRef(null)
    const classRef = useRef(null)
    const divisionRef = useRef(null)
    const rollRef = useRef(null)
    useEffect(() => {
        if (placeholder !== null) {
            setIsActive(placeholder.isActive)
        }
    }, [])
    const handleSubmit = e => {
        e.preventDefault()
        if (schoolRef.current.value === 'Select a school') {
            setProblem({ ok: false, message: 'Choose a school' })
            return
        }
        if (classRef.current.value === 'Select class') {
            setProblem({ ok: false, message: 'Choose class' })
            return
        }
        if (divisionRef.current.value === 'Select division') {
            setProblem({ ok: false, message: 'Choose division' })
            return
        }

        let reqObj = {
            id: createStudentId(
                schoolRef.current.value,
                classRef.current.value,
                divisionRef.current.value,
                rollRef.current.value,
                isActive
            ),
            name: nameRef.current.value,
            dateOfBirth: dobRef.current.value,
            roll: parseInt(rollRef.current.value),
            school: schoolRef.current.value,
            class: parseInt(classRef.current.value),
            division: divisionRef.current.value,
            isActive: isActive,
        }
        if (placeholder !== null) {
            reqObj._id = placeholder._id
        }
        onSubmit(reqObj)
    }

    return (
        <form onSubmit={handleSubmit}>
            <table className='form-table'>
                <tbody>
                    <tr>
                        <td>Full Name</td>
                        <td>
                            <input
                                type='text'
                                ref={nameRef}
                                required
                                defaultValue={
                                    placeholder !== null ? placeholder.name : ''
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Date of Birth</td>
                        <td>
                            <input
                                type='date'
                                ref={dobRef}
                                defaultValue={placeholder?.dateOfBirth}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>School</td>
                        <td>
                            <select
                                ref={schoolRef}
                                className='school'
                                defaultValue={
                                    placeholder !== null
                                        ? placeholder.school._id
                                        : 'Select a school'
                                }
                            >
                                {schools.map(schoolObj => {
                                    return (
                                        <option
                                            key={schoolObj.id}
                                            value={`${schoolObj._id}`}
                                        >
                                            {schoolObj.name}
                                        </option>
                                    )
                                })}
                                <option disabled hidden>
                                    Select a school
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Class</td>
                        <td>
                            <select
                                ref={classRef}
                                className='other'
                                defaultValue={
                                    placeholder !== null
                                        ? placeholder.class
                                        : 'Select class'
                                }
                            >
                                {classes.map(std => {
                                    let text = intToStd(std)
                                    return (
                                        <option value={std} key={std}>
                                            {text}
                                        </option>
                                    )
                                })}
                                <option disabled hidden>
                                    Select class
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Division</td>
                        <td>
                            <select
                                ref={divisionRef}
                                className='other'
                                defaultValue={
                                    placeholder !== null
                                        ? placeholder.division
                                        : 'Select division'
                                }
                            >
                                {division.map(div => (
                                    <option key={div} value={div}>
                                        {div}
                                    </option>
                                ))}
                                <option disabled hidden>
                                    Select division
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Roll</td>
                        <td>
                            <input
                                min={1}
                                max={99}
                                type='number'
                                required
                                defaultValue={placeholder?.roll}
                                ref={rollRef}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>
                            <input
                                type='radio'
                                name='status'
                                required
                                defaultChecked={placeholder?.isActive}
                                onClick={() => setIsActive(true)}
                            />{' '}
                            Active
                            <input
                                type='radio'
                                name='status'
                                required
                                defaultChecked={!placeholder?.isActive}
                                onClick={() => setIsActive(false)}
                                style={{ marginLeft: '2rem' }}
                            />{' '}
                            Inactive
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
                                <input type='submit' /> <input type='reset' />
                            </td>
                        )}
                    </tr>
                    <tr>
                        <td colSpan={2} style={{ color: 'red' }}>
                            {!problem?.ok && problem.message}
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default FormStudent
