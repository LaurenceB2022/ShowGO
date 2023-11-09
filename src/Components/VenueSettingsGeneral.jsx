import 'index.css';
import styles from 'Components/VenueSettings.module.css';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const VenueSettingsGeneral = (props) =>{
    const[type, setType] = useState('concert')
    const[values, setValues] = useState({
        name: '',
        description: ''    
    })
    const venueName = props.username;

    function validate(){
        const valid = true;
        if(values.description == '' || values.name == ''){

        }
    }

    const updateGeneral = () => {

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
        <div>
            <div>
                <label >Venue Name</label>
                <input type='text' name='name' onChange={() => handleInput()}></input>
            </div>
            <div>
                <span>
                    <label>Venue Description</label>
                    <input type='text' name='description' onChange={() => handleInput()}></input>
                </span>
                <span>
                    <label>Venue Type</label>
                    <select value={type} onChange={() => handleType()}>
                        <option value='concert'>Concert</option>
                        <option value='food'>Food</option>
                        <option value='festival'>Festival</option>
                        <option value='other'>Other</option>
                    </select>
                </span>
            </div>
        </div>
    )
}
export default VenueSettingsGeneral;