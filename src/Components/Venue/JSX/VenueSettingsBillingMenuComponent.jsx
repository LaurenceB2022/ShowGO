import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useContext, useEffect} from 'react';
import { MyContext } from 'App';
import BillingResultComponent from './BillingResultsComponent';

/*
    VenueSettingsBillingMenuComponent displays the list of all purchased tickets for the venue's events.
*/

const VenueSettingsBillingMenuComponent = () =>{
    const userState = useContext(MyContext).userState;
    const [user, setUser] = userState;
    const [events, setEvents] = useState([]);
    const [ran, setRan] = useState(false)

    /*
        getEvents function sends a fetch GET request to the API events/venue backend. If successful, 
        sets the retreived events JSON values to the events variable using the setEvents constant.
        Otherwise, does nothing.
    */
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

    //Hook to refresh the current list displayed. Calls the getEvents function.
    useEffect(() => {
    if (!ran) {
        setRan(true)
        getEvents();
    }
    }, []);  

    return (
        <div className={styles.billing_container}>
            <span className={styles.billing_container_span}>
                <h1>Billing History</h1>
            </span>
            
            <div>
                <BillingResultComponent eventsJSON={[events, setEvents]} />
            </div>
        </div>
    )
    
}
export default VenueSettingsBillingMenuComponent;