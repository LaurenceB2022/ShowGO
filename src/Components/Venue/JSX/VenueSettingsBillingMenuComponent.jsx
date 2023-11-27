import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useContext, useEffect} from 'react';
import BillingResultComponent from './BillingResultsComponent';
import { MyContext } from 'App';

const VenueSettingsBillingMenuComponent = () =>{
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [_, setUser] = userState;
    const [events, setEvents] = useState(null);
    const username = userState;
    const [guid, setGUID] = useState('');
    console.log(username.username)

    async function getEvent(guidJSON){
        const requestOptions2 = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'}
        }
        var venue_obj2 = await fetch('http://localhost:8080/events/venue/' + guidJSON, requestOptions2)
            .then(response => response.json());
        if(venue_obj2 != null){
            
            return venue_obj2;
        }
        return '';
    }

    
    function getGUID() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
            
        }
        //Gets Events
        console.log(username[0].username)
        fetch('http://localhost:8080/events/venue/' + username[0].username, requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data){
                console.log(data + " data received")
                setEvents(data);
            }
        })
        /*console.log(values + "from username") */
        
        console.log(events + "from events")

        /*
        if(events !== '' && events !== null){
            console.log(events)
            console.log("test")
            const array = [];

            events.forEach(item => {
                console.log(item.guid + " Item")
                var result = getEvent(item);
                if(result !== ''){
                    console.log(result)
                    array.push(result);
                }
            });
            
        }
            */
            /*console.log(values + " Array")
            setGUID(values);
            */
        
        
    } 

    useEffect(() => {
        getGUID();
    }, []);  

    /*TO DO: Sprint 5 */
    return (
        <div className={styles.billing_container}>
            <span className={styles.billing_container_span}>
                <h1>Billing History</h1>
                <p>{username.name}</p>
                <input className={styles.billing_search} type='text' placeholder='Search Payment By Number' />
            </span>
            <div className={styles.billing_result_box}>
                <BillingResultComponent guid={events}></BillingResultComponent>
            </div>
        </div>
    )
    
}
export default VenueSettingsBillingMenuComponent;