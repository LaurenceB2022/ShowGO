import 'index.css';
import styles from 'Components/User/CSS/UserHomepage.module.css';
import {Link} from 'react-router-dom';
import SearchBarComponent from 'Components/Other/JSX/SearchBarComponent';
import EventGridComponent from 'Components/Other/JSX/EventGridComponent';
import { useState } from 'react';

export default function UserHomepage() {
    const [results, setResults] = useState(null);

    return (

        <div>
            <button id={styles.back}>
                <Link to='/login'>Log Out</Link>
            </button>
            <div className={styles.content}>
                <div className={styles.section_1}>
                    <SearchBarComponent results={[results, setResults]} id={styles.searchbar}/>
                </div>
                <div className={styles.section_2}>
                    <EventGridComponent />
                </div>
            </div>

        </div>
    )
}