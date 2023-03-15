# An Example of Frontend & Backend
When building a web application with a frontend and backend, it's common to make requests from the frontend to the backend to fetch or update data. In this example, we'll use a React app to demonstrate how to make requests to an Express backend API.

## Setting up the Express Backend
First, let's create a new Express app:

```bash
mkdir backend
cd backend
npm init -y
npm install express
```
Next, let's create a simple __API endpoint__ that returns a list of users:

```javascript
const express = require('express')
const app = express()

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]

app.get('/api/users', (req, res) => {
  res.json(users)
})

const port = 5000;
app.listen(port, () => {
  console.log('Server listening on port',port)
})
```

In this example, we define an Express app that listens on port 5000. We define a `/api/users` endpoint that returns a list of users as JSON.

## Making Requests from the React App with Axios
With the Express backend set up, we can now make requests to the API from the React app. Let's modify our UserList component to fetch the list of users from the backend API using axios:

```jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get('http://localhost:5000/api/users')
      setUsers(response.data)
    }
    fetchUsers()
  }, [])

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export default UserList
```

In this modified `UserList` component, we use the `axios.get` method to make a GET request to the `/api/users` endpoint on the Express backend API. We use the response data to update the users state in the component.

## Sending Data to the Backend with Axios
We can also use axios to send data to the backend API. Let's modify our CreateUser component to send a POST request to the backend API to create a new user:

```jsx
import React, { useState } from 'react'
import axios from 'axios'

function CreateUser() {
  const [name, setName] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    await axios.post('http://localhost:5000/api/users', { name })
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={event => setName(event.target.value)} />
      </label>
      <button type="submit">Create User</button>
    </form>
  )
}

export default CreateUser
```


In this modified CreateUser component, we use the `axios.post` method to send a POST request to the `/api/users` endpoint on the Express backend API with the name of the new user in the __request body__. ***We clear the name state in the component after the request is sent***.
