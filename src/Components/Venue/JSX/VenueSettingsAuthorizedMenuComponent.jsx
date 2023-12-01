import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import Search from 'Assets/Search.svg';
import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from 'App';
import AuthorizedUser from './AuthorizedUser';
import {Link } from 'react-router-dom';

const VenueSettingsAuthorizedMenuComponent = () => {
    const {loggedInState, userTypeState, userState} = useContext(MyContext);
    const [, setUser] = userState;
    const[users, setUsers] = useState([])
    const[ran, setRan] = useState(false);
    const [venue, setVenue] = useState('');
    const username = userState;
    const [userSearch, setUserSearch] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [deletion, setDelete] = useState(false);
    console.log(username[0].username)

    async function deleteUser(user_name){
        setLoading(true)
        console.log(user_name + " user to delete " + username[0].username + " venue to delete")
        var requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'}
        }
        await fetch('http://localhost:8080/blockedUsers/'+ user_name  + '/' + username[0].username , requestOptions)
        setDelete(true);
        getBannedUsers();
           
        setLoading(false);
    }
    
    function blockUser(){
        console.log('Blocking user')

        if(userSearch === ''){
            return;
        }
        var requestOptions = {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'},
                body: JSON.stringify({
                    user_username: userSearch,
                    venue_username: username[0].username
                })
            }
            fetch('http://localhost:8080/blockedUsers/' + userSearch + '/' + username[0].username, requestOptions)
            .then(response => {
                if(response.ok){
                    setError('Successfully Blocked ' + userSearch)
                    getBannedUsers();
                    return response.json(); 
                    
                }
                else{
                    console.error(error);
                    setError('Username not found, or already blocked.')
                    return null;
                }
            })
    }

    async function getBannedUsers(){

        try{
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'},
            }
            var x = await fetch('http://localhost:8080/blockedUsers/venue/' + username[0].username, requestOptions)
            .then(response => response.json())
            
            console.log('View Test Debug After')
            //console.log(x[0].user)
            if(x.length > 0){
                setUsers(x);
            }
        }
        catch (error){
            console.error('Error fetching data:', error);
        }
        finally{
            setLoading(false);
        }
        console.log('Reached banned users')
        
        
        
        
    }

    
    useEffect(() => {
        if(!ran){
            setRan(true);
            getBannedUsers();
        }
        
    }, [ran]);
    

    /*TO DO: Sprint 5 */
    return (
        <div className={styles.subpage}>
            <div className={styles.container}>Blocked Users
            
                {
                    (users.length > 0 && users !== null && loading === false) ? users.map(userJSON => 
                        <Link onClick={() => deleteUser(userJSON.user.username)}>
                            <AuthorizedUser key={userJSON.user.username} username={userJSON.user.username} venue_name={username[0].username}></AuthorizedUser>
                        </Link>
                        
                        
                    ) : <div className={styles.empty_result} />
                        
                }
                
            
               
            </div>
            <div className={styles.container}>
                    <div id={styles.search}>
                        <input id={styles.input} type="text" placeholder='Search User' onChange={(event) => setUserSearch(event.target.value)}/>
                        <img id={styles.img} src={Search} onClick={blockUser} alt=""/>
                    </div>
                    {error?<label>{error}</label>:null}  
            </div>
            
        </div>
    )
}
export default VenueSettingsAuthorizedMenuComponent;