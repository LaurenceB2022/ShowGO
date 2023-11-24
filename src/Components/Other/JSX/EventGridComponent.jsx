import 'index.css';
import styles from 'Components/Other/CSS/EventGridComponent.module.css';
import EventComponent from 'Components/Other/JSX/EventComponent';
import { useEffect, useState } from 'react';

const EventGridComponent = (props) => {
    
    const [events, _] = props.events;

      return (
          <div className={styles.container}>
           {
            events.map(eventJSON => (
                <EventComponent event={eventJSON}></EventComponent>
            ))
            }
        </div>
    )
}
export default EventGridComponent