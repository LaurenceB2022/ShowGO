import React, {useState} from 'react';
import 'index.css';
import {Link} from 'react-router-dom'

const LoginBox = () => {

    const[values, setValues] = useState({
        username: '',
        password: ''
      });

    const handleLogin = (event) => {
        event.preventDefault()
        event.log(values)
    }

    const handleInput = (event) => {
        setValues(old => ({ ...old, [event.target.name]: [event.target.value]}))
    }

    return (
        <div className="LoginBox">
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input value='username' onChange={(event) => handleInput(event.target.value)} type="username"></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input value='password' onChange={(event) => handleInput(event.target.value)} type="password"></input>
                </div>
                <button className='ButtonStyle1' type="submit">Log In</button>
            </form>             
            
            <Link to='/SignUp' className='ButtonStyle2'>Sign Up</Link>
        </div>
    )
}

export default LoginBox;