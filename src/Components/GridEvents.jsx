import 'index.css';
import styles from 'Components/GridEvents.module.css';
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import Event from 'Components/Event'

const GridEvents = (props) => {

    const events = props.events;

    return (
        <div>
            <ul id={styles.container}>
                {
                events.map(eventJSON => (
                    <Event event={eventJSON}></Event>
            
                ))
                }
            </ul>
        </div>
    )
}
export default GridEvents