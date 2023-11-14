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
    const [timeframe, setTimeFrame] = useState('All')

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
                    <button id={styles.create_event_button}onClick={() => navigate('/createevent')}>Create Event</button>
                </div>
                <div class={styles.section_2}>
                    <div class={styles.section_3}>
                        <div id={styles.search_criteria}>
                            <h2 onClick={() => setTimeFrame('Future')}>Upcoming Events</h2>
                            <h2 onClick={() => setTimeFrame('Past')}>Past Events</h2>
                            <h2 onClick={() => setTimeFrame('')}>All Events</h2>
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