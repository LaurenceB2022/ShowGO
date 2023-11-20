import 'index.css';
import styles from 'Components/Venue/CSS/VenueManageEvent.module.css';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ShowGoLogo from 'Assets/ShowGoLogo.png';

export default function VenueManageEvent() {
    const id = useParams().id;
    const location = useLocation();
    const eventJSON = !location.state ? {
        guid: 'N/A',
        venue: {username: 'N/A',
                address: 'N/A'},
        start_date: 'Jan 01 1970 12:00 AM',
        ticket_price: 0.00,
        end_date: 'Jan 01 1970 12:00 AM',
        name: 'N/A',
        description: 'N/A',
        location: 'N/A',
        hide_location: 0,
        max_attendees: 0}
         : location.state.eventJSON;

    function save() {
        //Post request to edit event details
    }

    function promptDeleteConfirmation() {
        //Show prompt asking if user REALLY wants to delete the event
    }
    return (
        <div>
            <div id={styles.content}>
                <div id={styles.section_1}>
                    <div id={styles.form_container}>
                        <label className={styles.label + ' ' + styles.col_1}>Event Name</label>
                        <input maxLength='200' className={styles.input + ' ' + styles.col_2_3}></input>

                        <label className={styles.label + ' ' + styles.col_1}>Description</label>
                        <input maxLength='1000' className={styles.input + ' ' + styles.col_2_3}></input>
                        
                        <label className={styles.label + ' ' + styles.col_1}>Ticket Price</label>
                        <input maxLength='6' className={styles.input + ' ' + styles.col_2_3}></input>

                        <label className={styles.label + ' ' + styles.col_1}>Location</label>
                        <input maxLength='100' className={styles.input + ' ' + styles.col_2_3}></input>
                    
                        <label className={styles.label + ' ' + styles.col_1}>Hide Location?</label>
                        <input id={styles.hide_location} className={styles.input + ' ' + styles.col_2_3} type="checkbox" name='hideLocation' />
                    
                        <label className={styles.label + ' ' + styles.col_1}>Max Attendees</label>
                        <input maxLength='4' className={styles.input + ' ' + styles.col_2_3}></input>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
                <div id={styles.section_2}>
                    <img id={styles.img} src={false ? null : ShowGoLogo}></img>
                    <br></br>
                    <button>
                        <Link to={'/venuehome/event/' + id + '/manage'}>Manage Attendees</Link>
                    </button>
                </div>
                <button id={styles.delete_event} onClick={promptDeleteConfirmation()}>Delete Event</button>
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