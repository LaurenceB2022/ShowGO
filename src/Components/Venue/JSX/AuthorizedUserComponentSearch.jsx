import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import React, {useContext, useState, useEffect} from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import AuthorizedUser from './AuthorizedUser';

const AuthorizedUserComponentSearch = (props) => {
    const username = props.username;
    const mode = props.remove;
    const filter = props.results;
    const[users, setUsers] = useState([])
    console.log(filter + " filter in component")
    console.log(username + " venue name in component")

    return (
        <div>
            <div>
                {
                    (filter.username !== '' && filter.username !== null) ? filter.map(userJSON => {
                        <AuthorizedUser username={userJSON.username} venue_name={username} mode={mode} />
                    }) : <></>
                }
            </div>
        </div>
        
    )
}
export default AuthorizedUserComponentSearch;