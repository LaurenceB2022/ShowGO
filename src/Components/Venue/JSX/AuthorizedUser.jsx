import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import React, {useContext, useState, useEffect} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

const AuthorizedUser = (prop) => {
    const user_name = prop.username;
    const venue_name = prop.venue_name;
    const mode = prop.mode;
    console.log('Reached Authorized User')
    console.log('Authorized User: ' + user_name)

    const handleInput = (event) => {
        event.preventDefault();
        var requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'}
        }
        fetch('http://localhost:8080/blockedUsers/' + user_name + '/' + venue_name, requestOptions)
        .then(response => response.json())
       
        

    }

    return (
        <div id={styles.user}>
            <Link onClick={handleInput}>{user_name}</Link>
        </div>
    )
}
export default AuthorizedUser;