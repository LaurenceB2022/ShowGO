import 'index.css';
import styles from 'Components/Venue/CSS/VenueManageAttendees.module.css';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AttendeeGridComponent from 'Components/Other/JSX/AttendeeGridComponent';
import { useEffect, useState } from 'react';
import YesNoPromptComponent from 'Components/Other/JSX/YesNoPromptComponent';

/*
    VenueManageAttendees function contains the grid to display the list of attendees associated with
    the selected event. It allows for venues to delete a user attending their event.
*/

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
    const [deletePromptVisible, setDeletePromptVisible] = useState(false);
    const [updatePromptVisible, setUpdatePromptVisible] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    //useEffect hook calls the fetchEventTickets function upon loading.
    useEffect(() => {
        fetchEventTickets();
    }, []);
    
    /*
        fetchEventTickets function asynchronously calls a fetch GET request to the tickets API backend,
        and stores the results using the setTickets constant.
    */
    async function fetchEventTickets() {
        //TODO: Should be POST Request to get Users for the given event
        var x = await fetch('http://localhost:8080/tickets/' + eventJSON.guid, {
            method: 'GET',
        }).then(response => response.json())
        setTickets(x);
    }

    /*
        promptDeleteUser takes in a ticket JSON object, enables the deletion prompt using setDeletePromptVisible,
        and selects the ticket object using setSelectedTicket.
    */
    function promptDeleteUser(ticketJSON) {
        setDeletePromptVisible(true);
        setSelectedTicket(ticketJSON);
    }

    /*
        promptUpdateUser takes in a ticket JSON object, enables the update prompt using setUpdatePromptVisible,
        and selects the ticket object using setSelectedTicket.
    */
    function promptUpdateUser(ticketJSON) {
        setUpdatePromptVisible(true);
        setSelectedTicket(ticketJSON);
    }

    /*
        cancelOperation sets both prompts to false using setUpdatePromptVisible and setDeletePromptVisible,
        then deselects the ticket using setSelectedTicket.
    */
    function cancelOperation() {
        setUpdatePromptVisible(false);
        setDeletePromptVisible(false);
        setSelectedTicket(null);
    }

    /*
        updateAttendee function redeems the currently selected ticket by calling a fetch POST request to the
        tickets/reedem API backend. If the request is successful, updates the list of tickets visible by calling
        setTickets and mapping the API response, and unselects the current ticket. Otherwise, only sets the update prompt to false.
    */
    
    function updateAttendee() {
        setUpdatePromptVisible(false);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'}
        };
        fetch('http://localhost:8080/tickets/redeem/' + selectedTicket.guid, requestOptions)
        .then(response => {
            return response.ok ? response.json() : null;
        }).then(data => {
            if (data) {
                setTickets(tickets.map(ticket => ticket !== selectedTicket ? ticket : data));
                setSelectedTicket(null);
            }
        });
    }
    
    /*
        deleteAttendee function deletes the selected ticket by calling a fetch DELETE request to the API
        tickets backend. If the request is successful, updates the current list of tickets using setTickets,
        and unselects the current ticket.
    */
    function deleteAttendee() {
        setDeletePromptVisible(false);
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
            body: JSON.stringify(selectedTicket)
        };
        fetch('http://localhost:8080/tickets', requestOptions)
        .then(response => {
            if (response.ok) {
                setTickets(tickets.filter(ticket => ticket !== selectedTicket));
                setSelectedTicket(null);
            }
        })
    }

    return (
        <div>
            <button id={styles.back}>
                <Link to={'/venuehome/event/' + id} state={{eventJSON: eventJSON}}>Cancel</Link>
            </button>
            <div id={styles.content}>
                {deletePromptVisible ? 
                    (<YesNoPromptComponent text={"Are you sure you want to remove this attendee? The user’s ticket will be removed, and issued a refund."} yesFunction={deleteAttendee} noFunction={() => cancelOperation()}></YesNoPromptComponent>)
                    : <></>       
                }
                {updatePromptVisible ? 
                    (<YesNoPromptComponent text={"Are you sure you want to check in this attendee? The user’s ticket will be redeemed."} yesFunction={updateAttendee} noFunction={() => cancelOperation()}></YesNoPromptComponent>)
                    : <></>       
                }
                <br></br>
                <h1>Attendee List for {eventJSON.name}</h1>
                <div className={styles.horizontal_line}></div>
                <AttendeeGridComponent updateFunction={promptUpdateUser} deleteFunction={promptDeleteUser} tickets={[tickets, setTickets]}></AttendeeGridComponent>
                <p className={styles.statistic}>Tickets Sold: {tickets.length}</p>
                <p className={styles.statistic}>Total Revenue: ${(tickets.length * eventJSON.ticket_price).toFixed(2)}</p>
            </div>
        </div>
    )
}