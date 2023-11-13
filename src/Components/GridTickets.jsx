import 'index.css';
import styles from 'Components/GridTickets.module.css';
import Ticket from 'Components/Ticket';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from 'App';

export default function GridTickets(props) {
    const {_, __, userState} = useContext(MyContext);
    const [user,] = userState;
    const [data, setData] = useState([]);
    
    async function fetchTickets() {
        await fetch('http://localhost:8080/tickets/user/' + user.username, {
            method: 'GET'
        }).then(response => response.json()).then(data => setData(data));
    }

    useEffect(() => {
        fetchTickets();
    }, []);
    
    return (
        <div className={styles.container}>
            {
            data.map(ticketJSON => (
                <Ticket ticket={ticketJSON}></Ticket>
            ))
            }
        </div>
    )
}