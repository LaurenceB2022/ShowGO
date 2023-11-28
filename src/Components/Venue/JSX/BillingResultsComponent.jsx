import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useEffect} from 'react';
import Purchase from './Purchase';
import { useLocation } from 'react-router';

const BillingResultComponent = (props) => {
    const [data, setData] = useState(null);
    var n = 0;
    const eventsJSON = props.eventsJSON;

    async function fetchPurchases(){
        const tickets = [];
        console.log(eventsJSON);
        if(eventsJSON != null && eventsJSON.length > 0){
            eventsJSON.forEach(async event => {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000'},
                    }
                    var result = await fetch('http://localhost:8080/tickets/' + event.guid, requestOptions)
                    .then(response => response.json()).then(data => {
                        if(data.length > 0){
                            for (var i = 0; i < data.length; i++) {
                                tickets.push(event);
                            }
                        }
                    });
                });
            setData(tickets);
            console.log(data);
        }
    }

    useEffect(() => {
        fetchPurchases();
    }, []);

    return (
        <div className={styles.billing_container_box}>
            <div className={styles.billing_container_span}>
                <h2>Date</h2>
                <h2>Event</h2>
                <h2>Amount</h2>
            </div>
            <div>
                {data != null ?
                data.map(eventJSON => (
                    <Purchase key={n+=1} eventJSON={eventJSON}></Purchase>
                )) : <></>
                }
            </div>
        </div>
    )
}

export default BillingResultComponent;