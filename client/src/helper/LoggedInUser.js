import { useState, useLayoutEffect } from 'react'

const LoggedInUser = () => {

    const [loggedInUser, setData] = useState([{}])

    useLayoutEffect(() => {
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

    if (loggedInUser.loggedInUser === undefined) {
        setData({ loggedInUser: 'Unknown User' });
    }

    return loggedInUser;
}

export default LoggedInUser