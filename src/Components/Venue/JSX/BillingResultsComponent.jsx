import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useEffect} from 'react';
import Purchase from './Purchase';

/*
    BillingResultComponent takes in a prop with all events in JSON format, loads and displays the information for all tickets purchased in list format. This
    subpage is loaded inside of the VenueSettingsBillingMenuComponent. No input is required, all Purchase
    objects are loaded upon navigation to the VenueSettingsBillingMenueComponent subpage.
*/

const BillingResultComponent = (props) => {
    const [data, setData] = useState([]);
    var n = 0;
    const [eventsJSON, _] = props.eventsJSON;

    /*
        The getTickets function takes the eventsJSON variable and iterates over each entry. For each entry
        it asynchronously calls an API GET request to the backend, to get the tickets associated with the
        current venue. If ticket information exists, it's stored in the data variable.
    */
    function getTickets() {
        var tickets = [];
        eventsJSON.forEach(async event => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'},
                }
                var result = await fetch('http://localhost:8080/tickets/' + event.guid, requestOptions)
                .then(response => response.json()).then(dat => {
                if(dat != null && dat.length > 0){
                    for (var i = 0; i < dat.length; i++) {
                        tickets.push(event);
                    }
                    setData(tickets);
                }
            });
        });
    }

    /*
        fetchPurchases function asynchronusly calls the getTickets function.
    */
    async function fetchPurchases(){
        if(eventsJSON != null){
            await getTickets();
        }
    }

    /*
        useEffect hook calls the fetchPurchases asynchronus function if the JSON information passed in
        eventsJSON exists.  
    */
    useEffect(() => {
        if (eventsJSON.length > 0) {
            fetchPurchases();
        }
    }, [eventsJSON]);

    // If data isn't null, maps each data JSON value to a Purchase object. 
    return (
        <div className={styles.billing_container_box}>
            <div className={styles.billing_container_span}>
                <h2>Date</h2>
                <h2>Event</h2>
                <h2>Amount</h2>
            </div>
            <div className={styles.billing_container_results}>
                {data != null ?
                data.map(eventJSON => <Purchase key={n+=1} eventJSON={eventJSON}></Purchase>) : <></>
                }
            </div>
        </div>
    )
}

export default BillingResultComponent;