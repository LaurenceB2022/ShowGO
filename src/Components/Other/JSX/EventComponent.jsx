import 'index.css';
import styles from 'Components/Other/CSS/EventComponent.module.css';
import { Link } from 'react-router-dom';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import { useContext } from 'react';
import { MyContext } from 'App';

//TODO add image data
const EventComponent = (props) => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [loggedIn, setLoggedIn] = loggedInState;
    const [userType, setUserType] = userTypeState;
    
    //TODO update dummy event
    const eventJSON = props.event ? props.event : 
    {
        guid: 'N/A',
        venue: {username: 'N/A',
                address: 'N/A'},
        start_date: 'Jan 01 1970 12:00 AM',
        end_date: 'Jan 01 1970 12:59 PM',
        ticket_price: 0.00,
        name: 'N/A',
        description: 'N/A',
        location: 'N/A',
        hide_location: 0,
        max_attendees: 0,
        image: null
    };
    return(
        <div className={styles.container}>
            {/* TODO change link to be dynamic based on user login type */}
            <Link to={(userType === 'user' ? "/home/event/" : "/venuehome/event/") + eventJSON.guid} state={{eventJSON: eventJSON}}>
                <p id={styles.name} className={styles.p + ' item_10'}>{eventJSON.name}</p>
                <div className={styles.section_1 + ' item_90'}>
                    <img id={styles.img} className='item_50' src={eventJSON.image ? eventJSON.image: (eventJSON.venue.pfp ? eventJSON.venue.pfp : ShowGoLogo)}></img>
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
                        <p className={styles.p + ' item_10'} id={styles.ticket_price}>{'$' + eventJSON.ticket_price.toFixed(2)}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default EventComponent;