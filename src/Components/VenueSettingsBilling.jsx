import 'index.css';
import styles from 'Components/VenueSettings.module.css';
import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from 'App';

const VenueSettingsBilling = (props) =>{
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;
    const [venue, setVenue] = useState('');
    const username = usernameState.toString();

    /*TO DO: Sprint 5 */
    return (
        <div className={styles.billing_container}>
            <span className={styles.billing_container_span}>
                <h1>Billing History</h1>
                <input className={styles.billing_search} type='text' placeholder='Search Payment By Number' />
            </span>
            <div className={styles.billing_result_box}>

            </div>
        </div>
    )
    
}
export default VenueSettingsBilling;