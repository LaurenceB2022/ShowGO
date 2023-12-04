import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';

/*
    Purchase component takes in a prop with a signle event in JSON, and displays the start date, event name, and price 
    associated with it. Assumes JSON value isn't null.
*/
const Purchase = (props) => {
    
    const eventJSON = props.eventJSON;

    return(
        <div className={styles.payment}>
            <p>{eventJSON.start_date}</p>
            <p>{eventJSON.name}</p>
            <p>${eventJSON.ticket_price}</p>
        </div>
    )
}
export default Purchase;