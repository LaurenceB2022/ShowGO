import { MyContext } from 'App';
import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useContext} from 'react';
import { Link, Outlet } from 'react-router-dom';

/*
    VenueSettings component displays a sidebar with mapped links to the subpages. Contains an outlet which displays
    the selected subpage link. The default link is the general subpage. 
*/
function VenueSettings (){
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
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

    //Links selected only update the Outlet component, while keeping the parent VenueSettings page visible.
    return(

        <div className={styles.parent_container}>
            <div className={styles.parent_sidebar}>
                <ul>
                    {settings.map(({name, id}) =>(
                        <p key={id}>
                            <Link to={`/venuesettings/${id}`} username={userState} >{name}</Link>
                        </p>
                    ))}
                </ul>
            </div>

            <div className={styles.sub_container}>
                <Outlet />
            </div>
        </div>
    )

}
export default VenueSettings;