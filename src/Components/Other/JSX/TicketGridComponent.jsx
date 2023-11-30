import 'index.css';
import styles from 'Components/Other/CSS/TicketGridComponent.module.css';
import TicketComponent from 'Components/Other/JSX/TicketComponent';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from 'App';

/*
    TicketGridComponent displays a grid of TicketComponents based on the logged in user.
*/
export default function TicketGridComponent() {
    const userState = useContext(MyContext).userState;
    const user = userState[0];
    const [data, setData] = useState([]);
    
    async function fetchTickets() {
        if(!user) return;
        await fetch('http://localhost:8080/tickets/user/' + user.username, {
            method: 'GET'
        }).then(response => response.json())
        .then(tickets => tickets.filter(ticket => !ticket.redeemed && new Date(ticket.event.end_date) > new Date()))
        .then(data => setData(data));
    }

    useEffect(() => {
        fetchTickets();
    });
    
    return (
        <div className={styles.container}>
            {
            data.map(ticketJSON => (
                <TicketComponent ticket={ticketJSON}></TicketComponent>
            ))
            }
        </div>
    )
}