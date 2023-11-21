import 'index.css';
import styles from 'Components/Venue/CSS/VenueManageAttendees.module.css';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import UserGridComponent from 'Components/Other/JSX/UserGridComponent';
import { useEffect, useState } from 'react';
import YesNoPromptComponent from 'Components/Other/JSX/YesNoPromptComponent';

export default function VenueManageAttendees() {
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
        max_attendees: 0
    } : location.state.eventJSON;
    const [promptVisible, setPromptVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchTicketData();
    }, []);
    
    function fetchTicketData() {
        //TODO Get ticket information
    }

    function promptDeleteUser(userJSON) {
        setPromptVisible(true);
        setSelectedUser(userJSON);
    }

    function cancelDeleteUser() {
        setPromptVisible(false);
        setSelectedUser(null);
    }
    
    function deleteAttendee() {
        //TODO Should remove User object from data (and DB) based on the username
        setPromptVisible(false);
        console.log("ran deleteAttendee + " + selectedUser);
    }

    return (
        <div>
            <button id={styles.back}>
                <Link to={'/venuehome/event/' + id}>Cancel</Link>
            </button>
            <div id={styles.content}>
                {promptVisible ? 
                    (<YesNoPromptComponent text={"Are you sure you want to remove this attendee? The user’s ticket will be removed, and issued a refund."} yesFunction={deleteAttendee} noFunction={() => cancelDeleteUser()}></YesNoPromptComponent>)
                    : <></>       
                }
                <br></br>
                <h1>Attendee List for Event Name</h1>
                <div className={styles.horizontal_line}></div>
                <UserGridComponent editDataFunction={promptDeleteUser} event={eventJSON}></UserGridComponent>
                <p className={styles.statistic}>Tickets Sold: N/A</p>
                <p className={styles.statistic}>Total Revenue: N/A</p>
            </div>
        </div>
    )
}