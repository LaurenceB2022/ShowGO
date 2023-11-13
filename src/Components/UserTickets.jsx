import 'index.css';
import styles from 'Components/UserTickets.module.css';
import { Link } from 'react-router-dom';
import GridTickets from './GridTickets';
import { useContext } from 'react';
import { MyContext } from 'App';

export default function UserTickets() {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;

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