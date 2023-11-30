import 'index.css';
import styles from 'Components/User/CSS/UserViewEvent.module.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import { useContext, useEffect } from 'react';
import { MyContext } from 'App';

export default function UserViewEvent() {
    const {_, __, userState} = useContext(MyContext);
    const [user, ___] = userState;

    const id = useParams().id;
    const location = useLocation();
    const eventJSON = !location.state ? {
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
        } : location.state.eventJSON;
        var blocked = false;
        var eventFull = false;

        async function checkCanPurchaseTicket() {
            var tickets = await fetch('http://localhost:8080/tickets/' + eventJSON.guid, {
                method: 'GET',
            }).then(response => response.json());
            console.log(tickets.length);
            if (tickets.length >= eventJSON.max_attendees) {
                eventFull = true;
            }

            var blockedUsers = await fetch('/blockedUsers/venue/' + eventJSON.venue.username, {
                method: 'GET',
            }).then(response => response.json());
            if (blockedUsers.includes(user.username)) {
                blocked = true;
            }
            
        }
    
        useEffect(() => {
            checkCanPurchaseTicket();
        }, []);
    

    return (
        <div id={styles.content}>
            <button id={styles.back}>
                <Link to='/home'>{"Back"}</Link>
            </button>
            <div className={'item_10'}>
                <h1 id={styles.name}>{eventJSON.name}</h1>
            </div>
            <div className={styles.section_2 + ' item_90'}>
                <div className={styles.event_fields + ' item_60'}>
                    <table id={styles.table_fields}>
                        <tr>
                            <td>Venue:</td>
                            <td>{eventJSON.venue.username}</td>
                        </tr>
                        <tr>
                            <td>Location:</td>
                            <td>{eventJSON.venue.location}</td>
                        </tr>
                        <tr>
                            <td>Start Date:</td>
                            <td>{eventJSON.start_date}</td>
                        </tr>
                        <tr>
                            <td>End Date:</td>
                            <td>{eventJSON.end_date}</td>
                        </tr>
                        <tr>
                            <td>Capacity:</td>
                            <td>{eventJSON.max_attendees}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{eventJSON.hide_location ? "<hidden>" : (eventJSON.location != "" ? eventJSON.location : eventJSON.venue.location)}</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.image_section + ' item_40'}>
                    <div>
                        <img id={styles.image} src={eventJSON.image ? eventJSON.image : (eventJSON.venue.pfp ? eventJSON.venue.pfp : ShowGoLogo)}/>
                        <p class={styles.p}>{'$' + eventJSON.ticket_price.toFixed(2)} / Ticket</p>
                    </div>
                    {new Date(eventJSON.end_date) > new Date() && !blocked && !eventFull ? 
                    (<button className='button_enabled'>
                        <Link className='link-active' to={'/home/event/' + id + '/checkout'} state={{eventJSON: eventJSON}}>Buy Ticket</Link>
                    </button>) : (<></>)
                    }
                </div>
            </div>
        </div>
    );
}