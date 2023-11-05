import 'index.css';
import styles from 'Components/Event.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from 'App';


//TODO add a link to the event and a backtrack link to get back to previous page
const Event = (props) => {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;

    const eventJSON = props.event ? props.event : 
    {
        guid: '0', //TODO remove me once guid works
        image: 'N/A',
        name: 'N/A',
        start_date: 'N/A',
        end_date: 'N/A',
        ticket_price: 'N/A'
    };

    return(
        <div className={styles.container}>
            {/* TODO change link to be dynamic based on user login type */}
            <Link to={'/home/event/' + eventJSON.guid}>
            <p id={styles.name} className={styles.p + ' item_10'}>{eventJSON.name}</p>
            <div className={styles.section_1 + ' item_90'}>
                <img id={styles.img} className='item_50' src={eventJSON.image}></img>
                <div className={styles.time_and_ticket + ' item_50'}>
                    <span className='item_10'>
                        <p className={styles.p + ' ' + styles.field_name}>Start</p>
                        <p className={styles.p}>{eventJSON.start_date}</p>
                    </span>
                    <br></br>
                    <span className='item_80'>
                        <p className={styles.p + ' ' + styles.field_name}>End</p>
                        <p className={styles.p}>{eventJSON.end_date}</p>
                    </span>
                    <p className={styles.p + ' item_10'} id={styles.ticket_price}>{eventJSON.ticket_price}</p>
                </div>
            </div>
            </Link>
        </div>
    )
}
export default Event;