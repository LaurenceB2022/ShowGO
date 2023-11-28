import 'index.css';
import styles from 'Components/Other/CSS/EventGridComponent.module.css';
import EventComponent from 'Components/Other/JSX/EventComponent';

/*
    EventGridComponent displays a list of EventComponents.
*/
const EventGridComponent = (props) => {
    
    const events = props.events != null ? props.events[0] : null;

      return (
          <div className={styles.container}>
           {events != null && events.map(eventJSON => (
                <EventComponent event={eventJSON}></EventComponent>
            ))
            }
        </div>
    )
}
export default EventGridComponent