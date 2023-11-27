import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useContext, useEffect, useState} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

const Purchase = (props) => {
    
    const ticketJSON = props.purchase;
    const event_guid = ticketJSON.event_guid;
    const[event, setEvent] = useState(null);
    console.log(ticketJSON + "Purchase")
    console.log(ticketJSON.event_guid + "Purchase GUID")

    function getEvent(){
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

    useEffect(() => {
        getEvent();
    }, []);

    return(
        <div className={styles.payment}>
            <p>{event.start_date}</p>
            <p>{event.name}</p>
            <p>${event.ticket_price}</p>
        </div>
    )
}
export default Purchase;