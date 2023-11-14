import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useContext} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { MyContext } from 'App';

const VenueSettingsSecurityMenuComponent = () => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;
    const [venue, setVenue] = useState('');
    const username = userState;
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
        setPasswordChecks([/^[a-zA-Z0-9]+$/.test(values.password), values.password.length >= 6])
    }

    const getVenueValues = (value_name, venue_object) =>{
        return (venue_object).map((row) => row[value_name]);
    }

    async function fetchVenue(username) {
        const requestOptions = {
            method: 'GET',
        };
        return await fetch('http://localhost:8080/venues/' + username, requestOptions)
        .then(response => response.json());
    }

    const handleSubmit = (event) =>{
        console.log('Got to handleSubmit');
        event.preventDefault();
        updateSettings();
    }

    async function updateSettings (){
        var valid = true;
        setEmailChecks(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+[@][a-zA-Z0-9]+[.][a-zA-Z0-9.]+$/.test(values.email))

        if(values.password === '' && values.confirmPassword === ''){
            setError('Error, missing fields.')
            valid = false;
        }
        
        if(passwordChecks[0] == false || passwordChecks[1] == false){
            setError('Error, password does not meet minimum requirements.')
            valid = false;
        }
        if ((values.password).localeCompare(values.confirmPassword) !== 0){ 
            
            setError('Error, passwords do not match.');
            valid = false;
            

        }

        if(valid){
            console.log(username[0]);
            var username_values = username[0];
            
            var username_string = username_values.username;
            console.log(username_string);
            
            var retreived_username = username_string;
            var retreived_password = values.password;
            var retreived_location = username_values.location;
            var retreived_name = username_values.name;
            var hide_location = username_values.hide_location;
            var retreived_description = username_values.description;
            
            console.log(retreived_username  + ' ' + retreived_password + ' ' + retreived_location + ' ' + retreived_name + ' ' + hide_location + retreived_description);

            const requestOptions = {
                method: 'POST', //check the tag for the backend method being called
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                                        username: retreived_username,
                                        password: retreived_password,
                                        location: retreived_location,
                                        name: retreived_name,
                                        hide_location: hide_location,
                                        description: retreived_description
                                    })
            };
            fetch('http://localhost:8080/venues/settings', requestOptions) //need to add @CrossOrigin(origins = "http://localhost:3000") to backend controller being accessed
            .then(response => {
            if (response.ok) {
                var venue = fetchVenue(username_string);
                console.log(venue);
                setUser(venue);
                setError('Successful password reset!')
                navigator('/venuesettings/security')
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
                <button className={styles.button1} onClick={handleSubmit}>Save</button>
                <button className={styles.button2} onClick={console.log('Navigating back to home')}>
                    <Link to='/venuehome'>Cancel</Link>
                </button>
            </div>
        </div>
    )
}
export default VenueSettingsSecurityMenuComponent;