import 'index.css';
import styles from 'Components/Ticket.module.css';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import { Link } from 'react-router-dom';

export default function Ticket(props) {
    const eventJSON = props.ticket ? props.ticket : 
    {
        guid: '0', //TODO remove me once guid works
        owner: 'N/A',
        event_guid: '0',

        name: 'N/A',
        start_date: 'N/A',
        end_date: 'N/A',
        image: ShowGoLogo
    };

    return (
        <div className={styles.container}>
            {/* TODO change link to be dynamic based on user login type */}
            <Link to={'/home/event/' + eventJSON.event_guid}>
                <div className={styles.section_1}>
                    <img id={styles.img} className='item_30' src={eventJSON.image}></img>
                    <div className={styles.data + ' item_70'}>
                        <p id={styles.name} className={styles.p + ' item_10'}>{eventJSON.name}</p>
                        <span className={styles.subtext + ' item_10'}>
                            <p className={styles.p + ' ' + styles.field_name}>Start</p>
                            <p className={styles.p}>{eventJSON.start_date}</p>
                        </span>
                        <br></br>
                        <span className={styles.subtext + ' item_80'}>
                            <p className={styles.p + ' ' + styles.field_name}>End</p>
                            <p className={styles.p}>{eventJSON.end_date}</p>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}