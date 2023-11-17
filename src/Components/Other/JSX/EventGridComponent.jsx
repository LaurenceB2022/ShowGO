import 'index.css';
import styles from 'Components/Other/CSS/EventGridComponent.module.css';
import EventComponent from 'Components/Other/JSX/EventComponent';
import { useEffect, useState } from 'react';

const EventGridComponent = () => {
    
    const [data, setData] = useState([]);
    const [test, setTest] = useState("");
    var base64 = require('base-64');

    async function fetchEvents() {
        const y = {
            guid: 'a',
            venue: {
                username: 'nathanielendick',
                password: 'gamma21',
                location: 'test',
                name: 'Nathaniel',
                hide_location: false,
                description: 'Test Description',
                pfp: null   
            },
            start_date: 'start date',
            ticket_price: 10,
            end_date: 'end date',
            name: 'event',
            description: 'description',
            location: 'test location',
            hide_location: false,
            max_attendees: 5
        };

        var x = await fetch('http://localhost:8080/events', {
            method: 'GET',
        }).then(response => response.json())
        setData(x);
    }

    async function handleImage (event) {
        const file = event.target.files[0];
        const a = await readFileDataAsBase64(file).then(d => {
            console.log(file);
            console.log(d);
            setTest(d);
        });
    }

    function readFileDataAsBase64(file) {
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                resolve(event.target.result);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };
    
            reader.readAsDataURL(file);
        });
    }

    useEffect(() => {
        fetchEvents();
    }, []);

      return (
          <div className={styles.container}>
            <input className={styles.test} type="file" onInput={handleImage}></input>
            <img src={test}></img>
           {
            data.map(eventJSON => (
                <EventComponent event={eventJSON}></EventComponent>
            ))
            }
        </div>
    )
}
export default EventGridComponent