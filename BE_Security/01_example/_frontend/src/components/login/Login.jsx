import React from 'react';
import axios from 'axios';

function Login() {

    const [user, setUser] = React.useState({ email: 'johndoe@mail.com', password: 'Abc1234!' });
    const [errors, setErrors] = React.useState([]);

    const changeHandler = function (e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submitHandler = async function (e) {
        e.preventDefault();
        setErrors([]);

        try {
            //send req to backend
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/users/signin',
                data: user
            });

            if (response.status === 200) {
                alert(response.data.message)
            }

            console.log(response);
        } catch (err) {
            
            if (err.response.status === 400) {
                setErrors(err.response.data.errors); 
            }

            if (err.response.status === 401) {
                setErrors([{msg: err.response.data.message}])
            }

            console.log(err);
        }
    }

    return (
        <div className='login-container'>
            <h3>Login here</h3>

            <form className="form"  onSubmit={submitHandler}>
                <input type="email" name="email" id="email" placeholder='email' className="form-control"  onChange={changeHandler} value={user.email} />
                <input type="password" name="password" id="password" placeholder='password' className="form-control" onChange={changeHandler} value={user.password} />
                <input type="submit" defaultValue="Login" className='login-btn' />
            </form>

            {errors.length > 0 && (
                <ul>
                    {errors.map((error, index) => (
                        <li className='error-msg' key={index}>{ error.msg }</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Login