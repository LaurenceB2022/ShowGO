import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';

const Purchase = (props) => {
    
    const eventJSON = props.eventJSON;

    return(
        <div>
            <p>{eventJSON.start_date}</p>
            <p>{eventJSON.name}</p>
            <p>${eventJSON.ticket_price}</p>
        </div>
    )
}
export default Purchase;