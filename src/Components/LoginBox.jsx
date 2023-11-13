import React, {useContext, useState} from 'react';
import 'index.css';
import styles from 'Components/LoginBox.module.css';
import { useNavigate, Link } from 'react-router-dom'; 
import { MyContext } from 'App';

const LoginBox = () => {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;

    const navigator = useNavigate();
    const [error, setError]=useState();
    const [usernameField, setUsernameField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const validate = () =>{
        var result = true;
        if(usernameField === '' || usernameField === null || passwordField === '' || passwordField === null){
            result = false;
            setError('Error, Missing Credentials.')
        }
        if(!(/^[a-zA-Z0-9]+$/.test(passwordField.valueOf))){
            result = false;
            setError('Error, Invalid Password Format.')
        }
        if(!(/^[a-zA-Z0-9]+$/.test(usernameField.valueOf))){
            result = false;
            setError('Error, Invalid Username Format.')
        }
        return result;
    }  
    const handleLogin = () => {
        
        if(validate){
            const requestOptions = {
                method: 'GET'
            };
            fetch('http://localhost:8080/login/' + usernameField + '/' + passwordField, requestOptions)    
            .then(login => {
                console.log(login);
                if (login.ok) {
                    var type;
                    fetch('http://localhost:8080/venues/' + usernameField, requestOptions)
                    .then(isVenue => {
                        type = isVenue.ok ? 'venue' : 'user'; 
                        return login.json();
                    }).then(data => {
                        setLoggedIn(true);
                        setUsername(data);
                        if(type == 'venue'){
                            setUserType('venue');
                            navigator('/venuehome');
                        } else{
                            setUserType('user');
                            navigator('/home');
                        }
                    });
                    
                } else {
                    console.error(error);
                    setError('Invalid Login Credentials');
                }
            });
        }
        
        
    }

    return (
        <div id={styles.content}>
            <div id={styles.logo}>
                <h1>Show</h1>
                <h1 id={styles.go}>GO</h1>
                <svg className={styles.ticket} viewBox="0 0 97 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.3362 78.651C24.0684 73.969 18.0452 72.7586 13.3605 75.1525L8.22779 69.5217C6.3979 67.5143 5.48294 66.5105 5.09635 65.3818C4.75632 64.3888 4.69487 63.3324 4.9208 62.3637C5.17769 61.2626 5.98016 60.3324 7.58509 58.4722L49.9972 9.31431C51.6022 7.45394 52.4046 6.52393 53.3737 6.20413C54.2263 5.92271 55.1643 5.9632 56.0539 6.31912C57.0652 6.72382 57.9801 7.72757 59.81 9.73504L64.9421 15.3652C62.9486 20.7115 64.1879 27.4683 68.4558 32.1503C72.7236 36.8323 78.7462 38.0422 83.4308 35.648L88.5629 41.2781C90.393 43.2858 91.3078 44.2894 91.6944 45.4182C92.0345 46.4113 92.0959 47.4672 91.8699 48.4361C91.6131 49.5372 90.8107 50.4672 89.2056 52.3276L46.7935 101.486C45.1886 103.346 44.3861 104.276 43.417 104.596C42.5645 104.877 41.6265 104.837 40.7368 104.481C39.7256 104.076 38.8107 103.072 36.9807 101.065L31.8493 95.4355C33.8428 90.0892 32.6041 83.333 28.3362 78.651Z"/>
                </svg> 
            </div>
            <div>
            
                <div>
                    <label htmlFor='username'>Username</label>
                    <input name='username' onChange={(e) => setUsernameField(e.target.value)}  type="username"></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input name='password' onChange={(e) => setPasswordField(e.target.value)}  type="password"></input>
                </div>
                <span className={styles.button_container}>
                    <button type="button" onClick={() => handleLogin()}>Log In</button>
                    <button className='button-enabled' type='button' onClick={() => navigator('/signup')}>Sign Up</button>
                    {/* <Link to='/signup' className={styles.ButtonStyle1}>Sign Up</Link> */}
                </span>
                {error?<label>{error}</label>:null}   
            
            
            </div>           
            
            
        </div>
    )
}

export default LoginBox;