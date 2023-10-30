import 'index.css';
import NavBar from 'Components/Navbar';
import {BrowserRouter, Router, Outlet, Link} from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from 'Components/VenueOverview.module.css'
import React, {useState, useEffect} from 'react';
import GridEvents from './GridEvents';

{/*
function useAsync(username) {
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    async function getEvents(){
        try{
            const response = fetch(`http://localhost:8080/events?vendor=${username}`);
            const data = await response.json();
            setEvents(data);
        }
        catch(error){
            setError(error);
        }
        finally{
            setLoading(false);
        }

    }
    useEffect(() =>{
        getEvents()
    }, username)
    return {events, error, loading};
}
*/}


function VenueOverview(props){
    const location = useLocation();
    const username = location.state?.username; 
    const [loaded, setLoaded] = useState(false) 
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();   
    const [timeframe, setTimeFrame] = useState('All')

    {/*
    useEffect(() => {
        if(!loaded){
            const fetchData = async () => {
            try{
                const response = await fetch(`http://localhost:8080/events?vendor=${username}`)
                const data = await response.json;
                setEvents(data);
            }
            catch(error){
                console.error('Error fetching data:', error);
            }
            fetchData();
            }
            setLoaded(true);
        }
          
    }, []); 
*/}

    return(
        <div className={styles.container}>
            <div class={styles.button_container}>
                <button onClick={navigate('/createevent')}>Create Event</button>
            </div>
            <button id={styles.back}>
                <Link to='/login'>Log Out</Link>
            </button>
            <div class={styles.event_grid}>
                <div class={styles.event_types}>
                    <h2 onClick={setTimeFrame('Future')}>Upcoming Events</h2>
                    <h2 onClick={setTimeFrame('Past')}>Past Events</h2>
                    <h2 onClick={setTimeFrame('')}>All Events</h2>
                    <div class={styles.event}>
                        
                        <GridEvents events={events} time={timeframe} /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueOverview