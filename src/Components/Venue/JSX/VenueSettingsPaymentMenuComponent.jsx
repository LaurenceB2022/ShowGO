import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState, useEffect, useContext} from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { MyContext } from 'App';

const VenueSettingsPaymentMenuComponent = (props) => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [venue, setVenue] = useState('');
    const [error, setError] = useState('');
    const username = userState;
    const navigator = useNavigate();

    const [data, setData] = useState({
        card_name: '',
        card_number: '',
        cvv: '',
        expr_date: ''
    })

    async function setPayment(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'},
            body: JSON.stringify({
                name: data.card_name,
                number: data.card_name,
                cvc: data.cvc,
                date: data.expr_date
            })
        };
        fetch('http://localhost:8080/venues', requestOptions)
        .then(response => {
            if(response.ok){
                console.log('Payment information successfully updated')
                setError('Successful Update')
                navigator('/payment')
            }
            else{
                console.log('Error updating payment information');
                setError('Error updating payment.')
            }
        })
    }

    function validateInformation(){
        var valid_info = true;
        const card_number = data.card_number;
        const card_name = data.card_name;
        const expiration_date = data.expr_date;
        const split = expiration_date.split('/');
        const cvv = data.cvv;
        if(card_number.length >= 15){
            valid_info = false;
            setError('Invalid Card Number')
        }
        if(!/^[a-zA-z]{2,} [a-zA-z]{2,}/.test(card_name)){
            valid_info = false;
            setError('Invalid Card Name')
        }
        if(!/^(0[1-9]|10|11|12)(20[0-9]{2})/.test(expiration_date) || new Date(split[1], split[0]) > new Date()){
            valid_info = false;
            setError('Invalid Expiration Date')
        }
        if(cvv.length >= 3){
            valid_info = false
            setError('Invalid CVV Number')
        }

        return valid_info;
    }

    async function submitInformation(){
        var check = validateInformation()
        if(check){
            setError('Payment information successfully updated.')
        }
        
    }

    const handleInput = (event) =>{
        const val = event.target.value;
        setData({
            ...data,
            [event.target.name]: val
        }
        );
    }

    const handleSubmit = (event) =>{
        console.log('Got to handleSubmit');
        event.preventDefault();
        submitInformation();
    }

    /*TO DO: Sprint 5 */
    return (
        <div className={styles.payment_container}>
            <h1>Payment Methods</h1>
            <span>
                <label>Card Name</label>
                <input type='text' onChange={handleInput}></input>
            </span>
            <span>
                <label>Card Number</label>
                <input type='text' onChange={handleInput}></input>
            </span>
            <span>
                <label>CVV</label>
                <input type='text' onChange={handleInput}></input>
            </span>
            <span>
                <label>Expiration Date</label>
                <input type='text' onChange={handleInput}></input>
            </span>
            {error?<label>{error}</label>:null}   
            <div className={styles.container_buttons}>
                    <button className={styles.button1} onClick={handleSubmit}>Save</button>
                    <button className={styles.button2} onClick={ console.log('Navigating back to home')}>
                    <Link to='/venuehome'>Cancel</Link></button>
            </div>
        </div>
    )
}
export default VenueSettingsPaymentMenuComponent;