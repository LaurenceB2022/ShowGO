import 'index.css';
import styles from 'Components/TicketCheckoutComplete.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from 'App';

export default function TicketCheckoutComplete() {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;

    return (
        <div id={styles.content}>
            <div className={styles.section_1 + ' item_20'}>
            <h1 id={styles.title}>Ticket Bought</h1>
            </div>
            <div className={styles.section_2 + ' item_40'}>
                <p>Thank you for buying a ticket to this event!<br></br>
                Your tickets can be viewed in your profile.</p>
            </div>
            <div className={styles.section_3 + ' item_20'}>
                <button>
                    <Link to='/home'>Home Page</Link>
                </button>
            </div>
        </div>
    )
}