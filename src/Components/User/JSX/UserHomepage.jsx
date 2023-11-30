import 'index.css';
import styles from 'Components/User/CSS/UserHomepage.module.css';
import {Link} from 'react-router-dom';
import SearchBarComponent from 'Components/Other/JSX/SearchBarComponent';
import EventGridComponent from 'Components/Other/JSX/EventGridComponent';
import { useEffect, useState } from 'react';

export default function UserHomepage() {
    const [results, setResults] = useState([]);

    async function fetchEvents() {

        var x = await fetch('http://localhost:8080/events', {
            method: 'GET',
        }).then(response => response.json())
        setResults(x);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <div className={styles.content}>
                <div className={styles.section_1}>
                    <SearchBarComponent results={[results, setResults]} id={styles.searchbar}/>
                </div>
                <div className={styles.section_2}>
                    <EventGridComponent events={[results, setResults]}/>
                </div>
            </div>

        </div>
    )
}