import { useState, useEffect} from 'react'


const Users = () => {

    // initial state is [{}]
    const [data, setData] = useState([{}])  // data - actual variable, setData - function for manipulation data variable

    useEffect(() => {
        fetch('/users', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            res => {
                console.log({ res });
                return res.json();
            }
        ).then(
            data => {
                console.log("Data?")
                setData(data)  // with 'setData' function we will fill 'data' variable of const [data, ...]
                console.log({ data })
            }
        )
    }, [])  // [] for it only run once

    return data
}

export default Users