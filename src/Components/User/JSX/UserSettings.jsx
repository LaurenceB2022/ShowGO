import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/User/CSS/UserSettings.module.css';
import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import Resizer from "react-image-file-resizer";

/*
    UserSettings allows a user to change their display name, password, and profile picture. Displays errors if inputted data is invalid.
*/
export default function UserSettings() {
    const [user, setUser] = useContext(MyContext).userState;
    const [error, setError] = useState('');
    var timeout = null;
    
    const loggedInState = useContext(MyContext).loggedInState;
    const navigator = useNavigate(); 
    //Stores inserted data
    var [data, setData] = useState({
        name: user ? user.name : '',
        password: '',
        confirm_password: '',
        pfp: user ? user.pfp : null
    });

    useEffect(() => {
        //If not logged in, redirect to login screen
        if(!loggedInState[0]) {
            navigator('/login');
        }
    }, [loggedInState, navigator]);

    //Updates the error message with the given timeout length in ms
    function updateError(message, ms) {
        if(timeout) {
            clearTimeout();
        }
        setError(message);
        timeout = setTimeout(() =>{
            setError("");
        }, ms);
    }

    //Handles profile picture input. Converts the image to base64 to allow it to be stored and resizes to 300x300.
    async function handleImage (event) {
        const file = event.target.files[0];
        
        if (!file) {
            setData({
                ...data,
                'pfp': null
                }); 
            return;
        };

        //Resize image to reduce load times
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {
                setData({
                    ...data,
                    'pfp': uri
                    }); 
            }, 'base64');
    }

    //Validates the entered username and password fields
    function validateInformation(){
        //Password fields should be empty or both filled correctly
        if(data.name.length < 1 || data.name.length > 40) {
            updateError('Invalid username entered.', 2500);
            return false;
        }

        if((data.password !== '' && data.confirm_password === '') || (data.password === '' && data.confirm_password !== '')) {
            updateError('Please fill both password fields.', 2500);
            return false;
        }
        if(data.password !== '' && data.confirm_password !== ''){
            if(!(/^[a-zA-Z0-9!?#$&*]+$/.test(data.password) && data.password.match(/[!?#$&*]/) && data.password.match(/[A-Z]/) && data.password.length >= 8 && data.password.length <= 40 && data.password === data.confirm_password)){
                updateError('Invalid password entered.', 2500);
                return false;
            }
        }
        return true;
    }

    //Saves the user if entered information is invalid
    function save() {
        var valid = validateInformation();
        if (!valid) return;
            
            var requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: user.username,
                    name: data.name,
                    password: data.password ? data.password : user.password,
                    pfp: data.pfp
                })
            };
            fetch('http://localhost:8080/user/settings', requestOptions)
            .then(response => {
                return response.ok ? response.json() : null;
            }).then(data => {
                if (data) {
                    setUser(data);
                    updateError('Settings update successful.', 2500);
                } else {
                    updateError('Settings update unsuccessful.', 2500);
                }
            });
    }

    //Updates state values based on input
    function handleInput(event) {
        const value = event.target.value;
        setData({
            ...data,
            [event.target.name]: value
        }
        );
    }
    
    return(
        <div id={styles.content}>
                <div id={styles.section_1}>
                    <div id={styles.form_container}>
                        <label className={styles.label + ' ' + styles.col_1}>Display Name</label>
                        <input name='name' maxLength='40' className={styles.input + ' ' + styles.col_2_3} value={data.name} onChange={(event) => handleInput(event)}></input>

                        <label className={styles.label + ' ' + styles.col_1}>New Password</label>
                        <input name='password' maxLength='40' className={styles.input + ' ' + styles.col_2_3} onChange={(event) => handleInput(event)}></input>
                        
                        <label className={styles.label + ' ' + styles.col_1}>Confirm Password</label>
                        <input name='confirm_password' maxLength='40' className={styles.input + ' ' + styles.col_2_3} onChange={(event) => handleInput(event)}></input>
                    </div>
                </div>
                <div id={styles.section_2}>
                    <img alt='pfp' name='image' id={styles.img} src={data.pfp ? data.pfp : ShowGoLogo}/>
                    <input accept="image/*" className={styles.input + ' ' + styles.col_2_3} type="file" onChange={handleImage}/>
                </div>
                <button id={styles.save} className='button_enabled' onClick={()=>save()}>Save</button>
                <button id={styles.cancel} onClick={() => navigator('/home')}>Cancel</button>
                <p className={styles.p}>{error}</p>
        </div>
    )
}