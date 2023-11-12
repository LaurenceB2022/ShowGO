import 'index.css';
import styles from 'Components/UserHomepage.module.css';
import {Link} from 'react-router-dom';
import SearchBar from 'Components/SearchBar';
import GridEvents from 'Components/GridEvents';
import { useContext, useState } from 'react';
import { MyContext } from 'App';

export default function UserHomepage() {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;

    const [results, setResults] = useState(null)
    //TODO remove this temp code after done testing
    setLoggedIn(true);
    setUserType('user');
    setUsername('nathanielendick');


    function generateGUID(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = (c === 'x') ? r : (r&(0x3|0x8));
            return v.toString(16);
        });
    }


    async function fetchVenue(username) {
        const requestOptions = {
            method: 'GET',
        };
        return await fetch('http://localhost:8080/venues/' + username, requestOptions)
        .then(response => response.json());
    }

    async function createEvent() {
            var gguid = generateGUID();
            var venue = await fetchVenue("nathanielendick");
            console.log(venue);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'},
                body: JSON.stringify(
                    {
                        guid: gguid,
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
            <button onClick={() => createEvent()}>Create Event</button>
            <div className={styles.content}>
                <div className={styles.section_1}>
                    <SearchBar results={[results, setResults]} id={styles.searchbar}/>
                </div>
                <div className={styles.section_2}>
                <GridEvents />
                </div>
            </div>

        </div>
    )
}