import 'index.css';
import styles from 'Components/UserHomepage.module.css';
import {Link} from 'react-router-dom';
import SearchBar from 'Components/SearchBar';
import GridEvents from 'Components/GridEvents';

export default function UserHomepage(props) {
    const [loggedIn, setLoggedIn] = props.loggedIn;
    const [loggedInUserVenue, setLoggedInUserVenue] = props.loggedInUserVenue;

//TODO remove this temp code after done testing
    setLoggedInUserVenue("nathanielendick");
    setLoggedIn(true);
    
    return (

        <div>
            <button id={styles.back}>
                <Link to='/login'>Log Out</Link>
            </button>
            <div class={styles.content}>
                <div class={styles.section_1}>
                    <SearchBar id={styles.searchbar}/>
                </div>
                <div class={styles.section_2}>
                <GridEvents />
                </div>
            </div>

        </div>
    )
}