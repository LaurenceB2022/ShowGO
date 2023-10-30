import 'index.css';
import styles from 'Components/GridEvents.module.css';
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react';

const Event = (props) => {
    const eventJSON = props.event;

    return(
        <div className={styles.container}>
            <p>{eventJSON.start_date}</p>
            <p>{eventJSON.end_date}</p>
            <p>{eventJSON.ticket_price}</p>
        </div>
    )
}
export default Event;