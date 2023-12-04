import 'index.css';
import styles from 'Components/Venue/CSS/VenueSettingsAuthorizedUsers.module.css';
import Search from 'Assets/Search.svg';
import React, {useState, useEffect, useContext} from 'react';
import { MyContext } from 'App';
import AuthorizedUser from './AuthorizedUser';
import {Link } from 'react-router-dom';

/*
    VenueSettingsAuthorizedMenuComponent displays a list of all users banned from attending this venue's events.
    It allows for the venue to search for a new user and add them to the blocked user list. Also allows users
    to remove users from the banned user list. 
*/
const VenueSettingsAuthorizedMenuComponent = () => {
    const userState = useContext(MyContext).userState;
    const[users, setUsers] = useState([])
    const[ran, setRan] = useState(false);
    const username = userState;
    const [userSearch, setUserSearch] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    /*
        deleteUser asynchronously updates the list of banned users. Sends a fetch DELETE request to the blockedUsers API backend.
        Refreshes the list by calling getBannedUsers function.
    */
    async function deleteUser(user_name){
        setLoading(true)
        var requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'}
        }
        await fetch('http://localhost:8080/blockedUsers/'+ user_name  + '/' + username[0].username , requestOptions)
        
        getBannedUsers();
           
        setLoading(false);
    }
    
    /*
        blockUser function takes the value stored in the userSearch constant, and sends a fetch POST request
        to the blockedUser API backend with the username to delete. If successful, indicating the username was found,
        refreshes the banned user list using getBannedUsers function, and displays a success message using the setError
        constant. Otherwise, displays an error message.
    */
    function blockUser(){
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
                    setError('Username not found, or already blocked.')
                    return null;
                }
            })
    }

    /*
        getBannedUsers asynchronously sends a fetch GET request to the blockedUsers/venue API backend, to update
        the currently banned users. If successful, sets the banned users using the setUsers constant. Otherwise,
        does nothing.
    */
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
            if(x.length > 0){
                setUsers(x);
            }
        }
        catch (error){
        }
        finally{
            setLoading(false);
        }
        
    }

    //useEffect hook sets the banned users upon loading the page or adding a new user, by calling the getBannedUsers function.
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
            <div className={styles.container_search}>
                    <div id={styles.search}>
                        <input id={styles.input} type="text" placeholder='Search User' onChange={(event) => setUserSearch(event.target.value)}/>
                        <img id={styles.img} src={Search} onClick={blockUser} alt=""/>
                    </div>
                    {error?<label id={styles.error}>{error}</label>:null}  
            </div>
            
        </div>
    )
}
export default VenueSettingsAuthorizedMenuComponent;