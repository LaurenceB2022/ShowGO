import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useContext, useState, useEffect} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import Purchase from './Purchase';

const BillingResultComponent = (props) => {
    const [data, setData] = useState([]);
    const [event, setEvent] = useState('');
    /* The GUIDS of events to use to fetch tickets */
    const eventsGUID = props.guid;
    console.log(props.guid + " venue event GUIDs");

    function fetchEvent(event_guid){
        fetch('http://localhost:8080/events/' + event_guid, {
            method:'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                setEvent(data)
            }
            else{
                setEvent({
                    start_date: '',
                    name: '',
                    ticket_price: ''
                })
            }
        })
    }

    function fetchTickets(guid){
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
        }
        fetch('http://localhost:8080/tickets/' + guid, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data){
                    console.log(data + " ticket found")
                    return data;
                }
                else{
                    return ''
                }
            })
    }

    function fetchPurchases(){
        const guids = []
        
        if(eventsGUID !== '' && eventsGUID !== null){
            eventsGUID.forEach(eventGUID => {
                console.log(eventGUID.guid + " guid")
                var result = fetchTickets(eventGUID.guid)
                console.log(result + " fetch ticket result")
                if(result !== ''){
                    console.log(result + " ticket")
                    guids.push(result);
                }
            });     
            setData(guids); 
        }
        
        
        console.log(data + " tickets");
        
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
                
                {
                    
                    (data !== null) ? data.map(purchaseJSON => (
                            
                            <Purchase purchase={purchaseJSON} ></Purchase>
                    )) : <></>
                            
                
                }
            </div>
            
        </div>
    )
}

export default BillingResultComponent;