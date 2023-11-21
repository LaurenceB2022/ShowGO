import 'index.css';
import styles from 'Components/Other/CSS/EventGridComponent.module.css';
import EventComponent from 'Components/Other/JSX/EventComponent';
import { useEffect, useState } from 'react';

const EventGridComponent = () => {
    
    const [data, setData] = useState([]);
    const [test, setTest] = useState("");
    var base64 = require('base-64');

    async function fetchEvents() {
        const y = {
            guid: 'a',
            venue: {
                username: 'nathanielendick',
                password: 'gamma21',
                location: 'test',
                name: 'Nathaniel',
                hide_location: false,
                description: 'Test Description',
                pfp: null   
            },
            start_date: 'start date',
            ticket_price: 10,
            end_date: 'end date',
            name: 'event',
            description: 'description',
            location: 'test location',
            hide_location: false,
            max_attendees: 5
        };

        var x = await fetch('http://localhost:8080/events', {
            method: 'GET',
        }).then(response => response.json())
        setData(x);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

      return (
          <div className={styles.container}>
           {
            data.map(eventJSON => (
                <EventComponent event={eventJSON}></EventComponent>
            ))
            }
        </div>
    )
}
export default EventGridComponent