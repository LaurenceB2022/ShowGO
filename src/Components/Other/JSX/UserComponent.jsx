import 'index.css';
import styles from 'Components/Other/CSS/UserComponent.module.css';
import X from 'Assets/X.svg';
import ShowGoLogo from 'Assets/ShowGoLogo.png';

export default function UserComponent(props) {
    //TODO update dummy event
    const deleteFunction = props.deleteFunction;
    const userJSON = props.user ? props.user : 
    {
        username: 'N/A',
        name: 'N/A',
        pfp: null, //NOT IMPLEMENTED
    };

    return (
        <div id={styles.content}>
            <img id={styles.user_pfp} src={false ? null : ShowGoLogo}></img>
            <p className={styles.p}>{userJSON.username}</p>
            <p className={styles.p}>({userJSON.name})</p>
            <img id={styles.delete_button} src={X} onClick={() => deleteFunction(userJSON)}></img>
        </div>
    )
}