import 'index.css';
import styles from 'Components/Other/CSS/EventGridComponent.module.css';
import EventComponent from 'Components/User/JSX/EventComponent';
import { useEffect, useState } from 'react';

const EventGridComponent = () => {
    
    const [data, setData] = useState([]);
    
    async function fetchEvents() {
        const x = await fetch('http://localhost:8080/events', {
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