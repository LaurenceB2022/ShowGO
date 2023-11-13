import 'index.css';
import styles from 'Components/VenueSettings.module.css';
import React, {useState, useEffect, useContext} from 'react';
import defaultImage from 'Assets/Placeholder.svg'
import {useNavigate, Link } from 'react-router-dom';
import { MyContext } from 'App';

const VenueSettingsGeneral = (props) =>{
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;
    const [venue, setVenue] = useState('');
    const username = userState.toString();
    const[type, setType] = useState('concert')
    const [error, setError] = useState('');
    const[imgfile, setFile] = useState(defaultImage);
    const[values, setValues] = useState({
        name: '',
        description: ''    
    });
    const navigator = useNavigate();

    function handleImage(event) {
        console.log(event.target.files);
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    const handleSubmit = (event) =>{
        console.log('Got to handleSubmit');
        event.preventDefault();
        updateGeneral();
    }
    
    async function fetchVenue(username) {
        const requestOptions = {
            method: 'GET',
        };
        return await fetch('http://localhost:8080/venues/' + username, requestOptions)
        .then(response => response.json());
    }

    async function updateGeneral () {
        var validate = true;
        if(values.name === '' || values.description){
            setError('Error, fields cannot be empty');
            validate = false;
        }
        console.log('Updating General Info');
       
        if(validate){
            var username_values = username.split(',');
            var username_string = username_values[0];
            var venue = fetchVenue(username_string);
            

            const requestOptions = {
                method: 'POST', //check the tag for the backend method being called
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                                    username: username_string,
                                    name: values.name,
                                    description: values.description
                                    })
            };
            fetch('http://localhost:8080/venues/settings/', requestOptions) //need to add @CrossOrigin(origins = "http://localhost:3000") to backend controller being accessed
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

    const handleType = (event) =>{
        setType(event.target.value)
    }

    const handleInput = (event) =>{
        console.log('Input detected.')
        const val = event.target.value;
        setValues({
            ...values,
            [event.target.name]: val
        }
        );
    }

    return(
        <div className={styles.general_container}>
            
            <div className={styles.image_container}>
                <label>Event Image</label>
                
                <span>
                    <img src={imgfile} alt=""/> 
                    <input className={styles.button3} type="file" onChange={handleImage} />Choose File
                </span>
                
            </div>
            <span>
                <label>Venue Name</label>
                <input type='text' name='name' onChange={handleInput}></input>
            </span>
            <div>
                <span>
                    <label>Venue Description</label>
                    <input type='text' name='description' onChange={handleInput}></input>
                </span>
                <span>
                    <label>Venue Type</label>
                    <select value={type} onChange={handleType}>
                        <option value='concert'>Concert</option>
                        <option value='food'>Food</option>
                        <option value='festival'>Festival</option>
                        <option value='other'>Other</option>
                    </select>
                </span>
                {error?<label>{error}</label>:null}   
            </div>
            <div className={styles.container_buttons}>
                    <button className={styles.button1} onClick={handleSubmit}>Save</button>
                    <button className={styles.button2} onClick={ console.log('Navigating back to home')}>
                    <Link to='/venuehome'>Cancel</Link></button>
            </div>
        </div>
    )
}
export default VenueSettingsGeneral;