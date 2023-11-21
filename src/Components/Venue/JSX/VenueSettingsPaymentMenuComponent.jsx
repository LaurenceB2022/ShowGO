import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from 'App';

const VenueSettingsPaymentMenuComponent = (props) => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [venue, setVenue] = useState('');
    const username = userState;

    /*TO DO: Sprint 5 */
    return (
        <div>
            
        </div>
    )
}
export default VenueSettingsPaymentMenuComponent;