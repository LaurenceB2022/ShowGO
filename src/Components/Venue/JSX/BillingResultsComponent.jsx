import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useEffect} from 'react';
import Purchase from './Purchase';
import { useLocation } from 'react-router';

const BillingResultComponent = (props) => {
    const [data, setData] = useState([]);
    var n = 0;
    const [eventsJSON, _] = props.eventsJSON;
    const location = useLocation();

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
                console.log(dat);
                if(dat != null && dat.length > 0){
                    for (var i = 0; i < dat.length; i++) {
                        tickets.push(event);
                    }
                    setData(tickets);
                }
            });
        });
    }

    async function fetchPurchases(){
        if(eventsJSON != null && eventsJSON.length > 0){
            await getTickets();
        }
    }

    useEffect(() => {
        if (eventsJSON.length > 0) {
            fetchPurchases();
        }
    }, [eventsJSON]);

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