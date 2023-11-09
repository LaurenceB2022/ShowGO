import 'index.css';
import styles from 'Components/EventCreation.module.css';
import React, {useState, useEffect} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import defaultImage from 'Assets/Placeholder.svg'
import { MyContext } from 'App';

const EventCreationView = (props) => {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;
    const navigator = useNavigate();

    const[error, setErrors] = useState('');
    const[values, setValues] = useState({
        name: '',
        start: '',
        end: '',
        address: '',
        visible: true,
        max: 0,
        price: 0.0
      });
    
    const[imgfile, setFile] = useState(defaultImage);

    function handleImage(event) {
        console.log(event.target.files);
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    function handleInput(event) {
        const val = event.target.type==='checkbox' ? event.target.checked : event.target.value;
        setValues({
            ...values,
            [event.target.name]: val
        }
        );
    }

    const validateEvent = () =>{
        const valid = true;
        if(values.name === '' || values.address === '' || values.start ==='' || values.end === '' || values.max <= 0 || values.price <= 0.0){
            setErrors('Error, one or more invalid or missing values have been detected.')
            valid = false;
        }
        return valid;
    }
    
    const createEvent = (event) => {
        event.preventDefault();

        if(validateEvent){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({eventname: values.name, startdate: values.start, enddate: values.end, address: values.address, visibility: values.visible, maxattendees: values.max, ticketprice: values.price})
            };
            fetch('http://localhost:8080/', requestOptions)
            .then(response =>{
                if(response.ok){
                    navigator('/venuehome')
                }
                else{
                    setErrors('Error adding event. Please try again later.')
                }
            })
        }
    }

    return (
        <div className={styles.container_full}>

            <div className={styles.image_container}>
                <span>
                    <text>Title Here</text>
                </span>
                <img src={imgfile} alt=""/>
            </div>

            <div className={styles.description_container}>
                <span>
                    <label>Event Image</label>
                    <input className={styles.button1} type="file" onClick={() => handleImage()}>Choose File</input>
                </span>
                <span>
                    <label>Event Name</label>
                    <input type='text' name='name' onChange={() => handleInput()}></input>
                </span>
                <span>
                    <label>Start Date</label>
                    <input type='text' name='start' onChange={() => handleInput()}></input>
                </span>
                <span>
                    <label>End Date</label>
                    <input type='text' name='end' onChange={() => handleInput()}></input>
                </span>
                <span>
                    <label>Address</label>
                    <input type='text' name='address' onChange={() => handleInput()}></input>
                </span>
                <span>
                    <label>Address Visible</label>
                    <input type='checkbox' name='visible' checked='checked'></input>
                </span>
                <span>
                    <label>Max Attendees</label>
                    <input type='text' name='max' onChange={() => handleInput()}></input>
                </span>
                <span>
                    <label>Ticket Price</label>
                    <input type='text' name='price' onChange={() => handleInput()}></input>
                </span>
                <div className={styles.button_container}>
                    <button className={styles.button1} onClick={() => createEvent()}>Create Event</button>
                    <button className={styles.button2}>
                        <Link to='/venuehome'>Cancel</Link>
                    </button>
                </div>
            </div>

        </div>
    )
}
export default EventCreationView;