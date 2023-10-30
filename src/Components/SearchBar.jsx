import 'index.css';
import styles from 'Components/SearchBar.module.css'
import Search from 'Assets/Search.svg';
import { useState } from 'react';

export default function SearchBar (props) {

    const [searchType, setSearchType] = useState('title'); //options: title, date-range, cost
    const [, setResults] = useState(props.results);
    function search(event) {
        if(event.type !== 'click' && event.key !== 'Enter') return;
        
        const value = document.getElementById(styles.input).value;
        if (value === '') return;


        // TODO
        switch (searchType) {
            case 'title':
                break;
            case 'date-range':
                break;
            case 'cost':
                break;
        }
        // searching functionalities
    }

    return (
        <div id={props.id}>
            <div className={styles.searchfields}>
                <div id={styles.search}>
                    <input id={styles.input} type="text" placeholder='Search' onKeyUp={search}/>
                    <img id={styles.img} src={Search} onClick={search} alt=""/>
                </div>
                <select onChange={() => setSearchType(document.getElementById(styles.searchType).value)} id={styles.searchType}>
                    <option value="title">Title</option>
                    <option value="date-range">Date Range</option>
                    <option value="cost">Cost</option>
                </select>
            </div>
            {searchType === 'date-range' &&
                <>
                    {/* TO DO -> text validation / formatting */}
                    <label class={styles.searchLabel}>From</label>
                    <input class={styles.searchInput} type="text" placeholder='yyyy-mm-dd' onKeyUp={search}/>
                    <br></br>
                    <label class={styles.searchLabel}>To</label>
                    <input class={styles.searchInput}type="text" placeholder='yyyy-mm-dd' onKeyUp={search}/>
                </>
            }
            {searchType === 'cost' &&
                <>
                    {/* TO DO -> text validation / formatting */}
                    <label class={styles.searchLabel}>Min</label>
                    <input class={styles.searchInput} type="text" placeholder='Minimum cost' onKeyUp={search}/>
                    <br></br>
                    <label class={styles.searchLabel}>Max</label>
                    <input class={styles.searchInput}type="text" placeholder='Maximum cost' onKeyUp={search}/>
                </>
            }
        </div>   
    );
}