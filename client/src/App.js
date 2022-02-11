import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])  // data - actual variable, setData - function for manipulation data variable
                                          // initial state is [{}]

  useEffect(() => {
      fetch('/users', {
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
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
      <div>

        {(typeof data.zamestnanci === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            data.zamestnanci.map((emp, i) => (
                <p key={i}>{emp}</p>
            ))
        )}
	
    </div>
  );
}

export default App;

