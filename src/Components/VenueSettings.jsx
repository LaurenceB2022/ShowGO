import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/VenueSettings.module.css';
import React, {useState, useEffect} from 'react';
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

        <div>
            <div>
                <ul>
                    {settings.map(({name, id}) =>(
                        <li key={id}>
                            <Link to={`/venuesettings/${id}`}>{name}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <Outlet>
                    <Route path={`/venuesettings/`}></Route>
                </Outlet>
                
            </div>
        </div>
    )

}
export default VenueSettings;