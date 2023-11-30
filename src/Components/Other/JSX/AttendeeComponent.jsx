import 'index.css';
import styles from 'Components/Other/CSS/AttendeeComponent.module.css';
import X from 'Assets/X.svg';
import Checkmark from 'Assets/Checkmark.svg';
import ShowGoLogo from 'Assets/ShowGoLogo.png';

export default function AttendeeComponent(props) {
    //TODO update dummy event
    const updateFunction = props.updateFunction;
    const deleteFunction = props.deleteFunction;
    const ticket = props.ticket ? props.ticket : [];

    return (
        <div className={ticket.redeemed ? styles.redeemed : ''} id={styles.content}>
            <img id={styles.user_pfp} src={ticket.owner.pfp ? ticket.owner.pfp : ShowGoLogo}></img>
            <p className={styles.p}>{ticket.owner.username}</p>
            <p className={styles.p}>({ticket.owner.name})</p>
            <div id={styles.buttons}>
                <img id={styles.checkin_button} src={Checkmark} onClick={() => updateFunction(ticket)}></img>
                <img id={styles.delete_button} src={X} onClick={() => deleteFunction(ticket)}></img>
            </div>
        </div>
    )
}