import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

function App() {
  const [user, setUser] = useState({});

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async(e) => {
    e.preventDefault();

    //send request to backend server
    const BE_res = await axios({
      url: 'http://localhost:5000/register',
      method: 'POST',
      data: user
    });

    console.log(BE_res);
  }

  return (
    <div className="w-100 row border border-secondary rounded p-5">
      <h1 className='display-5 fw-bold mb-4 mx-auto'>Register Form</h1>
      <form  onChange={changeHandler} onSubmit={submitHandler}>
        <div className='mb-3 d-flex flex-column'>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className="form-controller p-1 " />
        </div>

        <div className='mb-3 d-flex flex-column'>
          <label htmlFor="lname">LastName</label>
          <input type="text" name="lname" id="lname" className="form-controller p-1 " />
        </div>

        <div className='mb-3 d-flex flex-column'>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" className="form-controller p-1 " />
        </div>

        <div className='mb-3 d-flex flex-column'>
          <label htmlFor="pass">Password</label>
          <input type="text" name="pass" id="pass" className="form-controller p-1 " />
        </div>

        <div className='mb-3 d-flex flex-column'>
          <label htmlFor="type">Type</label>
          <input type="text" name="type" id="type" className="form-controller p-1 " />
        </div>

        <input type="submit" value="Register" className='w-100 btn btn-outline-primary mt-4' />

      </form>
    </div>
  )
}

export default App
