import 'index.css';
import styles from 'Components/Venue/CSS/VenueManageEvent.module.css';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import YesNoPromptComponent from 'Components/Other/JSX/YesNoPromptComponent';
import { useEffect, useState } from 'react';

export default function VenueManageEvent() {
    const id = useParams().id;
    const location = useLocation();
    const [promptVisible, setPromptVisible] = useState(false);
    const [eventJSON, setEventJSON] = useState(!location.state ? {
        guid: 'N/A',
        venue: {username: 'N/A',
                address: 'N/A'},
        start_date: 'Jan 01 1970 12:00 AM',
        ticket_price: 0.00,
        end_date: 'Jan 01 1970 12:59 PM',
        name: 'N/A',
        description: 'N/A',
        location: 'N/A',
        hide_location: 0,
        max_attendees: 0}
         : location.state.eventJSON);

    // const[updatedValues, setUpdatedValues] = useState({
    //     name: eventJSON.name,
    //     description: eventJSON.description,
    //     ticket_price: eventJSON.ticket_price,
    //     location: eventJSON.location,
    //     hide_location: eventJSON.hide_location,
    //     max_attendees: eventJSON.max_attendees,
    //     image: eventJSON.image
    // });

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


    function save() {
        //Post request to edit event details
    }

    function deleteEvent() {
        setPromptVisible(false);
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
                        <br></br>
                        <br></br>
                        <br></br>
                        <label className={styles.label + ' ' + styles.col_1}>Event Name</label>
                        <input name='name' maxLength='200' className={styles.input + ' ' + styles.col_2_3} value={eventJSON['name']} onChange={(event) => handleInput(event)}></input>

                        <label className={styles.label + ' ' + styles.col_1}>Description</label>
                        <input name='description' maxLength='1000' className={styles.input + ' ' + styles.col_2_3} value={eventJSON['description']} onChange={(event) => handleInput(event)}></input>
                        
                        <label className={styles.label + ' ' + styles.col_1}>Ticket Price</label>
                        <input name='ticket_price' maxLength='6' className={styles.input + ' ' + styles.col_2_3} value={eventJSON['ticket_price']} onChange={(event) => handleInput(event)}></input>

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
                </div>
                <button id={styles.delete_event} onClick={() => setPromptVisible(true)}>Delete Event</button>
                <button id={styles.save} className='button-enabled'>
                    <Link to='/venuehome' onClick={()=>save()} className='link-active'>Save</Link>
                </button>
                <button id={styles.cancel}>
                    <Link to='/venuehome'>Cancel</Link>
                </button>
            </div>
        </div>
    )
}