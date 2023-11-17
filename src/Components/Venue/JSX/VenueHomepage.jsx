import 'index.css';
import { useNavigate } from 'react-router-dom';
import styles from 'Components/Venue/CSS/VenueHomepage.module.css'
import React, {useState, useContext} from 'react';
import EventGridComponent from 'Components/Other/JSX/EventGridComponent';
import { MyContext } from 'App';

function VenueHomepage(){
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;

    //Debug, remove later
    setLoggedIn(true);
    
    const navigate = useNavigate();  

    const [events, setEvents] = useState([]);
    const [timeframe, setTimeFrame] = useState('future');

    function logOut() {
        setLoggedIn(false);
        setUserType(null);
        setUser(null);
        navigate('/login');
    }
    return(
        <div>
            <button id={styles.back} onClick={() => logOut()}>Log Out</button>
            <div className={styles.container}>

                <div class={styles.section_1}>
                    <button onClick={() => navigate('/createevent')}>Create Event</button>
                </div>
                <div class={styles.section_2}>
                    <div class={styles.section_3}>
                        <div id={styles.search_criteria}>
                            <button className={styles.h2 + ' ' + (timeframe === 'future' ? 'button-enabled' : '')} onClick={() => setTimeFrame('future')}>Upcoming Events</button>
                            <button className={styles.h2 + ' ' + (timeframe === 'all' ? 'button-enabled' : '')} onClick={() => setTimeFrame('all')}>All Events</button>
                            <button className={styles.h2 + ' ' + (timeframe === 'past' ? 'button-enabled' : '')} onClick={() => setTimeFrame('past')}>Past Events</button>
                        </div>
                        <div id={styles.event}>
                            <EventGridComponent events={events} time={timeframe} /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueHomepage