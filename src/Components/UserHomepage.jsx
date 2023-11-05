import 'index.css';
import styles from 'Components/UserHomepage.module.css';
import {Link} from 'react-router-dom';
import SearchBar from 'Components/SearchBar';
import GridEvents from 'Components/GridEvents';
import { useContext, useState } from 'react';
import { MyContext } from 'App';

export default function UserHomepage() {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;

    const [results, setResults] = useState(null)
    //TODO remove this temp code after done testing
    setLoggedIn(true);
    setUserType('user');
    setUsername('nathanielendick');

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