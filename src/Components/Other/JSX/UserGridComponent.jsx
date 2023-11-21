import 'index.css';
import styles from 'Components/Other/CSS/UserGridComponent.module.css';
import { useEffect, useState } from 'react';
import UserComponent from 'Components/Other/JSX/UserComponent';

const UserGridComponent = (props) => {
    
    const [data, setData] = useState([]);
    var editDataFunction = props.editDataFunction;
    
    //TODO update dummy event
    const eventJSON = props.event ? props.event : 
    {
        guid: '0',
        image: null, //NOT IMPLEMENTED
        name: 'N/A',
        ticket_price: 'N/A',
        location: 'N/A',
        hide_location: 0,
        start_date: "Jan 01 1970 12:00 AM",
        end_date: "Jan 01 1970 12:00 AM",
        description: "N/A",
        max_attendees: 0
    };

    async function fetchEventUsers() {

        //TODO: Should be POST Request to get Users for the given event
        var x = await fetch('http://localhost:8080/users', {
            method: 'GET',
        }).then(response => response.json())
        setData(x);
    }

    useEffect(() => {
        fetchEventUsers();
    }, []);

      return (
          <div className={styles.container}>
           {
            data.map(userJSON => (
                <UserComponent deleteFunction={editDataFunction} user={userJSON}></UserComponent>
            ))
            }
        </div>
    )
}
export default UserGridComponent