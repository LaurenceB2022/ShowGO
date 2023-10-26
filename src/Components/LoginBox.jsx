import React, {useState} from 'react';
import 'index.css';
import 'Components/LoginBox.css';
import {Link} from 'react-router-dom'

const LoginBox = () => {

    const[values, setValues] = useState({
        username: '',
        password: ''
      });

    const handleLogin = (event) => {
        event.preventDefault()
        console.log(values)
    }

    const handleInput = (event) => {
        const{name, value} = event.target
        setValues({[name]: value})
    }

    return (
        <div className="LoginBox">
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input name='username' onChange={handleInput} type="username"></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input name='password' onChange={handleInput} type="password"></input>
                </div>
                <button className='ButtonStyle1' type="submit">Log In</button>
            </form>             
            
            <Link to='/signup' className='ButtonStyle2'>Sign Up</Link>
        </div>
    )
}

export default LoginBox;