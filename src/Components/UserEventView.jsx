import 'index.css';
import styles from 'Components/UserEventView.module.css';
import { Link } from 'react-router-dom';
import ShowGoLogo from 'Assets/ShowGoLogo.png';
import { useContext } from 'react';
import { MyContext } from 'App';

export default function UserEventView() {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;

//TODO insert event data in, fix routing (use event id, routing should go back to tickets or events based on prev screen), 

    return (
        <div id={styles.content}>
            <button id={styles.back}>
                <Link to='/home'>Back</Link>
            </button>
            <div className={'item_10'}>
                <h1 id={styles.name}>TITLE HERE TITLE HERE TITLE HERE TITLE HERE TITLE HERE </h1>
            </div>
            <div className={styles.section_2 + ' item_90'}>
                <div className={styles.event_fields + ' item_60'}>
                    <table id={styles.table_fields}>
                        <tr>
                            <td>Venue:</td>
                            <td>Venue Name</td>
                        </tr>
                        <tr>
                            <td>Start Date:</td>
                            <td>MMM DD, YYYY HH:MM</td>
                        </tr>
                        <tr>
                            <td>End Date:</td>
                            <td>MMM DD, YYYY HH:MM</td>
                        </tr>
                        <tr>
                            <td>Capacity:</td>
                            <td>###</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>100 John Doe Street, Hillsbroough NJ 08844</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.image_section + ' item_40'}>
                    <div>
                        <img id={styles.image} src={ShowGoLogo}/>
                        <p class={styles.p}>{'$5'} / Ticket</p>
                    </div>
                    <button className='button-enabled'>
                        <Link className='link-active' to='/home/event/0/checkout'>Buy Ticket</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}