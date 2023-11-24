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
                <Link to={'/venuehome/event/' + id} state={{eventJSON: eventJSON}}>Cancel</Link>
            </button>
            <div id={styles.content}>
                {promptVisible ? 
                    (<YesNoPromptComponent text={"Are you sure you want to remove this attendee? The user’s ticket will be removed, and issued a refund."} yesFunction={deleteAttendee} noFunction={() => cancelDeleteUser()}></YesNoPromptComponent>)
                    : <></>       
                }
                <br></br>
                <h1>Attendee List for {eventJSON.name}</h1>
                <div className={styles.horizontal_line}></div>
                <UserGridComponent editDataFunction={promptDeleteUser} event={eventJSON}></UserGridComponent>
                <p className={styles.statistic}>Tickets Sold: N/A</p>
                <p className={styles.statistic}>Total Revenue: N/A</p>
            </div>
        </div>
    )
}