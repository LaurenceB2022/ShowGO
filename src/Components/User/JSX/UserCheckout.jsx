import 'index.css';
import styles from 'Components/User/CSS/UserCheckout.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from 'App';
import Checkmark from 'Assets/Checkmark.svg';
import X from 'Assets/X.svg';

/*
    UserCheckout displays a screen for users to fill in credit card information (mock) to purchase a ticket. Upon hitting
    'Purchase', if the credentials are valid, the ticket will be purchased and the user will be sent to the UserCheckoutComplete
    page.
*/
export default function UserCheckout() {
    const user = useContext(MyContext).userState[0];
    const loggedInState = useContext(MyContext).loggedInState;
    
    const id = useParams().id; //event id from the url
    const location = useLocation(); //getting state values passed in
    const navigator = useNavigate();
    
    
    const [error, setError] = useState("");
    const [data, setData] = useState([false, false, false, false]); //Validation state
    var timeout = null;
    const eventJSON = !location.state ? {
        guid: 'N/A',
        venue: {username: 'N/A',
                address: 'N/A'},
        start_date: 'Jan 01 1970 12:00 AM',
        ticket_price: 0.00,
        end_date: 'Jan 01 1970 12:00 AM',
        name: 'N/A',
        description: 'N/A',
        location: 'N/A',
        hide_location: 0,
        max_attendees: 0
    }
         : location.state.eventJSON;

    useEffect(() => {
        //If not logged in, redirect to login screen
        if(!loggedInState[0]) {
            navigator('/login');
        }
    }, [loggedInState, navigator]);

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

    //Handles the request to purchase a ticket. Invalid if the user is blocked or the event is full.
    async function purchaseTicket() {
        if(!data.every(v => v)) return;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'},
            body: JSON.stringify(
                {
                    owner: user,
                    event: eventJSON    
                })
        };
        fetch('http://localhost:8080/tickets', requestOptions)
        .then(response => response.text()).then(text => {
            console.log(text);
            if (text === 'Buyer is a blocked user') {
                updateError('You are blocked from purchasing tickets from this venue.', 2500);
            } else if (text === 'Event is at maximum attendance') {
                updateError('This event is full.', 2500);
            } else {
                navigator('/home/event/' + id + '/checkout/complete')
            }
        });
    }

    //Data validation for the fields
    function checkData(field) {
        var temp = [...data];
        switch (field) {
            case 'card_number':
                const card_number = document.getElementById(styles.card_number).value;
                temp[0] = new RegExp('[0-9]{15,}').test(card_number);
                break;
            case 'name_on_card':
                const name_on_card = document.getElementById(styles.name_on_card).value;
                temp[1] = new RegExp('[a-zA-z]{2,} [a-zA-z]{2,}').test(name_on_card);
                break;
            case 'expiration_date':
                const expiration_date = document.getElementById(styles.expiration_date).value;
                const split = expiration_date.split('/');
                temp[2] = (new RegExp('(0[1-9]|10|11|12)/(20[0-9]{2})').test(expiration_date) && new Date(split[1], split[0]) > new Date());
                break;
            case 'cvv':
                const cvv = document.getElementById(styles.cvv).value;
                temp[3] =  new RegExp('[0-9]{3,}').test(cvv);
                break;
            default: break;
        }
        setData(temp);
    }
    
    return (
        <div id={styles.content}>
            <button id={styles.back}>
                <Link to={'/home/event/' + id} state={{eventJSON: eventJSON}}>Back</Link>
            </button>
            <div className={styles.section_1 + ' item_20'}>
                <h1 id={styles.buy_ticket}>Purchase Your Ticket</h1>
                <p className={styles.p}>{'$' + eventJSON.ticket_price.toFixed(2)} / Ticket</p>
            </div>
            <div className={styles.section_2 + ' item_80'}>
                <div className={styles.field_row}>
                    <label className='item_40'>Card Number</label>
                    <input id={styles.card_number} className={styles.input + ' item_50'} maxLength='16' onChange={() => checkData('card_number')}></input>
                    <img className='item_10' src={data[0] ? Checkmark : X} alt=""/>
                </div>
                <div className={styles.field_row}>
                    <label className='item_40'>Name On Card</label>
                    <input maxLength='50' id={styles.name_on_card}  className={styles.input + ' item_50'} onChange={() => checkData('name_on_card')}></input>
                    <img className='item_10' src={data[1] ? Checkmark : X} alt=""/>
                </div>
                <div className={styles.field_row}>
                    <label className='item_40'>Expiration Date</label>
                    <input id={styles.expiration_date} className={styles.input + ' item_50'} placeholder='MM/YYYY' maxLength='7' onChange={() => checkData('expiration_date')}></input>
                    <img className='item_10' src={data[2] ? Checkmark : X} alt=""/>
                </div>
                <div className={styles.field_row}>
                    <label className='item_40'>CVV / CVC</label>
                    <input id={styles.cvv} className={styles.input + ' item_50'} type='text' maxLength='4' onChange={() => checkData('cvv')}></input>
                    <img className='item_10' src={data[3] ? Checkmark : X} alt=""/>
                </div>
                <p className='invalid'>{error ? error : ""}</p>
                <button className={data.every(v => v) ? 'button_enabled' : 'button_disabled'} onClick={() => purchaseTicket()}>Purchase</button>
            </div>
        </div>
    )
}