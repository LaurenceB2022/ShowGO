import 'index.css';
import { Link} from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from 'Components/VenueOverview.module.css'
import React, {useState, useEffect, useContext} from 'react';
import GridEvents from './GridEvents';
import { MyContext } from 'App';

function VenueOverview(){
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;

    const location = useLocation();
    // const username = location.state?.username; 
    const [loaded, setLoaded] = useState(false) 
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();   
    const [timeframe, setTimeFrame] = useState('All')

    return(
        <div className={styles.container}>
            <div class={styles.button_container}>
                <button onClick={() => navigate('/createevent')}>Create Event</button>
            </div>
            <button id={styles.back}>
                <Link to='/login'>Log Out</Link>
            </button>
            <div class={styles.event_grid}>
                <div class={styles.event_types}>
                    <h2 onClick={() => setTimeFrame('Future')}>Upcoming Events</h2>
                    <h2 onClick={() => setTimeFrame('Past')}>Past Events</h2>
                    <h2 onClick={() => setTimeFrame('')}>All Events</h2>
                    <div class={styles.event}>
                        
                        <GridEvents events={events} time={timeframe} /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueOverview