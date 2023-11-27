import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import Search from 'Assets/Search.svg';
import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from 'App';
import AuthorizedUserComponent from './AuthorizedUserComponent';
import AuthorizedUserComponentSearch from './AuthorizedUserComponentSearch'
import AuthorizedUser from './AuthorizedUser';

const VenueSettingsAuthorizedMenuComponent = () => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUser] = userState;
    const[users, setUsers] = useState([])
    const [venue, setVenue] = useState('');
    const username = userState;
    const [userSearch, setUserSearch] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    console.log(username[0].username)

    
    function blockUser(){
        var requestOptions = {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'},
                body: JSON.stringify({
                    user_username: userSearch,
                    venue_username: username[0].username
                })
            }
            fetch('http://localhost:8080/blockedUsers/' + userSearch + '/' + username[0].username, requestOptions)
            .then(response => {
                if(response.ok){
                    return response.json(); 
                    
                }
                else{
                    console.error(error);
                    setError('Username not found, or already created.')
                    return null;
                }
            })
    }

    async function getBannedUsers(){
        console.log('Reached banned users')
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
        }
        var x = await fetch('http://localhost:8080/blockedUsers/venue/' + username[0].username, requestOptions)
        .then(response => response.json())
        //console.log(x[0].user)
        setUsers(x)

        
        
    }

    useEffect(() => {
        getBannedUsers();
    }, []);
    
    

    /*TO DO: Sprint 5 */
    return (
        <div className={styles.subpage}>
            <div className={styles.container}>
            <div>
                {
                    (users.length > 0) ? users.map(userJSON => {
                        <AuthorizedUser username={userJSON.username} venue_name={username[0].username} mode='delete' />
                    }) : <></>
                }
            </div>
                {/*<AuthorizedUserComponent username={username[0].username} results='automatic' remove='remove'/> */}
            </div>
            <div className={styles.container}>
                    <div id={styles.search}>
                        <input id={styles.input} type="text" placeholder='Search User' onChange={(event) => setUserSearch(event.target.value)}/>
                        <img id={styles.img} src={Search} onClick={blockUser} alt=""/>
                    </div>
                    {error?<label>{error}</label>:null}   
                {/*<AuthorizedUserComponentSearch username={username[0].username} results={results} remove='add'/> */}
            </div>
        </div>
    )
}
export default VenueSettingsAuthorizedMenuComponent;