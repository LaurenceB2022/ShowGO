import 'index.css';
import styles from 'Components/SearchBar.module.css'
import Search from 'Assets/Search.svg';

export default function SearchBar (props) {
    const enterKeyEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        which: 13,
        keyCode: 13,
      });

    function search(event) {
        if(event.type != 'click' && event.key != 'Enter') return;
        // TODO
        // searching functionalities
    }

    return (
        <div id={props.id}>
            <div id={styles.search}>
                <input id={styles.input} type="text" placeholder='Search' onKeyUp={search}/>
                <img id={styles.img} src={Search} onClick={search} alt=""/>
            </div> 
        </div>      
    );
}