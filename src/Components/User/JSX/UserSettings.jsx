import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/User/CSS/UserSettings.module.css';
import React, {useContext, useState, useEffect} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const UserSettings = () => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;
    const [error, setError] = useState('');
    const username = userState[0];
    const navigator = useNavigate(); 

    const [data, setData] = useState({
        name: '',
        password: '',
        confirm_password: ''
    });

    function validateInformation(){
        var valid = true;
        
        if(data.password !== '' && data.confirm_password !== ''){
            if(!/^[a-zA-Z0-9!?#$&*]+$/.test(data.password) || data.password !== data.confirm_password || data.password.length < 8 || data.password.length > 40){
                valid = false;
                setError('Error, invalid password entered.')
            }
        }
        if((data.password !== '' && data.confirm_password === '') || (data.password === '' && data.confirm_password !== '')){
            valid = false;
            setError('Error, missing fields.')
        }
        return valid;
    }

    function submitInformation(){
        var valid = validateInformation();
        if(valid){
            var user_values = username;
            var username_string = user_values.username;
            var name_string = user_values.name;
            var password_string = user_values.password;
            var image_string = user_values.pfp;
            if(data.name !== ''){
                name_string = data.name;
                console.log('Reached name')
            }
            if(data.password !== '' && data.confirm_password !== ''){
                password_string = data.password;
            }
            console.log(username)
            console.log(username_string)
            console.log(name_string)
            
            
            var requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username_string,
                    name: name_string,
                    password: password_string,
                    pfp: image_string
                })
            }
            console.log('Reached here')
            fetch('http://localhost:8080/user/settings', requestOptions) //need to add @CrossOrigin(origins = "http://localhost:3000") to backend controller being accessed
            .then(response => {
                return response.ok ? response.json() : null;
            }).then(data => {
                if (data) {
                    console.log(data);
                    setUser(data);
                    setError('Update Successful.')
                    navigator('/home')
                    
                } else {
                    setError('Error, unsucessful update attempt. Try again later.')
                    console.log("Error creating user");
                    navigator('/settings')
                }
            });
                 
        }
        else{
            setError('Error, invalid password entered.')
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        submitInformation();
    }

    const handleInput = (event) =>{
        const value = event.target.value;
        setData({
            ...data,
            [event.target.name]: value
        }
        );
    }
    
    /*Add functionality to change image, display name, password */
    return(
        <div className={styles.content}>
            <span className={styles.span_format}>
                <label>Display Name</label>
                <input type='text' name='name' value={data.name} onChange={handleInput}></input>
            </span>
            <span className={styles.span_format}>
                <label>New Password</label>
                <input type='text' name='password' value={data.password} onChange={handleInput}></input>
            </span>
            <span className={styles.span_format}>
                <label>Confirm Password</label>
                <input type='text' name='confirm_password' value={data.confirm_password} onChange={handleInput}></input>
            </span>
            <div className={styles.errorspace}>
                    {error?<label>{error}</label>:null} 
                </div>
            <div className={styles.container_buttons}>
                <button className={styles.button1} onClick={handleSubmit}>Save</button>
                <button className={styles.button2} onClick={console.log('Navigating back to home')}>
                    <Link to='/home'>Cancel</Link>
                </button>
            </div>
        </div>
    )
}
export default UserSettings;