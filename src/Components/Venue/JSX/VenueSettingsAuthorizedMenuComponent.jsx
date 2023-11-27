import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import Search from 'Assets/Search.svg';
import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from 'App';
import AuthorizedUserComponent from './AuthorizedUserComponent';
import AuthorizedUserComponentSearch from './AuthorizedUserComponentSearch'

const VenueSettingsAuthorizedMenuComponent = () => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;
    const [venue, setVenue] = useState('');
    const username = userState;
    const [userSearch, setUserSearch] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    console.log(username[0].username)

    function search(event){
        console.log('Reached Searched Users')
        /*if(event.type !== 'click' && event.key !== 'Enter') return; */
        event.preventDefault()
        fetch('http://localhost:8080/user/' + userSearch, {
            method: 'GET',
        }).then(response => response ? response.json() : [])
        .then(data => {
            if(data){
                console.log(data + 'Setting Results')
                setResults(data);
            }
        })
        
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
                <AuthorizedUserComponentSearch username={username[0].username} results={results} remove='add'/>
            </div>
        </div>
    )
}
export default VenueSettingsAuthorizedMenuComponent;