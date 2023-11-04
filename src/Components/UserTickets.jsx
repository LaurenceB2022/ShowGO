import 'index.css';
import styles from 'Components/UserTickets.module.css';
import { Link } from 'react-router-dom';
import Ticket from './Ticket';
import GridTickets from './GridTickets';

export default function UserTickets(props) {
    const [, setLoggedIn] = props.loggedIn;
    const [, setLoggedInUserVenue] = props.loggedInUserVenue;

    return (
        <div id={styles.content}>
            <button id={styles.back}>
                <Link to='/home/'>Back</Link>
            </button>
            <div className={styles.section_1 + ' item_20'}>
            <h1 id={styles.title}>Tickets</h1>
            </div>
            <div className={styles.section_2 + ' item_80'}>
                <GridTickets></GridTickets>
            </div>
        </div>
    )
}