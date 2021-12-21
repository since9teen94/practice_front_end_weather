const DateTime = (props) => {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const dt = 1640070000
    return (
        <h1>{days[new Date(dt).getDay()]}</h1>
    )
}

export default DateTime;