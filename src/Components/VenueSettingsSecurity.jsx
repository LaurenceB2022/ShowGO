import 'index.css';
import styles from 'Components/VenueSettings.module.css';
import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, Link } from 'react-router-dom';

const VenueSettingsSecurity = (props) => {
    const username = props.username;
    const [error, setError] = useState('');
    const [passwordChecks, setPasswordChecks] = useState([false, false]);
    const [emailChecks, setEmailChecks] = useState(false);
    const [values, setValue] = useState({
        password: '',
        confirmPassword: ''
    });

    /*
    const [auth, setAuth] = useState({
        email: '',
        enabled: false
    }); */
    const navigator = useNavigate();

    const handleInput = (event) => {
        const val = event.target.type==='checkbox' ? event.target.checked : event.target.value;
        setValue({
            ...values,
            [event.target.name]: val
        }
        );
    }

    function validate(){
        var valid = true;
        setPasswordChecks([/^[a-zA-Z0-9]+$/.test(values.password), values.password.length >= 6])
        setEmailChecks(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+[@][a-zA-Z0-9]+[.][a-zA-Z0-9.]+$/.test(values.email))

        if(values.password === '' && values.confirmPassword === ''){
            setError('Error, missing fields.')
            valid = false;
        }
        if(!passwordChecks[true, true]){
            setError('Error, password does not meet minimum requirements.')
            valid = false;
        }
        else{
            if((values.password).localeCompare(values.confirmPassword) != 0){
                setError('Error, passwords do not match.')
                valid = false;
            }

        }
        /* Email Authentication for later
        if(values.email != '' && !emailChecks){
            setError('Error, invalid email.')
            valid = false;
        } */
        return valid;
        
    }

    const updateSettings = (event) => {
        event.preventDefault();
        if(validate()){
           
            /*
            const requestOptions = '';
            //If updating password and auth email
            if(values.password != '' && values.email != ''){
                requestOptions = {
                    method: 'POST', //check the tag for the backend method being called
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({ 
                                        username: username,
                                        password: values.password, 
                                        email: values.email })
                };

            } //If updating email
            else if(values.password == '' && values.email != ''){
                requestOptions = {
                    method: 'POST', //check the tag for the backend method being called
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({ 
                                        username: username,
                                        email: values.email })
                };
            } //If updating password
            */
            
            const requestOptions = {
                method: 'POST', //check the tag for the backend method being called
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                                    username: username,
                                    password: values.password
                                    })
            };
            fetch('http://localhost:8080/venues', requestOptions) //need to add @CrossOrigin(origins = "http://localhost:3000") to backend controller being accessed
            .then(response => {
            if (response.ok) {
                navigator('/venuehome')
            }
            else{
                setError('Unexpected Error occurred. Try again later.')
            } 
        }); 
        }

            
    }
    

    return (
        <div className={styles.security_container}>
            <span>
                <label>Change Password</label>
                <input type='password' name='password' onChange={handleInput}></input>
            </span>
            <span>
                <label>Confirm Password</label>
                <input type='password' name='confirmPassword' onChange={handleInput}></input>
            </span>
            <span>
                <label>Two-Factor Authentication</label>
                <input type='text' name='email' onChange={handleInput}></input>
                <input type='checkbox' name='twofactorauth' onChange={handleInput}></input>
            </span>
            {error?<label>{error}</label>:null}   
            <div className={styles.button_container}>
                <button className={styles.button1} onClick={updateSettings}>Save</button>
                <button className={styles.button2} onClick={navigator('/venuehome')}>Cancel</button>
            </div>
        </div>
    )
}
export default VenueSettingsSecurity;