import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useContext} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { MyContext } from 'App';

/*
    The VenueSettingsSecurityMenuComponent subpage displays fields for the user to modify their password using. 
*/
const VenueSettingsSecurityMenuComponent = () => {
    const userState = useContext(MyContext).userState;
    const loggedInState = useContext(MyContext).loggedInState;
    const [, setLoggedIn] = loggedInState;
    const [, setUser] = userState;
    const username = userState;
    const [error, setError] = useState('');
    const [passwordChecks, setPasswordChecks] = useState([false, false]);
    const [values, setValue] = useState({
        password: '',
        confirmPassword: ''
    });

    const navigator = useNavigate();

    /*
        handleInput constant handles the user's input based on the field modified, and sets the value using
        setValue. Updates the value of passwordChecks using setPasswordChecks.
    */
    const handleInput = (event) => {
        const val = event.target.value;
        setValue({
            ...values,
            [event.target.name]: val
        }
        );
        setPasswordChecks([/^[a-zA-Z0-9]+$/.test(values.password), values.password.length >= 6])
    }

    /*
        handleSubmit constant handles the user submitting the new password using the "Save" button. 
        Prevents any default submissions, and calls the updateSettings function.
    */

    const handleSubmit = (event) =>{
        event.preventDefault();
        updateSettings();
    }

    /*
        checkValid function validates the sub variables stored in the values constant. Returns true if
        all of the fields match the requirements, false otherwise.
    */

    function checkValid(){
        var valid = true;

        if(values.password === '' && values.confirmPassword === ''){
            setError('Error, missing fields.')
            valid = false;
        }
        
        if(passwordChecks[0] === false || passwordChecks[1] === false){
            setError('Error, password does not meet minimum requirements.')
            valid = false;
        }
        if ((values.password).localeCompare(values.confirmPassword) !== 0){ 
            
            setError('Error, passwords do not match.');
            valid = false;

        }
        return valid;
    }


    /*
        updateSettings function asynchronously calls the checkValid method to verify the field information.
        If valid, calls an API POST request to store the new password values using the venues backend database,
        and refreshes the page. Otherwise, nothing happens.
    */
    async function updateSettings (){
        var valid = checkValid();

        if(valid){
            var username_values = username[0];      
            var username_string = username_values.username;
            
            var retreived_username = username_string;
            var retreived_password = values.password;
            var retreived_location = username_values.location;
            var retreived_name = username_values.name;
            var hide_location = username_values.hide_location;
            var retreived_description = username_values.description;
            
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
               setError('')
               return response.json(); 
                
            }
            else{
                setError('Unexpected Error occurred. Try again later.')
            } 
        })
        .then(retrievedVenue =>{
            if(retrievedVenue === null){
                setLoggedIn(false);
            }
            else{
                setUser(retrievedVenue)
                setError('Successful password reset!')
                navigator('/venuesettings/security')
            }
        })
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
              
            <div className={styles.button_container}>
                <button className={styles.button1} onClick={handleSubmit}>Save</button>
                <button className={styles.button2} onClick={() => {}}>
                    <Link to='/venuehome'>Cancel</Link>
                </button>
            </div>
            {error?<label id={styles.error}>{error}</label>:null} 
        </div>
    )
}
export default VenueSettingsSecurityMenuComponent;