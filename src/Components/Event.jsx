import 'index.css';
import styles from 'Components/Event.module.css';
import React, {useState, useEffect} from 'react';


//TODO add a link to the event and a backtrack link to get back to previous page
const Event = (props) => {
    const eventJSON = props.event ? props.event : 
    {
        image: 'N/A',
        title: 'N/A',
        start_date: 'N/A',
        end_date: 'N/A',
        ticket_price: 'N/A'
    };

    return(
        <div class={styles.container}>
            <p id={styles.title} class='item_10'>{eventJSON.title}</p>
            <div className={styles.section_1 + ' item_90'}>
                <img id={styles.img} class='item_50' src={eventJSON.image}></img>
                <div class='item_50'>
                    <p>{eventJSON.start_date}</p>
                    <p>{eventJSON.end_date}</p>
                    <p>{eventJSON.ticket_price}</p>
                </div>
            </div>
        </div>
    )
}
export default Event;