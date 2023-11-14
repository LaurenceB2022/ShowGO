import 'index.css';
import styles from 'Components/User/CSS/UserHomepage.module.css';
import {Link} from 'react-router-dom';
import SearchBarComponent from 'Components/Other/JSX/SearchBarComponent';
import EventGridComponent from 'Components/Other/JSX/EventGridComponent';
import { useState } from 'react';

export default function UserHomepage() {
    const [results, setResults] = useState(null)

    //Temp remove later
    async function fetchVenue(username) {
        const requestOptions = {
            method: 'GET',
        };
        return await fetch('http://localhost:8080/venues/' + username, requestOptions)
        .then(response => response.json());
    }
//Temp remove later
    async function createEvent() {
            var venue = await fetchVenue("nathanielendick");
            console.log(venue);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'},
                body: JSON.stringify(
                    {
                        venue: venue,
                        start_date: "Oct 30 2023",
                        ticket_price: 1.00,
                        end_date: "Oct 30 2023",
                        name: "My Zeroth Event!",
                        description: "An event for all to come to!",
                        location: "17 Kilmers Avenue",
                        hide_location: 1})
            };
            fetch('http://localhost:8080/events', requestOptions)
            .then(response =>{
                if(response.ok){
                    console.log('Event added successfully to database.');
                }
                else{
                    console.log('Error adding event: ' + response.type);
                }
            })
    }

    return (

        <div>
            <button id={styles.back}>
                <Link to='/login'>Log Out</Link>
            </button>
            {/* <button onClick={() => createEvent()}>Create Event</button> */}
            <div className={styles.content}>
                <div className={styles.section_1}>
                    <SearchBarComponent results={[results, setResults]} id={styles.searchbar}/>
                </div>
                <div className={styles.section_2}>
                <EventGridComponent />
                </div>
            </div>

        </div>
    )
}