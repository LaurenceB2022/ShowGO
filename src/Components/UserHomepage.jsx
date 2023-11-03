import 'index.css';
import styles from 'Components/UserHomepage.module.css';
import {Link} from 'react-router-dom';
import SearchBar from 'Components/SearchBar';
import GridEvents from 'Components/GridEvents';
import { useState } from 'react';

export default function UserHomepage(props) {
    const [, setLoggedIn] = props.loggedIn;
    const [, setLoggedInUserVenue] = props.loggedInUserVenue;
    const [results, setResults] = useState(null)
//TODO remove this temp code after done testing
    setLoggedInUserVenue("nathanielendick");
    setLoggedIn(true);
    return (

        <div>
            <button id={styles.back}>
                <Link to='/login'>Log Out</Link>
            </button>
            <div className={styles.content}>
                <div className={styles.section_1}>
                    <SearchBar results={[results, setResults]} id={styles.searchbar}/>
                </div>
                <div className={styles.section_2}>
                <GridEvents />
                </div>
            </div>

        </div>
    )
}