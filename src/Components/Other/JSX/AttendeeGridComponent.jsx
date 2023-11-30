import 'index.css';
import styles from 'Components/Other/CSS/AttendeeGridComponent.module.css';
import { useEffect, useState } from 'react';
import AttendeeComponent from 'Components/Other/JSX/AttendeeComponent';

const AttendeeGridComponent = (props) => {
    
    const [tickets, setTickets] = props.tickets;
    const updateFunction = props.updateFunction;
    const deleteFunction = props.deleteFunction;

      return (
          <div className={styles.container}>
           {
            tickets.map(ticketJSON => (
                <AttendeeComponent updateFunction={updateFunction} deleteFunction={deleteFunction} ticket={ticketJSON}></AttendeeComponent>
            ))
            }
        </div>
    )
}
export default AttendeeGridComponent