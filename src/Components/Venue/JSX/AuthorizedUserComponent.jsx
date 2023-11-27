import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import React, {useContext, useState, useEffect} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import AuthorizedUser from './AuthorizedUser';

const AuthorizedUserComponent = (props) => {
    const[users, setUsers] = useState([])
    const username = props.username;
    const mode = props.remove;
    const filter = props.results;
    console.log(filter)

    function getBannedUsers(){
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
        }
        fetch('http://localhost:8080/blockedUsers/venue/' + username, requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data !== null){
                setUsers(data);
            }
            else{
                setUsers('');
            }
        })
        
    }

    function getSearchedUsers(){
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'}
        }
        fetch('http://localhost:8080/user/' + filter, requestOptions)
        .then(response => response.json())
        .then(data => { 
            if(data !== null){
                setUsers(data);
            }
        })
        

    }

    useEffect(() => {
        if(filter === 'automatic'){
            getBannedUsers();
        }
        else if(filter !== ''){
            getSearchedUsers();
        }
        
    }, []);

    return (
        <div>
            {
                (users !== null && users !== '') ? users.map(userJSON => (
                    <AuthorizedUser username={userJSON.username} venue_name={username} mode={mode}/>
                )) : <></>
            }
        </div>
    )
}
export default AuthorizedUserComponent;