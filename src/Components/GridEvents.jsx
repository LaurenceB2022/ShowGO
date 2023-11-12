import 'index.css';
import styles from 'Components/GridEvents.module.css';
import Event from 'Components/Event';
import { useEffect, useState } from 'react';

const GridEvents = (props) => {
    
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
                <Event event={eventJSON}></Event>
            ))
            }
        </div>
    )
}
export default GridEvents