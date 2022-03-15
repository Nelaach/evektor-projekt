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

    return users
}

export default Users