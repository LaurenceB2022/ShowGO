import 'index.css';
import styles from 'Components/Venue/CSS/VenueCreateEvent.module.css';
import React, {useState, useContext} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { MyContext } from 'App';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Resizer from "react-image-file-resizer";

/*
    VenueCreateEvent component handles the user input to create an event associated with the current venue.
    Validates the user input, and displays a preview for any selected image for the event.
*/

const VenueCreateEvent = () => {
    const userState = useContext(MyContext).userState;
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
    const[imgfile, setFile] = useState(null);

    /*
      fetchVenue function asynchronously calls an API request to the venue backend, to get the venue object
      associated with the passed in venue name.
    */
    async function fetchVenue(username) {
        const requestOptions = {
            method: 'GET',
        };
        return await fetch('http://localhost:8080/venues/' + username, requestOptions)
        .then(response => response.json());
    }

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

    /*
        handleInput constant handles each detected input event from the user. Based on the event type,
        it modifies the subvalue stored in the values constant using setValues.
    */
    const handleInput = (event) => {
        const val = event.target.type==='checkbox' ? event.target.checked : event.target.value;
        setValues({
            ...values,
            [event.target.name]: val
        }
        );
    }
    /*
        handleSubmit constant handles the submission of the component data upon clicking the "Save" button. 
        Prevents an empty event from being submitted. If not default, called the createEvent function.
    */
    const handleSubmit = (event) =>{
        event.preventDefault();
        createEvent()
    }

    /*
        checkValid function extracts the sub-variables stored in the values constant, and checks if they
        are valid for the fields. If valid, returns true. Otherwise, sets the error message 
        corresponding to the invalid data, and returns false.
    */

    function checkValid(){
        var tempStartTime = startTime.split(':');
        var tempEndTime = endTime.split(':');

        if(values.name === '' || values.address === '' || values.max <= 0 || values.price <= 0.0){
            setErrors('Error, one or more invalid or missing values have been detected.')
            return false;
        }
        if(startDate > endDate ){
            setErrors('Error, invalid date range for event.')
            return false;
        }
        if(startTime.split(':').length !== 2 && endTime.split(':').length !== 2){
            return false;
        }
        if((startDate === endDate) && (tempStartTime[0] > tempEndTime[0])){
            setErrors('Error, invalid time range for event.')
            return false;
        }
        if((startDate === endDate) && (tempStartTime[0] === tempEndTime[0]) && (tempStartTime[1] > tempEndTime[1])){
            setErrors('Error, invalid time range for event')
            return false;
        }
        return true;
    }

    /*
        createEvent function asynchronously creates the event for the current venue. Calls the checkValid function
        to validate the values. If it returns true, extracts the values from each sub variable, stringifies them in the body
        of the requestOptions variable, and performs an API POST request to the events backend database. 
        Otherwise, it does nothing.
    */
    
    async function createEvent () {
        var valid = checkValid();
        
        
        if(valid === true){
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

            var username_values = username[0];
            var username_string = username_values.username;
            
            var venue_object = await fetchVenue(username_string);
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

            <div className={styles.section_2}>
                <img id={styles.img} src={imgfile} alt=""/>
                <input type="file" onChange={handleImage} />Choose Event Image
            </div>

            <div className={styles.description_container}>
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
                <div>
                    {error?<label id={styles.error}>{error}</label>:null} 
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