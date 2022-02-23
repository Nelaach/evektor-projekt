import { useState, useLayoutEffect} from 'react'

const Users = () => {

    // data - actual variable, setData - function for manipulation data variable
    const [users, setUsers] = useState([])

    const fetchData = async () => {
        try {
            let response = await fetch(
                `/users`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            let data = await response.json();
            setUsers(data);

        } catch {
            console.log("Fetching useres from SnipeIt failed");
        }
    }

    useLayoutEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     fetch('/users', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(
    //         res => {
    //             console.log({ res });
    //             return res.json();
    //         }
    //     ).then(
    //         data => {
    //             console.log("Data?")
    //             setUsers(data)  // with 'setData' function we will fill 'data' variable of const [data, ...]
    //             console.log({ data })
    //         }
    //     )
    // }, [])  // [] for it only run once

    return users
}

export default Users