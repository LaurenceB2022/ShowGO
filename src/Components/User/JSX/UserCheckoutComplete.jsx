import 'index.css';
import styles from 'Components/User/CSS/UserCheckoutComplete.module.css';
import { Link } from 'react-router-dom';

export default function UserCheckoutComplete() {
    
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