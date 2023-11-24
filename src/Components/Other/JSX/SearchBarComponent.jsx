import 'index.css';
import styles from 'Components/Other/CSS/SearchBarComponent.module.css'
import Search from 'Assets/Search.svg';
import { useState } from 'react';
import DatePicker from "react-datepicker";

export default function SearchBarComponent (props) {

    const [searchTypes, setSearchTypes] = useState([false, false]); //[date_range, cost]
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [results, setResults] = props.results;

    const [error, setError] = useState("");
    var timeout = null;

    //Updates the error message with the given timeout length in ms
    function updateError(message, ms) {
        if(timeout) {
            clearTimeout();
        }
        setError(message);
        timeout = setTimeout(() =>{
            setError("");
        }, ms);
    }

    //Searches for events based on the given criteria
    async function search(event) {
        if(event.type !== 'click' && event.key !== 'Enter') return;
        
        const value = document.getElementById(styles.input).value;
        if(value == "") {
            updateError("Please include search text.", 2500);
            return;
        }

        var startDateVal = searchTypes[0] ? startDate : "null";
        var endDateVal = searchTypes[0] ? endDate : "null";
        var minCost = document.getElementById(styles.min_cost) ? parseFloat(document.getElementById(styles.min_cost).value) : -1;
        var maxCost = document.getElementById(styles.max_cost) ? parseFloat(document.getElementById(styles.max_cost).value) : -1;
        
        //date_range
        if(searchTypes[0]) {
            if (endDate < startDate) {
                updateError("Please select a valid date range.", 2500);
                return;
            }
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            startDateVal = startDateVal.toDateString().substring(4) + " 12:00 AM";
            endDateVal = endDateVal.toDateString().substring(4) + " 12:59 PM";
        }

        if (searchTypes[1]) {
            minCost = parseFloat(document.getElementById(styles.min_cost).value);
            maxCost = parseFloat(document.getElementById(styles.max_cost).value);
            if (Number.isNaN(minCost) || Number.isNaN(maxCost)) {
                updateError("Please insert numbers for the ticket cost range.", 2500);
                return;
            } else if (minCost > maxCost || minCost < 0 || minCost >= 1000 || maxCost < 0 || maxCost >= 1000) {
                updateError("Invalid cost range selected (Tickets are $0.00-$999.99).", 2500);
                return;
            }
        }
        minCost = minCost.toString();
        maxCost = maxCost.toString();
        var events = await fetch('http://localhost:8080/events/filters/' + value + '/' + startDateVal + '/' + endDateVal + '/' + minCost + '/' + maxCost, {
            method: 'GET',
        }).then(response => response ? response.json() : []);
        console.log(events.length);
        setResults(events);
        console.log(results);
    }

    return (
        <div id={props.id}>
            <div className={styles.container}>
                <div id={styles.search_section}>
                    <div id={styles.search}>
                        <input id={styles.input} type="text" placeholder='Search' onKeyUp={search}/>
                        <img id={styles.img} src={Search} onClick={search} alt=""/>
                    </div>
                    <div id={styles.search_options}>
                        <span>
                            <label className={styles.search_label + ' ' + styles.search_checkbox_label}>Date Range</label>
                            <input className={styles.search_checkbox} type="checkbox" onChange={(value) => {setSearchTypes([value.target.checked, searchTypes[1]])}  } value="date_range"/>
                        </span>
                        <span>
                            <label className={styles.search_label + ' ' + styles.search_checkbox_label}>Price Range</label>
                            <input className={styles.search_checkbox} type="checkbox" onChange={(value) => {setSearchTypes([searchTypes[0], value.target.checked])}  } value="price_range"/>
                        </span>
                    </div>
                    <p className={styles.p}>{error}</p>
                </div>
                {searchTypes[0] &&
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
                {searchTypes[1] &&
                    <div className={styles.flex_column}>
                        <div>
                            <label class={styles.search_label}>Min</label>
                            <input id={styles.min_cost} class={styles.search_input} type="text" placeholder='Min Cost' onKeyUp={search}/>
                        </div>
                        <div>
                            <label class={styles.search_label}>Max</label>
                            <input id={styles.max_cost} class={styles.search_input} type="text" placeholder='Max Cost' onKeyUp={search}/>
                        </div>
                    </div>
                }
            </div>
        </div>   
    );
}