const createStudentId = (school, std, div, roll, isActive) => {
    let id = school.substring(0, 19)
    if (std === '-2') id += 'A'
    else if (std === '-1') id += 'B'
    else if (std === '10') id += 'E'
    else id += std
    console.log('createStudId.js', std)
    id += div

    if (roll < 10) id += '0' + roll
    else id += roll

    if (isActive) id += '1'
    else id += '0'
    return id
}
export default createStudentId
