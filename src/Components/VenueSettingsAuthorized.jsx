import 'index.css';
import styles from 'Components/VenueSettings.module.css';
import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from 'App';

const VenueSettingsAuthorized = (props) => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;
    const [venue, setVenue] = useState('');
    const username = userState;

    /*TO DO: Sprint 5 */
    return (
        <div>
            
        </div>
    )
}
export default VenueSettingsAuthorized;