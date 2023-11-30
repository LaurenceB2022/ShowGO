import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import React, {useContext, useState, useEffect} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import AuthorizedUser from './AuthorizedUser';

const AuthorizedUserComponent = (props) => {
    const username = props.username;
    const mode = props.remove;
    const filter = props.results;
    const[users, setUsers] = useState([])
    console.log(username + " venue name in component")

    async function getBannedUsers(){
        console.log('Reached banned users')
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
        }
        var x = await fetch('http://localhost:8080/blockedUsers/venue/' + username, requestOptions)
        .then(response => response.json())
        //console.log(x[0].user)
        setUsers(x)

        
        
    }

    useEffect(() => {
        getBannedUsers();
    }, []);

    return (
        <div>
            <div>
            {
                (users !== null && users !== '' && users.length > 0) ? users.map(userJSON => (
                    <AuthorizedUser username={userJSON.user.username} venue_name={username} mode={mode}/>
                )) : <></>
                
            }
            </div>
        </div>
        
    )
}
export default AuthorizedUserComponent;