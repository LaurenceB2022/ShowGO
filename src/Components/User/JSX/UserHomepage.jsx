import 'index.css';
import styles from 'Components/User/CSS/UserHomepage.module.css';
import SearchBarComponent from 'Components/Other/JSX/SearchBarComponent';
import EventGridComponent from 'Components/Other/JSX/EventGridComponent';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from 'App';
import { useNavigate } from 'react-router';


export default function UserHomepage() {
    
    const navigator = useNavigate();
    const loggedInState = useContext(MyContext).loggedInState;
    const [results, setResults] = useState([]);

    async function fetchEvents() {

        var x = await fetch('http://localhost:8080/events', {
            method: 'GET',
        }).then(response => response.json())
        setResults(x);
    }

    useEffect(() => {
        //If not logged in, redirect to login screen
        if(!loggedInState[0]) {
            navigator('/login');
        }
        fetchEvents();
    }, loggedInState);

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