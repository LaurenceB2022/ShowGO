import React, {useState, useEffect, Alert} from 'react';
import 'index.css';
import styles from 'Components/LoginBox.module.css';
import { useLocation, useNavigate, Link } from 'react-router-dom'; 

const LoginBox = (props) => {
    const navigator1 = useNavigate();
    const navigator2 = useNavigate();
    const [postId, setPostId] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error,setError]=useState();
    const [posts, setPosts] = useState([]);
    var [_, setLoggedIn] = props.loggedIn;
    const [loggedInUserVenue, setLoggedInUserVenue] = props.loggedInUserVenue;

    const[values, setValues] = useState({
        username: '',
        password: ''
      });

    const handleLogin = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({values})
        };
        fetch('http://localhost:8080/venues', requestOptions)    
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                console.log(values)
                setLoggedIn(true);
                navigator1('/venuehome', {state: values.username})
            }
            else{
                setError('Invalid Login Credentials')
            }

        })
        .catch((error) => {
            console.error(error);
            setError('Invalid Login Credentials');
        }); 
    }


    function useLogin (event) {
        event.preventDefault()
        handleLogin()
    }

    const handleInput = (event) => {
        const{name, value} = event.target
        setValues({[name]: value})
    }

    return (
        <div className={styles.LoginBox}>
            <form onSubmit={useLogin}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input name='username' onChange={handleInput} type="username"></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input name='password' onChange={handleInput} type="password"></input>
                </div>
                <div className={styles.button_container}>
                    <button className={styles.ButtonStyle2} type="submit">Log In</button>
                    <button className={styles.ButtonStyle1} type='button' onClick={() => navigator2('/signup')}>Sign Up</button>
                    {/*<Link to='/signup' className={styles.ButtonStyle1}>Sign Up</Link>*/}
                </div>
                {error?<label>{error}</label>:null}   
            </form>             
            
            
        </div>
    )
}

export default LoginBox;