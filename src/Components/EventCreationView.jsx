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
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;
    const [venue, setVenue] = useState('');
    const username = usernameState.toString();
    const navigator = useNavigate();
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    const[error, setErrors] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [timeStartValue, setStartTime] = useState('10:00');
    const [timeEndValue, setEndTime] = useState('10:00');
    const[values, setValues] = useState({
        name: '',
        description: '',
        address: '',
        visible: true,
        max: 0,
        price: 0.0
      });
    
    function generateGUID(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = (c === 'x') ? r : (r&(0x3|0x8));
            return v.toString(16);
        });
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
    
    const createEvent = () => {
        console.log('Entered the createEvent method.')
        var valid = true;

        if(values.name === '' || values.address === '' || values.max <= 0 || values.price <= 0.0){
            console.log('missing values detected');
            setErrors('Error, one or more invalid or missing values have been detected.')
            valid = false;
        }
        if(startDate > endDate){
            console.log('invalid date range');
            setErrors('Error, invalid date range for event.')
            valid = false;
        }
        /*
        else if(startDate === endDate && timeStartValue > timeEndValue){
            setErrors('Error, invalid time range for event.')
        } */
        
        if(valid){
            var generated_guid = generateGUID();
            console.log('Values in the fields were verified, sending POST request.')
            var date_start_string = startDate.toDateString().split(' ');
            var date_end_string = endDate.toDateString().split(' ');
            var date_start = date_start_string[1] + " " + date_start_string[2] + " " + date_start_string[3];
            var date_end = date_end_string[1] + " " + date_end_string[2] + " " + date_end_string[3];
            console.log('Username: ' + username.toString())
            const requestOptionsVenue = {
                method: 'GET'
            }
            fetch('http://localhost:8080/venues/' + 'Venue23', requestOptionsVenue)
            .then(response => {
                console.log('Response.json: ' + response.json());
                if(response.ok){
                    setVenue(response.json())
                }
                else{
                    console.log('Venue could not be retreived');
                }
                })

            console.log(date_start + " " + date_end );
            console.log(venue);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({guid: generated_guid, venue: venue, start_date: date_start, ticket_price: values.price, end_date: date_end, name: values.name, description: values.description, location: values.address, hide_location: values.visible})
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
                {error?<label>{error}</label>:null} 
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