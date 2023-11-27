import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useContext, useState, useEffect} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import Purchase from './Purchase';

const BillingResultComponent = (props) => {
    const [data, setData] = useState([]);
    const [event, setEvent] = useState([]);
    const [ticketResult, setTickets] = useState([])
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

    /*
    async function fetchTickets(guid){
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
    */

    async function fetchPurchases(){
        const guids = []
        console.log('Fetching purchases ' + eventsGUID)
        if(eventsGUID !== '' && eventsGUID !== null){
            eventsGUID.forEach(async eventGUID => {
                console.log(eventGUID.guid + " guid")
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000'},
                }
                var result = await fetch('http://localhost:8080/tickets/' + eventGUID.guid, requestOptions)
                    .then(response => response.json())
                if(result !== null || result !== ''){
                    
                    result.forEach(ticket =>{
                        console.log("ticket found " + ticket)
                        console.log(ticket + " " + eventGUID + " ")
                        var nt = [ticket, eventGUID]
                        console.log(nt[0] + " " + nt[1] + "separated values")
                        guids.push({ticket, eventGUID})
                        setData(guids)
                    })
                        
                    
                }
            });     
            
        }
        console.log('Settings GUIDs')
        setData(guids); 
        
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
                            
                            <Purchase purchase={purchaseJSON[0]} event={purchaseJSON[1]} ></Purchase>
                    )) : <></>
                            
                
                }
            </div>
            
        </div>
    )
}

export default BillingResultComponent;