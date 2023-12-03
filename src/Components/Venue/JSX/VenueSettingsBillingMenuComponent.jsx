import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useContext, useEffect} from 'react';
import { MyContext } from 'App';
import BillingResultComponent from './BillingResultsComponent';

/*
    VenueSettingsBillingMenuComponent displays the list of all purchased tickets for the venue's events.
*/

const VenueSettingsBillingMenuComponent = () =>{
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [user, setUser] = userState;
    const [events, setEvents] = useState([]);

    
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
            console.log("events retrieved");
        })
    } 

    //Hook to refresh the current list displayed. Calls the getEvents function.
    var ran = false;
    useEffect(() => {
    if (!ran) {
        ran = true;
        getEvents();
    }
    }, []);  

    return (
        <div className={styles.billing_container}>
            <span className={styles.billing_container_span}>
                <h1>Billing History</h1>
                <p>{user.name}</p>
            </span>
            
            <div className={styles.billing_result_box}>
                <BillingResultComponent eventsJSON={[events, setEvents]} />
            </div>
        </div>
    )
    
}
export default VenueSettingsBillingMenuComponent;