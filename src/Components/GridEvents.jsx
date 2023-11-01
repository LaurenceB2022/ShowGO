import 'index.css';
import styles from 'Components/GridEvents.module.css';
import Event from 'Components/Event';
import ShowGoLogo from 'Assets/ShowGoLogo.png';

const GridEvents = (props) => {

    const eventJSON = props.event ? props.event : 
    {
        image: ShowGoLogo,
        title: 'Title',
        start_date: 'Start_date',
        end_date: 'End_date',
        ticket_price: 'Tkt$'
    };
    const events = [eventJSON,eventJSON,eventJSON,eventJSON,
        eventJSON,eventJSON,eventJSON,eventJSON];


    return (
        <div className={styles.container}>
            {
            events.map(eventJSON => (
                
                <Event event={eventJSON}></Event>
        
            ))
            }
        </div>
    )
}
export default GridEvents