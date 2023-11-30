import 'index.css';
import styles from 'Components/User/CSS/UserHomepage.module.css';
import SearchBarComponent from 'Components/Other/JSX/SearchBarComponent';
import EventGridComponent from 'Components/Other/JSX/EventGridComponent';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from 'App';
import { useNavigate } from 'react-router';

/*
    The UserHomepage displays all events in the database for the user to view. Users can also search for and filter
    events. Upon clicking an event, a user will be navigated to the event's page.
*/
export default function UserHomepage() {
    
    const navigator = useNavigate();
    const loggedInState = useContext(MyContext).loggedInState;
    const [results, setResults] = useState([]);

    //Fetches all events in the database for display.
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
    }, [loggedInState, navigator]);

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