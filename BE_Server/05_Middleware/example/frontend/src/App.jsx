import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

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
    <div className="container">
      <form className="form" onChange={changeHandler} onSubmit={submitHandler}>
        <div><label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" className="form-controller" />
        </div>

        <div><label htmlFor="lname">LastName</label>
        <input type="text" name="lname" id="lname" className="form-controller" />
        </div>

        <div><label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" className="form-controller" />
        </div>

        <div><label htmlFor="pass">Password</label>
        <input type="text" name="pass" id="pass" className="form-controller" />
        </div>

        <div><label htmlFor="type">Type</label>
        <input type="text" name="type" id="type" className="form-controller" />
        </div>

        <input type="submit" value="Register" className='btn btn-primary' />

      </form>
    </div>
  )
}

export default App
