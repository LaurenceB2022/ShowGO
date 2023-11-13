import 'index.css';
import styles from 'Components/EventCreation.module.css';
import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { MyContext } from 'App';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import defaultImage from 'Assets/Placeholder.svg'

const EventCreationView = () => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;
    const [venue, setVenue] = useState('');
    const username = userState;
    const navigator = useNavigate();

    const[error, setErrors] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const[values, setValues] = useState({
        name: '',
        description: '',
        address: '',
        visible: true,
        max: 0,
        price: 0.0
      });
    
    async function fetchVenue(username) {
        const requestOptions = {
            method: 'GET',
        };
        return await fetch('http://localhost:8080/venues/' + username, requestOptions)
        .then(response => response.json());
    }

    const[imgfile, setFile] = useState(defaultImage);

    const handleImage = (event) => {
        console.log(event.target.files);
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    const handleInput = (event) => {
        const val = event.target.type==='checkbox' ? event.target.checked : event.target.value;
        setValues({
            ...values,
            [event.target.name]: val
        }
        );
    }
    const handleSubmit = (event) =>{
        console.log('Got to handleSubmit');
        event.preventDefault();
        createEvent()
    }
    
    async function createEvent () {
        console.log('Entered the createEvent method.')
        var valid = true;

        if(values.name === '' || values.address === '' || values.description==='' || values.max <= 0 || values.price <= 0.0){
            console.log('missing values detected');
            setErrors('Error, one or more invalid or missing values have been detected.')
            valid = false;
        }
        if(startDate > endDate){
            console.log('invalid date range');
            setErrors('Error, invalid date range for event.')
            valid = false;
        }
        
        
        if(valid){
            console.log('Values in the fields were verified, sending POST request.')
            var date_start_string = startDate.toDateString().split(' ');
            var date_end_string = endDate.toDateString().split(' ');
            var date_start = date_start_string[1] + " " + date_start_string[2] + " " + date_start_string[3];
            var date_end = date_end_string[1] + " " + date_end_string[2] + " " + date_end_string[3];
            console.log('Username: ' + username.toString())

            var username_values = username[0];
            var username_string = username_values.username;
            console.log(username_values);
            
            var venue_object = await fetchVenue(username_string);

            console.log(date_start + " " + date_end );
            console.log(venue_object);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
                body: JSON.stringify({venue: venue_object, start_date: date_start, ticket_price: values.price, end_date: date_end, name: values.name, description: values.description, location: values.address, hide_location: values.visible, max_attendees: values.max})
            };
            fetch('http://localhost:8080/events', requestOptions)
            .then(response =>{
                if(response.ok){
                    console.log('Event added successfully to database.')
                    navigator('/venuehome')
                }
                else{
                    console.log('Error adding event.')
                    setErrors('Error adding event. Please try again later.')
                }
            })
        }
    }

    return (
        <div className={styles.container_full}>

            <div className={styles.image_container}>
                     
                <text>Title Here</text>
                <img src={imgfile} alt=""/>
            </div>

            <div className={styles.description_container}>
                
                <span>
                    <label>Event Image</label>
                    <input className={styles.button1} type="file" onChange={handleImage} />Choose File
                </span>
                <span>
                    <label>Event Name</label>
                    <input type='text' name='name' onChange={handleInput} />
                </span>
                <span>
                    <label>Event Description</label>
                    <input type='text' name='description' onChange={handleInput} />
                </span>
                <div className={styles.datetime_container}>
                    <label>Start Date</label>
                    <DatePicker className={styles.date} selected={startDate} onChange={(date) => setStartDate(date)} />
                    {/*<TimePicker className={styles.time} onChange={() => setStartTime()} value={timeStartValue} /> */}
                </div>
                <div className={styles.datetime_container}>
                    <label>End Date</label>
                    <DatePicker className={styles.date} selected={endDate} onChange={(date) => setEndDate(date)} />
                    {/*<TimePicker className={styles.time} onChange={() => setEndTime()} value={timeEndValue} /> */}
                </div>
                <span>
                    <label>Address</label>
                    <input type='text' name='address' onChange={handleInput} />
                </span>
                <span>
                    <label>Address Visible</label>
                    <input type='checkbox' name='visible' onChange={handleInput} />
                </span>
                <span>
                    <label>Max Attendees</label>
                    <input type='text' name='max' onChange={handleInput} />
                </span>
                <span>
                    <label>Ticket Price</label>
                    <input type='text' name='price' onChange={handleInput} />
                </span>
                <div className={styles.errorspace}>
                    {error?<label>{error}</label>:null} 
                </div>
                
                <div className={styles.button_container}>
                    <button className={styles.button1} onClick={handleSubmit}>Create Event</button>
                    <button className={styles.button2}>
                        <Link to='/venuehome'>Cancel</Link>
                    </button>
                </div>
                 
            </div>

        </div>
    )
}
export default EventCreationView;