import 'index.css';
import styles from 'Components/VenueSettings.module.css';
import React, {useState, useEffect, useContext} from 'react';
import defaultImage from 'Assets/Placeholder.svg'
import {useNavigate, Link } from 'react-router-dom';

const VenueSettingsGeneral = (props) =>{
    const venueName = props.username;
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
    

    function validate(){
        var valid = true;
        if(values.name === ''){
            setError('Error, name field cannot be empty');
            return false;
        }
    }

    const updateGeneral = (event) => {
        event.preventDefault();
        if(validate){
            const requestOptions = {
                method: 'POST', //check the tag for the backend method being called
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                                    username: venueName,
                                    name: values.name,
                                    description: values.description
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

    const handleType = (event) =>{
        setType(event.target.value)
    }

    const handleInput = (event) =>{
        const val = event.target.value;
        setValues({
            ...values,
            [event.target.name]: val
        }
        );
    }

    return(
        <div className={styles.general_container}>
            <div>
                <label >Venue Name</label>
                <input type='text' name='name' onChange={handleInput}></input>
            </div>
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
                    <button className={styles.button1} onClick={() => updateGeneral()}>Save</button>
                    <button className={styles.button2} onClick={navigator('/venuehome')}>Cancel</button>
            </div>
        </div>
    )
}
export default VenueSettingsGeneral;