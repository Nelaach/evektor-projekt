import React, { useLayoutEffect } from 'react';
import FetchUsers from '../../helper/fetchUsers';
import LoggedInUser from "../../helper/LoggedInUser";


function Users() {

    const loggedInUser = LoggedInUser();
    const isInGuestWifiGroup = loggedInUser.isInGuestWifiGroup;
    const data = FetchUsers();

    if (isInGuestWifiGroup == "False") { //Změnit hodnotu na true!

        return (
            <div>
                <h1>Users</h1>
                <table className='styled-table' >
                    <thead>
                        <tr>
                            <th>Jméno a přijmení</th>
                            <th>Email</th>
                            <th>Assets</th>
                            <th>List of assets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(typeof data.zamestnanci === 'undefined') ? (
                            <tr>
                                <td>Loading...</td>
                                <td>Loading...</td>
                                <td>Loading...</td>
                                <td>Loading...</td>
                            </tr>
                        ) : (
                            data.zamestnanci.map((emp) => {
                                if (emp.assets_count !== 0) {
                                    return (
                                        <tr key={emp.id.toString()}>{/* https://reactjs.org/docs/lists-and-keys.html#keys */}
                                            <td>{emp.name}</td>
                                            <td>{emp.email}</td>
                                            <td>{emp.assets_count}</td>
                                            <td><a href={"users/" + emp.id}>Přehled</a></td>
                                        </tr>
                                    )
                                }
                            })
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    else if(isInGuestWifiGroup === undefined){
        return ""
    }   
    else {
        return "Nedostatečný přístup"
    }
}

export default Users;