import { useState, useEffect } from 'react'


const LoggedInUser = () => {

    const [loggedInUser, setData] = useState([{}])

    useEffect(() => {
        fetch('/users/loggedInUser', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            loggedInUserResponse => {
                console.log({ loggedInUserResponse });
                return loggedInUserResponse.json()
            }
        ).then(
            loggedInUser => {
                setData(loggedInUser)
            }
        )
    }, [])
    return loggedInUser;


    // const loggedInUser = fetch('/users/loggedInUser', {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // })
    // return loggedInUser;
}

export default LoggedInUser