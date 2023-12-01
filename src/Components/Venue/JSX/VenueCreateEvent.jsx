import 'index.css';
import styles from 'Components/Venue/CSS/VenueCreateEvent.module.css';
import React, {useState, useContext} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { MyContext } from 'App';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Resizer from "react-image-file-resizer";



const VenueCreateEvent = () => {
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
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('10:00');
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

    const[imgfile, setFile] = useState(null);

    //Handles profile picture input. Converts the image to base64 to allow it to be stored and resizes to 300x300.
    async function handleImage (event) {
        const file = event.target.files[0];
        
        if (!file) {
            setFile(null);
            return;
        };

        //Resize image to reduce load times
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
            uri => {
            setFile(uri);
            }, 'base64');
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

    function checkValid(){
        var tempStartTime = startTime.split(':');
        var tempEndTime = endTime.split(':');
        console.log(tempStartTime[0])
        console.log(tempEndTime[0])

        if(values.name === '' || values.location !== '' || values.max <= 0 || values.price <= 0.0){
            console.log('missing values detected');
            setErrors('Error, one or more invalid or missing values have been detected.')
            return false;
        }
        if(startDate > endDate ){
            console.log('invalid date range');
            setErrors('Error, invalid date range for event.')
            return false;
        }
        if(startTime.split(':').length !== 2 && endTime.split(':').length !== 2){
            return false;
        }
        if((startDate === endDate) && (tempStartTime[0] > tempEndTime[0])){
            setErrors('Error, invalid time range for event.')
            console.log(tempStartTime[0])
            console.log(tempEndTime[0])
            return false;
        }
        if((startDate === endDate) && (tempStartTime[0] === tempEndTime[0]) && (tempStartTime[1] > tempEndTime[1])){
            setErrors('Error, invalid time range for event')
            console.log(tempStartTime[1])
            console.log(tempEndTime[1])
            return false;
        }
        return true;
    }

    
    
    async function createEvent () {
        console.log('Entered the createEvent method.')
        var valid = checkValid();
        console.log(startTime)
        console.log(endTime);
        
        
        if(valid === true){
            console.log('Values in the fields were verified, sending POST request.')
            var am_pm_start = 'AM'
            var am_pm_end = 'AM'
            var date_start_string = startDate.toDateString().split(' ');
            var date_end_string = endDate.toDateString().split(' ');
            var date_start_time = startTime.toString().split(':');
            var date_end_time = endTime.toString().split(':');
            var date_start_hour = (date_start_time[0]%12).toString().padStart(2, '0');
            var date_end_hour = (date_end_time[0]%12).toString().padStart(2, '0');
            if(parseInt(date_start_time[0]) > 12){
                am_pm_start = 'PM'
            }
            if(parseInt(date_end_time[0]) > 12){
                am_pm_end = 'PM'
            }
            


            var date_start = date_start_string[1] + " " + date_start_string[2] + " " + date_start_string[3] + " " + (date_start_hour) + ":" + date_start_time[1] + " " + am_pm_start;
            var date_end = date_end_string[1] + " " + date_end_string[2] + " " + date_end_string[3] + " " + (date_end_hour) + ":" + date_start_time[1] + " " + am_pm_end;
            console.log('Username: ' + username.toString())
            console.log(new Date(date_start))
            console.log(new Date(date_end))
            if(new Date(date_end) < new Date()){
                console.log(new Date())
            }

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
                body: JSON.stringify({
                    venue: venue_object,
                    start_date: date_start,
                    ticket_price: values.price,
                    end_date: date_end,
                    name: values.name,
                    description: values.description,
                    location: values.address,
                    hide_location: values.visible,
                    max_attendees: values.max,
                    image: imgfile})
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
                    <input type='time' className={styles.time} min="00:00" max="23:59" onChange={(event) => setStartTime(event.target.value)}/>
                </div>
                <div className={styles.datetime_container}>
                    <label>End Date</label>
                    <DatePicker className={styles.date} selected={endDate} onChange={(date) => setEndDate(date)} />
                    <input type='time' className={styles.time} min="00:00" max="23:59" onChange={(event) => setEndTime(event.target.value)}/>
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
export default VenueCreateEvent;