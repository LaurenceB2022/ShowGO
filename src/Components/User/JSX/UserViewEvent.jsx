import 'index.css';
import styles from 'Components/User/CSS/UserViewEvent.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from 'App';

/*
    UserViewEvent allows a view to view an event page. They may purchase a ticket if the event isn't over, full, or if
    they are blocked by the venue. Upon clicking 'Buy Ticket'
*/
export default function UserViewEvent() {
    const user = useContext(MyContext).userState[0];
    const loggedInState = useContext(MyContext).loggedInState;

    const id = useParams().id;
    const location = useLocation();
    const navigator = useNavigate();

    var [full, setFull] = useState('N/A'); //if event is full or not
    var [blocked, setBlocked] = useState('N/A'); //if user is blocked or not
    const eventJSON = location.state.eventJSON;

        async function checkCanPurchaseTicket() {
            await fetch('http://localhost:8080/tickets/' + eventJSON.guid, {
                method: 'GET',
            }).then(response => response.json()).then(tickets => {setFull(tickets.length >= eventJSON.max_attendees)});
            
            await fetch('http://localhost:8080/blockedUsers/venue/' + eventJSON.venue.username, {
                method: 'GET',
            }).then(response => response.json()).then(blockedUsers => {setBlocked(blockedUsers.map(bu => bu.user.username).includes(user.username))});
        }
        
        useEffect(() => {
            //If not logged in, redirect to login screen
            if(!loggedInState[0]) {
                navigator('/login');
            } else {
                checkCanPurchaseTicket();
            }
        }, [loggedInState, navigator]);

    return (
        <div id={styles.content}>
            <button id={styles.back}>
                <Link to='/home'>Back</Link>
            </button>
            <div className='item_10'>
                <h1 id={styles.name}>{eventJSON.name}</h1>
            </div>
            <div className={styles.section_3 + ' item_90'}>
                <div className={styles.event_fields + ' item_60'}>
                    <table id={styles.table_fields}>
                        <tr>
                            <td className={styles.td_small}>Venue:</td>
                            <td className={styles.td}>{eventJSON.venue.username}</td>
                        </tr>
                        <tr>
                            <td className={styles.td_small}>Description:</td>
                            <td className={styles.td}>{eventJSON.description ? eventJSON.description : eventJSON.venue.description}</td>
                        </tr>
                        <tr>
                            <td className={styles.td_small}>Start Date:</td>
                            <td className={styles.td}>{eventJSON.start_date}</td>
                        </tr>
                        <tr>
                            <td className={styles.td_small}>End Date:</td>
                            <td className={styles.td}>{eventJSON.end_date}</td>
                        </tr>
                        <tr>
                            <td className={styles.td_small}>Capacity:</td>
                            <td className={styles.td}>{eventJSON.max_attendees}</td>
                        </tr>
                        <tr>
                            <td className={styles.td_small}>Address:</td>
                            <td className={styles.td}>{eventJSON.hide_location ? "<hidden>" : (eventJSON.location !== "" ? eventJSON.location : eventJSON.venue.location)}</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.image_section + ' item_40'}>
                    <div>
                        <img alt='event' id={styles.image} src={eventJSON.image ? eventJSON.image : (eventJSON.venue.pfp ? eventJSON.venue.pfp : ShowGoLogo)}/>
                        <p className={styles.p}>{'$' + eventJSON.ticket_price.toFixed(2)} / Ticket</p>
                    </div>
                    {new Date(eventJSON.end_date) > new Date() && !full && !blocked &&
                    <button className='button_enabled'>
                        <Link className='link-active' to={'/home/event/' + id + '/checkout'} state={{eventJSON: eventJSON}}>Buy Ticket</Link>
                    </button>
                    }
                    {!(new Date(eventJSON.end_date) > new Date()) && <p className={styles.p + ' invalid'}>The event has already ended.</p>}
                    {full !== 'N/A' && full && (<p className={styles.p + ' invalid'}>The event is full.</p>)}
                    {blocked !== 'N/A' && blocked && (<p className={styles.p + ' invalid'}>This venue has blocked you from buying tickets to their events.</p>)}
                </div>
            </div>
        </div>
    );
}