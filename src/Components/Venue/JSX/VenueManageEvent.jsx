import 'index.css';
import styles from 'Components/Venue/CSS/VenueManageEvent.module.css';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import YesNoPromptComponent from 'Components/Other/JSX/YesNoPromptComponent';
import { useState } from 'react';
import DatePicker from "react-datepicker";

export default function VenueManageEvent() {
    const id = useParams().id;
    const location = useLocation();
    const navigator = useNavigate();
    const [error, setError] = useState("");
    var timeout = null;

    const [promptVisible, setPromptVisible] = useState(false);
    const [eventJSON, setEventJSON] = useState(!location.state ? {
        guid: 'N/A',
        venue: {username: 'N/A',
                address: 'N/A'},
        start_date: 'Jan 01 1970 12:00 AM',
        end_date: 'Jan 01 1970 12:59 PM',
        ticket_price: 0.00,
        name: 'N/A',
        description: 'N/A',
        location: 'N/A',
        hide_location: 0,
        max_attendees: 0,
        image: null
        } : {
            guid: location.state.eventJSON.guid,
            venue: location.state.eventJSON.venue,
            start_date: new Date(location.state.eventJSON.start_date),
            end_date: new Date(location.state.eventJSON.end_date),
            ticket_price: location.state.eventJSON.ticket_price,
            name: location.state.eventJSON.name,
            description: location.state.eventJSON.description,
            location: location.state.eventJSON.location,
            hide_location: location.state.eventJSON.hide_location,
            max_attendees: location.state.eventJSON.max_attendees,
            image: location.state.eventJSON.image
         });

    function handleInput(event) {
        const val = event.target.type==='checkbox' ? event.target.checked : event.target.value;
        setEventJSON({
            ...eventJSON,
            [event.target.name]: val
        }
        );
    }

    async function handleImage (event) {
        const file = event.target.files[0];
        
        if (!file) {
            setEventJSON({
                ...eventJSON,
                image: ShowGoLogo
            });
            return;
        }

        await readFileDataAsBase64(file).then(b64Data => {
            setEventJSON({
                ...eventJSON,
                image: b64Data
            });
        });
    }

    function readFileDataAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                resolve(event.target.result);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };
    
            reader.readAsDataURL(file);
        });
    }

    //Updates the error message with the given timeout length in ms
    function updateError(message, ms) {
        if(timeout) {
            clearTimeout();
        }
        setError(message);
        timeout = setTimeout(() =>{
            setError("");
        }, ms);
    }

    async function save() {
        const max_attendees = parseInt(eventJSON.max_attendees);
        const ticket_price = parseFloat(eventJSON.ticket_price);

        if(eventJSON.name.length < 3 || eventJSON.name.length > 200) {
            updateError("Invalid event name length.", 2500);
            return;
        } else if (Number.isNaN(max_attendees) || max_attendees < 1 || max_attendees > 9999) {
            updateError("Invalid maximum attendee number. Choose a number from 1-9999.", 2500);
            return;
        } else if (Number.isNaN(ticket_price) || ticket_price < 0.00 || ticket_price > 999.99) {
            updateError("Invalid ticket price. Choose a value from 0.00 to 999.99", 2500);
            return;
        } else if (!eventJSON.start_date || !eventJSON.end_date || eventJSON.end_date < eventJSON.start_date) {
            updateError("Please select a valid date range", 2500);
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
            body: JSON.stringify({
                guid: eventJSON.guid,
                venue: eventJSON.venue,
                start_date: eventJSON.start_date.toDateString().substring(4) + " 12:00 AM",
                end_date: eventJSON.end_date.toDateString().substring(4) + " 12:59 PM",
                ticket_price: ticket_price,
                name: eventJSON.name,
                description: eventJSON.description,
                location: eventJSON.location,
                hide_location: eventJSON.hide_location,
                max_attendees: max_attendees,
                image: eventJSON.image
             })
        };
        fetch('http://localhost:8080/events/' + eventJSON.guid, requestOptions)
        .then(response =>{
            if(response.ok){
                navigator('/venuehome');
            }
            else{
                updateError("Error updating event.", 2500);
            }
        })
    }

    function deleteEvent() {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'}
        };
        setPromptVisible(false);
        fetch('http://localhost:8080/events/' + eventJSON.guid, requestOptions)
        .then(response => {
            if (response.ok) {
                console.log("Event successfully deleted.");
                navigator("/venuehome");
            } else {
                updateError("Error deleting event.", 2500);
            }
        })
        console.log("Deleting event.");
    }

    return (
        <div>
            <div id={styles.content}>
                {promptVisible ? 
                    (<YesNoPromptComponent text={"Are you sure you want to delete this event? All information will be lost, and attendees will be refunded."} yesFunction={deleteEvent} noFunction={() => setPromptVisible(false)}></YesNoPromptComponent>)
                    : <></>       
                }
                <div id={styles.section_1}>
                    <div id={styles.form_container}>
                        <label className={styles.label + ' ' + styles.col_1}>Event Name</label>
                        <input name='name' maxLength='200' className={styles.input + ' ' + styles.col_2_3} value={eventJSON['name']} onChange={(event) => handleInput(event)}></input>

                        <label className={styles.label + ' ' + styles.col_1}>Description</label>
                        <input name='description' maxLength='1000' className={styles.input + ' ' + styles.col_2_3} value={eventJSON['description']} onChange={(event) => handleInput(event)}></input>
                        
                        <label className={styles.label + ' ' + styles.col_1}>Ticket Price</label>
                        <input name='ticket_price' maxLength='6' className={styles.input + ' ' + styles.col_2_3} value={eventJSON['ticket_price']} onChange={(event) => handleInput(event)}></input>

                        <label className={styles.label + ' ' + styles.col_1}>Start Date</label>
                        <DatePicker className={styles.input + ' ' + styles.col_2_3} selected={new Date(eventJSON['start_date'])} onChange={(time) => setEventJSON({...eventJSON,start_date: time})}/>

                        <label className={styles.label + ' ' + styles.col_1}>End Date</label>
                        <DatePicker className={styles.input + ' ' + styles.col_2_3} selected={new Date(eventJSON['end_date'])} onChange={(time) => setEventJSON({...eventJSON,end_date: time})}/>
                        
                        <label className={styles.label + ' ' + styles.col_1}>Location</label>
                        <input name='location' maxLength='100' className={styles.input + ' ' + styles.col_2_3} value={eventJSON['location']} onChange={(event) => handleInput(event)}></input>
                    
                        <label className={styles.label + ' ' + styles.col_1}>Hide Location?</label>
                        <input name='hide_location' type='checkbox' id={styles.hide_location} className={styles.input + ' ' + styles.col_2_3}  checked={eventJSON['hide_location']} onChange={(event) => handleInput(event)}/>
                    
                        <label className={styles.label + ' ' + styles.col_1}>Max Attendees</label>
                        <input name='max_attendees' maxLength='4' className={styles.input + ' ' + styles.col_2_3} value={eventJSON['max_attendees']} onChange={(event) => handleInput(event)}></input>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
                <div id={styles.section_2}>
                    <img name='image' id={styles.img} src={eventJSON['image'] ? eventJSON['image'] : ShowGoLogo}/>
                    <input className={styles.input + ' ' + styles.col_2_3} type="file" onChange={handleImage}/>
                    <br></br>
                    <button>
                        <Link to={'/venuehome/event/' + id + '/manage'} state={{eventJSON: eventJSON}}>Manage Attendees</Link>
                    </button>
                    <br></br>
                    <p class={styles.p}>{error}</p>
                </div>
                <button id={styles.delete_event} onClick={() => setPromptVisible(true)}>Delete Event</button>
                <button id={styles.save} className='button_enabled' onClick={()=>save()}>Save</button>
                <button id={styles.cancel}>
                    <Link to='/venuehome'>Cancel</Link>
                </button>
            </div>
        </div>
    )
}