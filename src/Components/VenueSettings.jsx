import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/VenueSettings.module.css';
import React, {useState, useEffect, useContext} from 'react';
import { Link, Outlet } from 'react-router-dom';
import VenueSettingsGeneral from './VenueSettingsGeneral';

function VenueSettings (){
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;
    const settings = [{
        name:'General Information',
        id:'general',
    },
    {
        name:'Security',
        id:'security'
    },
    {
        name:'Payment Information',
        id:'payment'
    },
    {
        name:'Authorized Users',
        id:'authorized'
    },
    {
        name:'Billing History',
        id:'billing'
    }
    ]

    return(

        <div className={styles.parent_container}>
            <div className={styles.parent_sidebar}>
                <ul>
                    {settings.map(({name, id}) =>(
                        <p key={id}>
                            <Link to={`/venuesettings/${id}`} username={usernameState} >{name}</Link>
                        </p>
                    ))}
                </ul>
            </div>

            <div >
                <Outlet />
            </div>
        </div>
    )

}
export default VenueSettings;