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
    const username = usernameState;
    const navigator = useNavigate();
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    const[error, setErrors] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [timeStartValue, setStartTime] = useState('10:00');
    const [timeEndValue, setEndTime] = useState('10:00');
    const[values, setValues] = useState({
        name: '',
        address: '',
        visible: true,
        max: 0,
        price: 0.0
      });
    
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

    const validateEvent = () =>{
        const valid = true;
        const splitStartDate = values.start.split(' ');
        const splitEndDate = values.end.split(' ');

        if(values.name === '' || values.address === '' || values.max <= 0 || values.price <= 0.0){
            setErrors('Error, one or more invalid or missing values have been detected.')
            valid = false;
        }
        if(startDate > endDate){
            setErrors('Error, invalid date range for event.')
            valid = false;
        }
        else if(startDate === endDate && timeStartValue > timeEndValue){
            setErrors('Error, invalid time range for event.')
        }
        return valid;
    }
    
    const createEvent = (event) => {
        event.preventDefault();

        if(validateEvent){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, eventname: values.name, startdate: values.start, enddate: values.end, address: values.address, visibility: values.visible, maxattendees: values.max, ticketprice: values.price})
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

            <div className={styles.image_container}>
                <span className={styles.rect}>
                    <text>Title Here</text>
                </span>
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
                    <label>Start Date</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <TimePicker onChange={() => setStartTime()} value={timeStartValue} />
                </span>
                <span>
                    <label>End Date</label>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    <TimePicker onChange={() => setEndTime()} value={timeEndValue} />
                </span>
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