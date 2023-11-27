import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useContext, useState, useEffect} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import Purchase from './Purchase';

const BillingResultComponent = (props) => {
    const[seed, setSeed] = useState(1)
    const reset = () => {
        setSeed(Math.random());
    }
    const [data, setData] = useState([]);
    var n = 0;
    const [event, setEvent] = useState([]);
    const [ticketResult, setTickets] = useState([])
    /* The GUIDS of events to use to fetch tickets */
    const eventsGUID = props.guid;
    console.log(props.guid + " venue event GUIDs");

    /*
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
    } */

    
    async function fetchTickets(guid){
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
        }
        var x = await fetch('http://localhost:8080/tickets/' + guid, requestOptions)
            .then(response => response.json())
        return x;
    }
    

    async function fetchPurchases(){
        const guids = []
        console.log('Fetching purchases here ' + eventsGUID)
        if(eventsGUID !== '' && eventsGUID !== null && eventsGUID.length > 0){
            eventsGUID.forEach(async eventGUID => {
                console.log(eventGUID.guid + " guid")
                //var result = await fetchTickets(eventGUID.guid)
                
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000'},
                }
                var result = await fetch('http://localhost:8080/tickets/' + eventGUID.guid, requestOptions)
                .then(response => response.json()) 
                console.log(result + " ticket result here")
                if(result.length > 0){
                    
                    result.forEach(ticket =>{
                        console.log("ticket found here " + ticket)
                        console.log(ticket + " " + eventGUID + " ")
                        var nt = [eventGUID]
                        //console.log(nt[0] + " " + nt[1] + "separated values")
                        guids.push(eventGUID)
                        console.log(eventGUID)
                        console.log(guids)
                        setData(guids)
                    })
                        
                    
                }
            });     
            
        }
        console.log('Settings GUIDs')
        //setData(guids); 
        
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
                    (data !== null && data.length > 0) ? data.map(purchaseJSON => (
                           
                            <Purchase key={n+=1} purchase={purchaseJSON}></Purchase>
                    )) : <></>
                            
                
                }
            </div>
            
        </div>
    )
}

export default BillingResultComponent;