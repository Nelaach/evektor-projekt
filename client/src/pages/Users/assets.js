import React from 'react';
import FetchHardware from '../../helper/fetchHardware';
import { useParams } from "react-router-dom";

function Assets() {

    const data = FetchHardware();
    const { id } = useParams() //Get user id from url

    return (
        <div>
            <table className='styled-table' >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Asset_tag</th>
                    </tr>
                </thead>
                <tbody>
                    {(typeof data === 'undefined') ? (
                        <tr>
                            <td>Loading...</td>
                            <td>Loading...</td>
                            <td>Loading...</td>
                            <td>Loading...</td>
                        </tr>
                    ) : (
                        data.map((emp) => {
                            if(emp.assigned_to.id == id){
                            return (
                                <tr>
                                    <td>{emp.name}</td>
                                    <td>{emp.asset_tag}</td>
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

export default Assets;