import React, { useEffect, useState, useRef } from 'react'
import { intToStd } from '../misc/misc'
import { FiTrash, FiEdit, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import ReactPaginate from 'react-paginate'
import ReactLoading from 'react-loading'
import { FormStudent } from './componentsList'
import './Dashboard.css'
const xlsx = require('json-as-xlsx')

const StudentView = () => {
    const classes = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const division = ['A', 'B', 'C', 'D']
    const studPerPage = 6

    const [schools, setSchools] = useState([])
    const [students, setStudents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [editLoading, setEditLoading] = useState(false)
    const [currentStud, setCurrentStud] = useState(0)
    const [prob, setProb] = useState({ ok: true, message: '' })
    const [pageNo, setPageNo] = useState(0)
    const [edit, setEdit] = useState({ perform: false })

    useEffect(() => {
        getStudents()
        getSchoolNames()
    }, [])
    useEffect(() => setCurrentStud(studPerPage * pageNo), [pageNo])

    const deleteStudent = async _id => {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND}/student/`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${JSON.parse(
                        localStorage.getItem('app:stud_man')
                    )}`,
                },
                body: JSON.stringify({
                    _id: _id,
                }),
            }
        ).then(res => res.json())
        getStudents()
    }
    const editStudent = async obj => {
        setEditLoading(true)
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND}/student/edit`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${JSON.parse(
                        localStorage.getItem('app:stud_man')
                    )}`,
                },
                body: JSON.stringify(obj),
            }
        ).then(res => res.json())
        console.log(res)
        if (res.ok) setEdit({ perform: false })
        setEditLoading(false)
        getStudents()
    }
    const downloadExcel = () => {
        let data = [
            {
                sheet: 'Students',
                columns: [
                    { label: 'Name', value: 'name' },
                    { label: 'BirthDate', value: 'dateOfBirth' },
                    { label: 'Age', value: 'age' },
                    { label: 'School', value: 'school.name' },
                    { label: 'Class', value: row => intToStd(row.class) },
                    { label: 'Division', value: 'division' },
                    { label: 'RollNo', value: 'roll' },
                    { label: 'Status', value: 'isActive' },
                ],
                content: students,
            },
        ]

        let settings = {
            fileName: 'StudentData',
            extraLength: 3,
        }
        const obj = xlsx(data, settings)
        return obj
    }
    const getSchoolNames = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND}/school/name`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${JSON.parse(
                        localStorage.getItem('app:stud_man')
                    )}`,
                },
            }
        ).then(res => res.json())
        setSchools(response)
    }
    const getStudents = async () => {
        console.log('in get Students')
        setIsLoading(true)
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND}/student/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${JSON.parse(
                        localStorage.getItem('app:stud_man')
                    )}`,
                },
            }
        ).then(res => res.json())
        console.log(response)
        setStudents(response)
        setIsLoading(false)
    }
    const searchStudents = async (name, age, roll, school, div, std) => {
        let reqObj = {
            name: name,
            age: age ? age : { $exists: true },
            school: school ? school : { $exists: true },
            roll: roll ? roll : { $exists: true },
            division: div ? div : { $exists: true },
            class: std ? std : { $exists: true },
        }
        console.log('search req obj', reqObj)
        let response = await fetch(
            `${process.env.REACT_APP_BACKEND}/student/search`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${JSON.parse(
                        localStorage.getItem('app:stud_man')
                    )}`,
                },
                body: JSON.stringify(reqObj),
            }
        ).then(res => res.json())
        if (!response?.ok) setStudents([])
        setStudents(response)
    }

    const changePage = ({ selected }) => {
        setPageNo(selected)
    }
    return (
        <>
            {edit.perform ? (
                <div className='content-container'>
                    <button
                        style={{
                            padding: '0.1rem 0.6rem',
                            borderStyle: 'none',
                            outline: 'none',
                            borderRadius: '1rem',
                            backgroundColor: 'var(--blue)',
                            color: 'white',
                        }}
                        onClick={() => setEdit({ perform: false })}
                    >
                        Back
                    </button>
                    <FormStudent
                        onSubmit={editStudent}
                        schools={schools}
                        placeholder={edit}
                        division={division}
                        classes={classes}
                        problem={prob}
                        isLoading={editLoading}
                        setProblem={setProb}
                    />
                </div>
            ) : (
                <div className='content-container'>
                    <SearchForm
                        schools={schools}
                        classes={classes}
                        division={division}
                        downloadExcel={downloadExcel}
                        search={searchStudents}
                        getAllStudents={getStudents}
                    />
                    {isLoading ? (
                        <div style={{ marginTop: '2rem', marginLeft: '3rem' }}>
                            <ReactLoading
                                type='spin'
                                height={70}
                                width={70}
                                color='#1625a5'
                            />
                        </div>
                    ) : students.length === 0 ? (
                        <h1 style={{ marginTop: '2rem' }}>No data found</h1>
                    ) : (
                        <div className='data-container'>
                            <TableData
                                students={students?.slice(
                                    currentStud,
                                    currentStud + studPerPage
                                )}
                                currentStud={currentStud}
                                deleteStudent={deleteStudent}
                                setEdit={setEdit}
                            />
                            <ReactPaginate
                                previousLabel={<FiArrowLeft />}
                                nextLabel={<FiArrowRight />}
                                pageCount={Math.ceil(
                                    students.length / studPerPage
                                )}
                                onPageChange={changePage}
                                containerClassName='pagination-container'
                                activeClassName='pagination-btn-active'
                                disabledClassName='pagination-btn-disabled'
                                previousLinkClassName='pagination-btn-prev'
                                nextLinkClassName='pagination-btn-next'
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

const SearchForm = ({
    schools,
    division,
    classes,
    search,
    getAllStudents,
    downloadExcel,
}) => {
    const nameRef = useRef(null)
    const ageRef = useRef(null)
    const schoolRef = useRef(null)
    const classRef = useRef(null)
    const divRef = useRef(null)
    const rollRef = useRef(null)

    const handleSearchClick = e => {
        e.preventDefault()
        let name = nameRef.current.value
        // let age =
        //     ageRef.current.value === '' ? false : parseInt(ageRef.current.value)
        let age = false
        let school =
            schoolRef.current.value === 'School'
                ? false
                : schoolRef.current.value
        let div = divRef.current.value === 'Div' ? false : divRef.current.value
        let std =
            classRef.current.value === 'Class'
                ? false
                : parseInt(classRef.current.value)
        let roll =
            rollRef.current.value === ''
                ? false
                : parseInt(rollRef.current.value)

        if (name !== '' || age || school || div || std || roll) {
            search(name, age, roll, school, div, std)
            console.log('searching')
        } else getAllStudents()
    }
    return (
        <div className='form-search-container'>
            <form>
                <input ref={nameRef} type='text' placeholder='Name' />
                {/* <input
                    ref={ageRef}
                    type='number'
                    min={0}
                    max={120}
                    placeholder='Age'
                /> */}
                <input
                    ref={rollRef}
                    type='number'
                    min={1}
                    max={99}
                    placeholder='Roll'
                />

                <select
                    ref={schoolRef}
                    className='form-search-select'
                    defaultValue={'School'}
                >
                    <option disabled hidden selected>
                        School
                    </option>
                    <option value={'School'}>---</option>
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
                </select>
                <select
                    ref={divRef}
                    className='form-search-select short'
                    defaultValue={'Div'}
                >
                    <option disabled hidden selected>
                        Div
                    </option>
                    <option value={`Div`}>---</option>
                    {division.map(div => (
                        <option key={div} value={div}>
                            {div}
                        </option>
                    ))}
                </select>
                <select
                    ref={classRef}
                    className='form-search-select short'
                    defaultValue={'Class'}
                >
                    <option disabled hidden selected>
                        Class
                    </option>
                    <option value={`Class`}>---</option>
                    {classes.map(std => {
                        let text = intToStd(std)
                        return (
                            <option value={std} key={std}>
                                {text}
                            </option>
                        )
                    })}
                </select>
                <button className='form-search-btn' onClick={handleSearchClick}>
                    Search
                </button>
                <button
                    className='form-search-btn'
                    onClick={e => {
                        e.preventDefault()
                        downloadExcel()
                    }}
                >
                    Download
                </button>
            </form>
        </div>
    )
}

const TableData = ({ students, deleteStudent, currentStud, setEdit }) => {
    return (
        <div className='view-table'>
            <table>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Roll</th>
                        <th>School</th>
                        <th>Division</th>
                        <th>Class</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((stud, index) => {
                        return (
                            <StudentRow
                                deleteStudent={deleteStudent}
                                stud={stud}
                                index={index + 1 + currentStud}
                                setEdit={setEdit}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const StudentRow = ({ stud, index, deleteStudent, setEdit }) => {
    const handleDelete = e => {
        e.preventDefault()
        deleteStudent(stud._id)
    }
    const handleEdit = e => {
        e.preventDefault()
        setEdit({ perform: true, ...stud })
    }
    return (
        <tr key={stud._id}>
            <td>{index}</td>
            <td>{stud.name}</td>
            <td>{stud.age}</td>
            <td>{stud.roll}</td>
            <td>{stud.school.name}</td>
            <td>{stud.division}</td>
            <td>{intToStd(stud.class)}</td>
            <td>{stud.isActive ? 'Yes' : 'No'}</td>
            <td>
                <span className='action-btn edit' onClick={handleEdit}>
                    <FiEdit />
                </span>
                <span className='action-btn' onClick={handleDelete}>
                    <FiTrash />
                </span>
            </td>
        </tr>
    )
}

export default StudentView
