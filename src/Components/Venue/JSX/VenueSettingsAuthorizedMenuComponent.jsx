import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from 'App';

const VenueSettingsAuthorizedMenuComponent = () => {
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
export default VenueSettingsAuthorizedMenuComponent;