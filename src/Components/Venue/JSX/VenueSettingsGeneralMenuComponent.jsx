import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useContext} from 'react';
import defaultImage from 'Assets/Placeholder.svg'
import {useNavigate, Link } from 'react-router-dom';
import { MyContext } from 'App';

const VenueSettingsGeneralMenuComponent = () =>{
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;
    const [venue, setVenue] = useState('');
    const username = userState;
    const[type, setType] = useState('concert')
    const [error, setError] = useState('');
    const[imgfile, setFile] = useState(defaultImage);
    const[values, setValues] = useState({
        name: '',
        description: '',
        location: ''    
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

    const getVenueValues = (value_name, venue_object) =>{
        return venue_object.map((value_name) => value_name[venue_object]);
    }
    
    async function fetchVenue(username) {
        const requestOptions = {
            method: 'GET',
        };
        return await fetch('http://localhost:8080/venues/' + username, requestOptions)
        .then(response => response.json());
    }

    async function updateGeneral () {

        console.log('Updating General Info');
       
        if(true){
            var username_values = username[0];
            var username_string = username_values.username;
            //gets all necessary values from datavas
            var username_values = username[0];
            
            var username_string = username_values.username;
            console.log('Venue_name' + username_string);
            
            //var venue = fetchVenue(username_string);
            var retreived_username = username_string;
            var retreived_password = username_values.password;
            var retreived_location = username_values.location;
            var retreived_name = username_values.name;
            var hide_location = username_values.hide_location;
            var retreived_description = username_values.description;

            if(values.name !== ''){
                retreived_name = values.name;
            }
            if(values.description !== ''){
                retreived_description = values.description;
            }
            if(values.location !== ''){
                retreived_location = values.location;
            }

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
                console.log('Venue object:' + venue);
                setUser(venue);
                navigator('/venuesettings/general')
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
                    <img src={imgfile} alt="image_default"/> 
                    <input className={styles.button3} type="file" onChange={handleImage} />Choose File
                </span>
                
            </div>
            
            <div className={styles.description_container}>
                <span>
                    <label>Venue Name</label>
                    <input type='text' name='name' placeholder={username[0].name} onChange={handleInput}></input>
                </span>
                <span>
                    <label>Venue Description</label>
                    <input type='text' name='description' placeholder={username[0].description} onChange={handleInput}></input>
                </span>
                <span>
                    <label>Venue Location</label>
                    <input type='text' name='location' placeholder={username[0].location} onChange={handleInput}></input>
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
export default VenueSettingsGeneralMenuComponent;