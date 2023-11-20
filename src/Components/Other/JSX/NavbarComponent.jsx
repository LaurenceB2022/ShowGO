import 'index.css';
import styles from 'Components/Other/CSS/NavbarComponent.module.css';
import {Link} from 'react-router-dom';
import { MyContext } from 'App';
import { useContext } from 'react';

export default function NavbarComponent () {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [loggedIn, setLoggedIn] = loggedInState;
    const [userType, setUserType] = userTypeState;
    const [user, setUser] = userState;

    function logOut() {
        setLoggedIn(false);
        setUserType(null);
        setUser(null);
    }

    return (
        <div className={styles.navbar}>
            <span className={styles.section_1 + ' item_10'}>
                <text className={styles.text}>ShowGO</text>
                <svg viewBox="0 0 75 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.1023 51.7605C19.9155 48.6925 15.4774 47.8389 12.0623 49.3234L8.22971 45.6336C6.86335 44.3182 6.18016 43.6604 5.88375 42.9287C5.62303 42.285 5.56627 41.6037 5.7216 40.9826C5.8982 40.2765 6.47749 39.6873 7.63606 38.5088L38.2525 7.3667C39.4112 6.18814 39.9904 5.59897 40.6988 5.40488C41.3221 5.23407 42.0116 5.27167 42.669 5.51183C43.4164 5.78491 44.0996 6.44265 45.4659 7.75811L49.298 11.4474C47.8923 14.8666 48.8771 19.2338 52.0638 22.3018C55.2506 25.3698 59.6883 26.223 63.1034 24.7385L66.9354 28.4278C68.3019 29.7433 68.985 30.401 69.2814 31.1328C69.5422 31.7766 69.5989 32.4575 69.4435 33.0788C69.267 33.7849 68.6877 34.374 67.5291 35.5526L36.9126 66.6947C35.7541 67.8732 35.1748 68.4624 34.4663 68.6565C33.8431 68.8272 33.1536 68.7899 32.4961 68.5496C31.7488 68.2765 31.0657 67.6189 29.6992 66.3033L25.8676 62.6145C27.2734 59.1954 26.2891 54.8286 23.1023 51.7605Z" stroke="#D9D9D9" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
            <span className={styles.section_2 + ' item_90'}>
                {loggedIn && userType==='user' ?
                    (<>
                    <text className={styles.text}>{user.name}</text>
                    <img src={user.pfp}/>
                    <Link to='/home' className={styles.navbarLink}>Home</Link>
                    <Link to='/settings' className={styles.navbarLink}>Settings</Link>
                    <Link to='/tickets' className={styles.navbarLink}>Tickets</Link>
                    <Link to='/login' className={styles.navbarLink} onClick={logOut}>Sign Out</Link>
                    </>) :
                    (<></>) 
                }
                {loggedIn && userType==='venue' ?
                    (<>
                    <text className={styles.text}>{user.name}</text>
                    <img src={user.pfp}/>
                    <Link to='/venuehome' className={styles.navbarLink}>Home</Link>
                    <Link to='/venuesettings/general' className={styles.navbarLink}>Settings</Link>
                    <Link to='/login' className={styles.navbarLink} onClick={logOut}>Sign Out</Link>
                    </>) :
                    (<></>) 
                }
            </span>
        </div>       
    );
}