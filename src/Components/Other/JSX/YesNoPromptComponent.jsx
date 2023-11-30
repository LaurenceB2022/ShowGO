import 'index.css';
import styles from 'Components/Other/CSS/YesNoPromptComponent.module.css';

export default function YesNoPromptComponent(props) {
    var text = props.txt;
    var yesFunction = props.yesFunction;
    var noFunction = props.noFunction;
    return (
        <div id={styles.container}>
            <div id={styles.content}>
                <h1 class={styles.h1}>{props.text}</h1>
                <span id={styles.buttons}>
                    <button className={styles.button + ' ' + styles.yes} onClick={yesFunction}>Yes</button>
                    <button className={styles.button + ' ' + styles.no + ' button_enabled'} onClick={noFunction}>No</button>
                </span>
            </div>
        </div>
    )
}