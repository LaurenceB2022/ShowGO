import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettings.module.css';
import React, {useState} from 'react';

const VenueSettingsBillingMenuComponent = () =>{
    const [venue, setVenue] = useState('');

    /*TO DO: Sprint 5 */
    return (
        <div className={styles.billing_container}>
            <span className={styles.billing_container_span}>
                <h1>Billing History</h1>
                <input className={styles.billing_search} type='text' placeholder='Search Payment By Number' />
            </span>
            <div className={styles.billing_result_box}>

            </div>
        </div>
    )
    
}
export default VenueSettingsBillingMenuComponent;