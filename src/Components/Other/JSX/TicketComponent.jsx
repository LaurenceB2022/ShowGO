import 'index.css';
import styles from 'Components/Other/CSS/TicketComponent.module.css';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import { Link } from 'react-router-dom';

/*
    TicketComponent displays a ticket object for users to view on their tickets page. Upon clicking the TicketComponent
    the user is navigated to the event page.
*/
export default function TicketComponent(props) {
    const ticketJSON = props.ticket ? props.ticket : 
    {
        event: {
            guid: '0',
            image: ShowGoLogo,
            name: 'N/A',
            start_date: 'N/A',
            end_date: 'N/A'
        }
    };

    return (
        <div className={styles.container}>
            <Link to={'/home/event/' + ticketJSON.event.guid} state={{eventJSON: ticketJSON.event}}>
                <div className={styles.section_1}>
                    <img id={styles.img} className='item_30' src={ticketJSON.event.image ? ticketJSON.event.image : (ticketJSON.event.venue.image ? ticketJSON.event.venue.image : ShowGoLogo)}></img>
                    <div className={styles.data + ' item_70'}>
                        <p id={styles.name} className={styles.p + ' item_10'}>{ticketJSON.event.name}</p>
                        <span className={styles.subtext + ' item_10'}>
                            <p className={styles.p + ' ' + styles.field_name}>Start</p>
                            <p className={styles.p}>{ticketJSON.event.start_date}</p>
                        </span>
                        <br></br>
                        <span className={styles.subtext + ' item_80'}>
                            <p className={styles.p + ' ' + styles.field_name}>End</p>
                            <p className={styles.p}>{ticketJSON.event.end_date}</p>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}