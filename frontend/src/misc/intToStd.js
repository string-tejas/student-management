const intToStd = num => {
    let text = ''
    if (num === -2) {
        text = 'Nursery'
    } else if (num === -1) {
        text = 'Junior KG'
    } else if (num === 0) {
        text = 'Senior KG'
    } else if (num === 1) {
        text = '1st Std'
    } else if (num === 2) {
        text = '2nd Std'
    } else if (num === 3) {
        text = '3rd Std'
    } else {
        text = `${num}th Std`
    }
    return text
}

export default intToStd
