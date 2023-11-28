import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useContext, useEffect} from 'react';
import { MyContext } from 'App';
import BillingResultComponent from './BillingResultsComponent';

const VenueSettingsBillingMenuComponent = () =>{
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [user, setUser] = userState;
    const [events, setEvents] = useState([]);

    
    function getEvents() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
            
        }
        //Gets Events
        fetch('http://localhost:8080/events/venue/' + user.username, requestOptions)
        .then(response => response.json()) 
        .then(data => {
            if(data){
                setEvents(data);
            }
            else{
                setEvents([])
            }
        })
    } 

    
    useEffect(() => {
        getEvents();
    }, []);  

    return (
        <div className={styles.billing_container}>
            <span className={styles.billing_container_span}>
                <h1>Billing History</h1>
                <p>{user.name}</p>
                <input className={styles.billing_search} type='text' placeholder='Search Payment By Number' />
            </span>
            
            <div className={styles.billing_result_box}>
                <BillingResultComponent eventsJSON={events} />
            </div>
        </div>
    )
    
}
export default VenueSettingsBillingMenuComponent;