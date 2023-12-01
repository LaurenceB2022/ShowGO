import 'index.css';
import styles from 'Components/Other/CSS/AttendeeGridComponent.module.css';
import AttendeeComponent from 'Components/Other/JSX/AttendeeComponent';

/*
    AttendeeGridComponent displays a list of AttendeeComponents. It represents the list of purchased tickets.
    It also passes down an update and delete function to be applied when selecting the checkmark or X on an AttendeeComponent.
*/
export default function AttendeeGridComponent(props) {
    
    const tickets = props.tickets != null ? props.tickets[0] : [null, ];

    //Functions to run upon clicking the checkmark / X buttons are passed down the Component tree
    const updateFunction = props.updateFunction ? props.updateFunction : () => {};
    const deleteFunction = props.deleteFunction ? props.updateFunction : () => {};

      return (
          <div className={styles.container}>
           {tickets != null && tickets.map(ticketJSON => (
                <AttendeeComponent updateFunction={updateFunction} deleteFunction={deleteFunction} ticket={ticketJSON}></AttendeeComponent>
            ))
            }
        </div>
    )
}