import React from 'react'
import Users from "./Users"
import LoggedInUser from "./LoggedInUser"
import './shared.css'

function App() {

    const data = Users()
    const loggedInUser = LoggedInUser()

    return (
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

                    // data.zamestnanci.map((emp, i) => (
                    //     <p key="{i}"> {emp}</p>
                    // ))
                )}
            </tbody>
        </table>
    );
}

export default App;