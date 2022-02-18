import React from 'react';
import UserData from '../../Users';

function Users() {

    const data = UserData();

    return (
        <div>
            <h1>Users</h1>
            <table className='styled-table' >
                <thead>
                    <tr>
                        <th>Jméno a přijmení</th>
                        <th>Email</th>
                        <th>Assets</th>
                    </tr>
                </thead>
                <tbody>
                    {(typeof data.zamestnanci === 'undefined') ? (
                        <tr>
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
                                    </tr>
                                )
                            }
                            return ""
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users;