import 'index.css';
import styles from 'Components/User/CSS/UserViewTickets.module.css';
import { Link } from 'react-router-dom';
import TicketGridComponent from 'Components/Other/JSX/TicketGridComponent';

export default function UserViewTickets() {

    return (
        <div id={styles.content}>
            <button id={styles.back}>
                <Link to='/home/'>Back</Link>
            </button>
            <div className={styles.section_1 + ' item_20'}>
            <h1 id={styles.title}>Tickets</h1>
            </div>
            <div className={styles.section_2 + ' item_80'}>
                <TicketGridComponent></TicketGridComponent>
            </div>
        </div>
    )
}