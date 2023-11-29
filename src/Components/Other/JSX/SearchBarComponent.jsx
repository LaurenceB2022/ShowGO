import 'index.css';
import styles from 'Components/Other/CSS/SearchBarComponent.module.css'
import Search from 'Assets/Search.svg';
import { useState } from 'react';
import DatePicker from "react-datepicker";

export default function SearchBarComponent (props) {

    const [error, setError] = useState("");
    const [searchTypes, setSearchTypes] = useState([false, false]); //[date_range, cost]
    const setResults = props.results ? props.results[1] : () => setError("FATAL ERROR: No results prop found.");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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

    //Takes a given date (MM/DD/YYYY and time HH:MM [24 hour]) and returns a date in the format MMM DD YYYY HH:MM AM/PM
    function formatTime(date, time) {
        var [month, day, year] = date.split(" ").slice(1, 4);
        var [hours, minutes] = time.split(":").map(value => parseInt(value));
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // Hour '0' should be '12'
        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        return month + " " + day + " " + year + " " + hours + ":" + minutes + " " + ampm;
    }

    //Searches for events based on the given criteria
    async function search(event) {
        if(event.type !== 'click' && event.key !== 'Enter') return;
        
        //Empty search = match all events (but still apply filter(s))
        var value = document.getElementById(styles.input).value;
        if (value === "") value = " ";
        var startDateStr = "null";
        var endDateStr = "null";
        var minCost = -1;
        var maxCost = -1;
        
        //date_range
        if(searchTypes[0]) {
            if (!startDate || !endDate || document.getElementById(styles.start_time).value === '' || document.getElementById(styles.end_time).value === '') {
                updateError("Please insert all date values.", 2500);
                return;
            }
            startDateStr = formatTime(startDate.toDateString(), document.getElementById(styles.start_time).value);
            endDateStr = formatTime(endDate.toDateString(), document.getElementById(styles.end_time).value);
            if (new Date(endDateStr) < new Date(startDateStr)) {
                updateError("Please select a valid date range.", 2500);
                return;
            }
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
        var events = await fetch('http://localhost:8080/events/filters/' + value + '/' + startDateStr + '/' + endDateStr + '/' + minCost + '/' + maxCost, {
            method: 'GET',
        }).then(response => response ? response.json() : []);
        setResults(events);
    }

    return (
        <div id={props.id}>
            <div id={styles.container}>
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
                            <DatePicker id={styles.start_date} className={styles.search_input} selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div>
                            <label class={styles.search_label}>To</label>
                            <DatePicker id={styles.end_date} className={styles.search_input} selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                    </div>
                }
                {searchTypes[0] &&
                    <div className={styles.flex_column}>
                        <div>
                            <input id={styles.start_time} className={styles.search_input} defaultValue="00:00" type='time' min="00:00" max="23:59"/>
                        </div>
                        <div>
                            <input id={styles.end_time} className={styles.search_input} defaultValue="23:59" type='time' min="00:00" max="23:59"/>
                        </div>
                    </div>
                }
                {searchTypes[1] &&
                    <div className={styles.flex_column}>
                        <div>
                            <label class={styles.search_label}>Min</label>
                            <input maxLength='6' id={styles.min_cost} class={styles.search_input} type="text" placeholder='Min Cost' onKeyUp={search}/>
                        </div>
                        <div>
                            <label class={styles.search_label}>Max</label>
                            <input maxLength='6' id={styles.max_cost} class={styles.search_input} type="text" placeholder='Max Cost' onKeyUp={search}/>
                        </div>
                    </div>
                }
            </div>
        </div>   
    );
}