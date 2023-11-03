import 'index.css';
import styles from 'Components/UserEventView.module.css';
import { Link } from 'react-router-dom';

export default function UserEventView(props) {
    const [, setLoggedIn] = props.loggedIn;
    const [, setLoggedInUserVenue] = props.loggedInUserVenue;

    return (
        <div>
            <button id={styles.back}>
                <Link to='/home'>Back</Link>
            </button>
        </div>
    );
}