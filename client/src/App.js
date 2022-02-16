import React, { useState, useEffect } from 'react'
import './shared.css'

function App() {

  const [data, setData] = useState([{}])  // data - actual variable, setData - function for manipulation data variable
                                          // initial state is [{}]

  useEffect(() => {
      fetch('/users', {
          headers : {
              'Content-Type': 'application/json',
            //   'Accept': 'application/json'
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
                    return <tr key={emp.id.toString()}>   {/* https://reactjs.org/docs/lists-and-keys.html#keys */}
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.assets_count}</td>
                    </tr>;
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