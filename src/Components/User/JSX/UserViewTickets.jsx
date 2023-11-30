import 'index.css';
import styles from 'Components/User/CSS/UserViewTickets.module.css';
import { Link, useNavigate } from 'react-router-dom';
import TicketGridComponent from 'Components/Other/JSX/TicketGridComponent';
import { useContext, useEffect } from 'react';
import { MyContext } from 'App';

/*
    UserViewTickets allows Users to view their tickets. It displays a grid of tickets based on the logged in user.
*/
export default function UserViewTickets() {

    const navigator = useNavigate();
    const loggedInState = useContext(MyContext).loggedInState;

    useEffect(() => {
        //If not logged in, redirect to login screen
        if(!loggedInState[0]) {
            navigator('/login');
        }
    }, [loggedInState, navigator]);

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