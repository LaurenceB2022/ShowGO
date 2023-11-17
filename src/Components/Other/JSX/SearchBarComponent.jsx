import 'index.css';
import styles from 'Components/Other/CSS/SearchBarComponent.module.css'
import Search from 'Assets/Search.svg';
import { useState } from 'react';
import DatePicker from "react-datepicker";

export default function SearchBarComponent (props) {

    const [searchType, setSearchType] = useState('title'); //options: title, date-range, cost
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [error, setError] = useState("");
    var timeout = null;

    function updateError(message, ms) {
        if(timeout) {
            clearTimeout();
        }
        setError(message);
        timeout = setTimeout(() =>{
            setError("");
        }, ms);
    }
    // const [, setResults] = useState(props.results);
    function search(event) {
        if(event.type !== 'click' && event.key !== 'Enter') return;
        
        const value = document.getElementById(styles.input).value;

        // TODO
        switch (searchType) {
            case 'name':
                if(value == '') {
                    updateError("Please type the name of the event you're looking for.", 2500);
                    return;
                }
                break;
            case 'date-range':
                if (endDate < startDate) {
                    updateError("Invalid date range selected.", 2500);
                    return;
                }
                break;
                case 'cost':
                    const minCost = parseFloat(document.getElementById(styles.min_cost).value);
                    const maxCost = parseFloat(document.getElementById(styles.max_cost).value);
                    if (Number.isNaN(minCost) || Number.isNaN(maxCost)) {
                        updateError("Please select valid numbers.", 2500);
                        return;
                    } else if (minCost > maxCost || minCost < 0 || minCost >= 1000 || maxCost < 0 || maxCost >= 1000) {
                        updateError("Invalid cost range selected.", 2500);
                        return;
                    }
                break;
        }
        // searching functionalities
    }

    return (
        <div id={props.id}>
            <div className={styles.container}>
                <div id={styles.search_section}>
                    <div id={styles.search}>
                        <input id={styles.input} type="text" placeholder='Search' onKeyUp={search}/>
                        <img id={styles.img} src={Search} onClick={search} alt=""/>
                    </div>
                    <p className={styles.p}>{error}</p>
                </div>
                <select onChange={() => setSearchType(document.getElementById(styles.search_type).value)} id={styles.search_type}>
                    <option className={styles.option} value="name">Title</option>
                    <option className={styles.option} value="date-range">Date Range</option>
                    <option className={styles.option} value="cost">Cost</option>
                </select>
            {searchType === 'date-range' &&
                <div className={styles.flex_column}>
                    <div>
                        <label class={styles.search_label}>From</label>
                        <DatePicker className={styles.search_input} selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div>
                        <label class={styles.search_label}>To</label>
                        <DatePicker className={styles.search_input} selected={endDate} onChange={(date) => setEndDate(date)} />
                    </div>
                </div>
            }
            {searchType === 'cost' &&
                <div className={styles.flex_column}>
                    <div>
                        <label class={styles.search_label}>Min</label>
                        <input id={styles.min_cost} class={styles.search_input} type="text" placeholder='Minimum cost' onKeyUp={search}/>
                    </div>
                    <div>
                        <label class={styles.search_label}>Max</label>
                        <input id={styles.max_cost} class={styles.search_input} type="text" placeholder='Maximum cost' onKeyUp={search}/>
                    </div>
                </div>
            }
            </div>
        </div>   
    );
}