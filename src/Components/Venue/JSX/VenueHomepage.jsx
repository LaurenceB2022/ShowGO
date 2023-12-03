import 'index.css';
import { useNavigate } from 'react-router-dom';
import styles from 'Components/Venue/CSS/VenueHomepage.module.css'
import React, {useState, useContext, useEffect} from 'react';
import EventGridComponent from 'Components/Other/JSX/EventGridComponent';
import { MyContext } from 'App';

/*
    VenueHomepage function loads the landing page for the Venues when they log in. Allows Venues to navigate
    to the event creation page, and displays the EventGridComponent after passing in the events JSON values.
*/
function VenueHomepage(){
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [user, setUser] = userState;

    //Debug, remove later
    setLoggedIn(true);
    
    const navigate = useNavigate();  

    const [events, setEvents] = useState([]);
    const [timeframe, setTimeFrame] = useState('future');

    /*
        fetchEvents function asynchronously fetches an API GET request from the events backend database using
        the current venue name. Depending on the timeframe filter active, filters the data to all valid events,
        and calls setEvent.
    */
    async function fetchEvents() {
        setEvents([]);
        await fetch('http://localhost:8080/events/venue/' + user.username, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            switch (timeframe) {
                case 'future':
                    data = data.filter(event => new Date(event.start_date) > new Date());
                    break;
                case 'past':
                    data = data.filter(event => new Date(event.end_date) < new Date());
                    break;
                default:
                    break;
            }
            setEvents(data);
        });
    }

    //The useEffect hook calls the fetchEvents function upon loading.
    useEffect(() => {
        console.log("ran");
        fetchEvents();
    }, [timeframe]);

    return(
        <div>
            <div className={styles.container}>

                <div class={styles.section_1}>
                    <button onClick={() => navigate('/createevent')}>Create Event</button>
                </div>
                <div class={styles.section_2}>
                    <div class={styles.section_3}>
                        <div id={styles.search_criteria}>
                            <button className={styles.h2 + ' ' + (timeframe === 'future' ? 'button_enabled' : '')} onClick={() => setTimeFrame('future')}>Upcoming Events</button>
                            <button className={styles.h2 + ' ' + (timeframe === 'all' ? 'button_enabled' : '')} onClick={() => setTimeFrame('all')}>All Events</button>
                            <button className={styles.h2 + ' ' + (timeframe === 'past' ? 'button_enabled' : '')} onClick={() => setTimeFrame('past')}>Past Events</button>
                        </div>
                        <div id={styles.event}>
                            <EventGridComponent events={[events, setEvents]} time={timeframe} /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueHomepage