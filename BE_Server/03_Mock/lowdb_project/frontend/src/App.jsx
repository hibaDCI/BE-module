import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => { 
    
    axios({
      url: "http://localhost:5000/users",
      method: 'GET'
    })
      .then(res => setUsers(res.data))
      .catch(err=> console.error(err.message))

   }, [])

  return (
    <div className="App">
      {users.map((user, index) => (<p key={index}> { user.id}: { user.name} </p>)
      )}
    </div>
  )
}

export default App
