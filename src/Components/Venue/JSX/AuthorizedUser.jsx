import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import React from 'react';
import { Link} from 'react-router-dom';

/*
    AuthorizedUser component takes in a prop with a username value, and displays that information for a User which is banned from purchasing tickets
    for an event hosted by the current Venue.
*/

const AuthorizedUser = (prop) => {
    const user_name = prop.username;

    return (
        <div id={styles.user}>
            {
               (user_name !== '' && user_name !== null) ? <Link >{user_name}</Link> 
               : <></>
            }
            
        </div>
    )
}
export default AuthorizedUser;