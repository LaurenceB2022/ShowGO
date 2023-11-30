import 'index.css';
import styles from 'Components/Other/CSS/YesNoPromptComponent.module.css';

/*
    YesNoPrompt displays a prompt with yes and no options. A function for the yes and no button can be passed as props
    to indicate the action taken for each button as well as a message.
*/
export default function YesNoPromptComponent(props) {
    var text = props.text ? props.text : '';
    var yesFunction = props.yesFunction ? props.yesFunction : () => {};
    var noFunction = props.noFunction ? props.noFunction : () => {};
    return (
        <div id={styles.container}>
            <div id={styles.content}>
                <h1 class={styles.h1}>{text}</h1>
                <span id={styles.buttons}>
                    <button className={styles.button + ' ' + styles.yes} onClick={yesFunction}>Yes</button>
                    <button className={styles.button + ' ' + styles.no + ' button_enabled'} onClick={noFunction}>No</button>
                </span>
            </div>
        </div>
    )
}