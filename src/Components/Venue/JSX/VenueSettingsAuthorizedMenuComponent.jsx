import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import Search from 'Assets/Search.svg';
import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from 'App';
import AuthorizedUserComponent from './AuthorizedUserComponent';

const VenueSettingsAuthorizedMenuComponent = () => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;
    const [venue, setVenue] = useState('');
    const username = userState;
    const [userSearch, setUserSearch] = useState('');
    const [error, setError] = useState("");
    console.log(username[0].username)

    async function search(event){
        if(event.type !== 'click' && event.key !== 'Enter') return;

    }

    /*TO DO: Sprint 5 */
    return (
        <div className={styles.subpage}>
            <div className={styles.container}>
                <AuthorizedUserComponent username={username[0].username} results='automatic' remove='remove'/>
            </div>

            <div className={styles.container}>
                    <div id={styles.search}>
                        <input id={styles.input} type="text" placeholder='Search User' onChange={(event) => setUserSearch(event.target.value)}/>
                        <img id={styles.img} src={Search} onClick={search} alt=""/>
                    </div>
                <AuthorizedUserComponent username={username[0].username} results={userSearch} remove='add'/>
            </div>
        </div>
    )
}
export default VenueSettingsAuthorizedMenuComponent;