import 'index.css';
import styles from 'Components/TicketCheckout.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from 'App';

export default function TicketCheckout() {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;
    
    return (
        <div id={styles.content}>
            <button id={styles.back}>
                <Link to='/home/event/0'>Back</Link>
            </button>
            <div className={styles.section_1 + ' item_20'}>
                <h1 id={styles.buy_ticket}>Buy Ticket</h1>
                <p className={styles.p}>{'$5'} / Ticket</p>
            </div>
            <div className={styles.section_2 + ' item_80'}>
                <div className={styles.field_row}>
                    <label className='item_50'>Card Number</label>
                    <input className='item_50'></input>
                </div>
                <div className={styles.field_row}>
                    <label className='item_50'>Name On Card</label>
                    <input className='item_50'></input>
                </div>
                <div className={styles.field_row}>
                    <label className='item_50'>Expiration Date</label>
                    <input className='item_50'></input>
                </div>
                <div className={styles.field_row}>
                    <label className='item_50'>Security Code (CVV)</label>
                    <input className='item_50'></input>
                </div>
                <button className={true ? 'button-enabled' : 'button-disabled'}>
                    {true ?
                        (<Link to='/home/event/0/checkout/complete' className='link-active'>Purchase</Link>) :
                        (<>Purchase</>)
                    }
                </button>
                <p className={(false ? '' : styles.invalid) + ' ' + styles.p}>Card Info Error</p>
            </div>
        </div>
    )
}