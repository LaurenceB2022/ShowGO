import 'index.css';
import styles from 'Components/GridTickets.module.css';
import Ticket from 'Components/Ticket';
import ShowGoLogo from 'Assets/ShowGoLogo.png';

export default function GridTickets(props) {
    const ticketJSON = props.ticket ? props.ticket : 
    {
        guid: '0',
        owner: 'default',
        event_guid: '0',
        
        name: 'Name',
        start_date: 'Start_date',
        end_date: 'End_date',
        image: ShowGoLogo
    };
    const tickets = [ticketJSON, ticketJSON, ticketJSON, ticketJSON,
                    ticketJSON, ticketJSON, ticketJSON, ticketJSON,
                    ticketJSON, ticketJSON, ticketJSON, ticketJSON,
                    ticketJSON, ticketJSON, ticketJSON, ticketJSON];


    return (
        <div className={styles.container}>
            {
            tickets.map(ticketJSON => (
                <Ticket ticket={ticketJSON}></Ticket>
            ))
            }
        </div>
    )
}