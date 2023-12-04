import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useContext} from 'react';
import defaultImage from 'Assets/Placeholder.svg'
import {useNavigate, Link } from 'react-router-dom';
import { MyContext } from 'App';
import Resizer from "react-image-file-resizer";

/*
    VenueSettingsGeneralMenueComponent is the general settings subpage, which allows user to update their
    venue account settings using the input forms displayed. Also allows for venue's to update their profile
    picture.
*/

const VenueSettingsGeneralMenuComponent = () =>{
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUser] = userState;
    const username = userState;
    const [error, setError] = useState('');
    const[imgfile, setFile] = useState(defaultImage);
    const[values, setValues] = useState({
        name: '',
        description: '',
        location: '',
        visibility: ''    
    });
    const navigator = useNavigate();

    //Handles profile picture input. Converts the image to base64 to allow it to be stored and resizes to 300x300.
    async function handleImage (event) {
        const file = event.target.files[0];
        
        if (!file) {
            setFile(null); 
            return;
        };

        //Resize image to reduce load times
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {setFile(uri)}, 'base64');
    }


    /*
        handleSubmit constant detects the selection of the "Save" button. Then prevents a default selection,
        and calls the updateGeneral function to update the venue's information.
    */
    const handleSubmit = (event) =>{
        event.preventDefault();
        updateGeneral();
    }


    /*
        updateGeneral function asynchronously updates the venue's general information using the values
        stored in the values sub variable fields. Only updates fields where the values aren't empty.
        Sends a fetch POST request to the venue/settings backend. If successful, refreshes the sub-page to
        display the new values. Otherwise sets an error message using the setError constant.
    */
    async function updateGeneral () {

            //gets all necessary values from data
            var username_values = username[0];
            var retreived_location = username_values.location;
            var retreived_name = username_values.name;
            var hide_location = values.visibility;
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
                                    username: username_values.username,
                                    password: username_values.password,
                                    location: retreived_location,
                                    name: retreived_name,
                                    hide_location: hide_location,
                                    description: retreived_description
                                    })
            };
            fetch('http://localhost:8080/venues/settings', requestOptions) //need to add @CrossOrigin(origins = "http://localhost:3000") to backend controller being accessed
            .then(response => {
            if (response.ok) {
                return response.json();
                
            }
            else{
                setError('Unexpected Error occurred. Try again later.')
                return null;
            } 
            
        })
        .then(retreivedVenue => {
            if(retreivedVenue === null){
                setLoggedIn(false);
            }
            else{
                setUser(retreivedVenue)
                setError('Successfully changed general information.')
                navigator('/venuesettings/general')
            }
        })
        
    }

    /*
        handleInput function handles the event type and value from the input detected, and updates the
        corresponding values stored in the values sub variable fields using the setValues constant.
    */
    const handleInput = (event) =>{
        const val = event.target.type==='checkbox' ? event.target.checked : event.target.value;
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
                    <input accept="image/*" className={styles.button3} type="file" onChange={handleImage} />Choose File
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
                    <label>Event Visibility</label>
                    <input type='checkbox' name='visibility' onChange={handleInput}></input>
                </span>
                {error?<label>{error}</label>:null}   
            </div>
            <div className={styles.container_buttons}>
                    <button className={styles.button1} onClick={handleSubmit}>Save</button>
                    <button className={styles.button2} onClick={() => {}}>
                    <Link to='/venuehome'>Cancel</Link></button>
            </div>
        </div>
    )
}
export default VenueSettingsGeneralMenuComponent;