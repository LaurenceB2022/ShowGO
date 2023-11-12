import 'index.css';
import styles from 'Components/SignUp.module.css';
import Checkmark from 'Assets/Checkmark.svg';
import X from 'Assets/X.svg';
import Placeholder from 'Assets/Placeholder.svg';
import {Link} from 'react-router-dom';
import { useContext, useState } from 'react';
import { MyContext } from 'App';

const SignUp = () => {
    const {loggedInState, userTypeState, usernameState} = useContext(MyContext);
    const [, setLoggedIn] = loggedInState;
    const [, setUserType] = userTypeState;
    const [, setUsername] = usernameState;

    const [selectedType, setSelectedType] = useState(null); //'user' or 'venue'
    const [userNameValid, setUsernameValid] = useState(false);
    const [passwordChecks, setPasswordChecks] = useState([false, false]);
    
    async function checkUsernameValid() {
        var username = document.getElementById(styles.username).value;
        if(username === "" || selectedType == null) return;
        const requestOptions = {
            method: 'GET',
        };
        var [check1, check2] = [true, true];
        await fetch('http://localhost:8080/venues/' + username, requestOptions)
            .then(response => {
                if (response.ok) {
                    check1 = false;
                }
            });
        await fetch('http://localhost:8080/user/' + username, requestOptions)
            .then(response => {
                if (response.ok) {
                    check2 = false;
                }
            });
        setUsernameValid((check1 && check2) ? true : false);
        
    }

    function checkPasswordValid() {
        var password = document.getElementById(styles.password);
        setPasswordChecks([/^[a-zA-Z0-9]+$/.test(password.value), password.value.length >= 6]);
    }

    function signUp() {
        const username = document.getElementById(styles.username).value;
        const name = document.getElementById(styles.name).value
        const password = document.getElementById(styles.password).value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username: username, 
                                name: name,
                                password: password })
        };
        fetch('http://localhost:8080/' + (selectedType === 'venue' ? 'venues' : 'users'), requestOptions) //need to add @CrossOrigin(origins = "http://localhost:3000") to backend controller being accessed
            .then(response => {
                if (response.ok) {
                    setLoggedIn(true);
                    setUserType(selectedType);
                    setUsername(username);
                } 
            });
    }

    return(
        <div>
            <button id={styles.back}>
                <Link to='/login'>Back</Link>
            </button>
            <div id={styles.content}>
                <div className={styles.section_1}>
                    <h1>Get Tickets To All Your Favorites</h1>
                    <h2 className='subtext'>Or Maybe Something New...</h2>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div id={styles.formContainer}>
                        <span>
                            <label className='item_50'>Who Are You?</label>
                            <span className='item_40' id={styles.userOptions}>
                                <button className={selectedType === 'user' ? 'button-enabled' : ''} onClick={() => { setSelectedType('user')}}>User</button>
                                <button className={selectedType === 'venue' ? 'button-enabled': ''} onClick={() => { setSelectedType('venue')}}>Venue</button>
                            </span>
                        </span>
                        <br></br>

                        <span>
                            <label className='item_50'>Display Name</label>
                            <input id={styles.name} className='item_40'></input>
                            <img className='item_10' src={Placeholder} alt=""/>
                        </span>
                        <br></br>

                        <span>
                            <label className='item_50'>Username</label>
                            <input id={styles.username} className={styles.username + ' item_40'} onBlur={() => checkUsernameValid()}></input>
                            <img className='item_10' src={userNameValid ? Checkmark : X} alt=""/>
                        </span>
                        <br></br>

                        {/* TO DO
                        Make the password a password label and a button to show / unshow */}
                        <span>
                            <label className='item_50'>Password</label>
                            <input id={styles.password} className='item_40' onChange={() => checkPasswordValid()}></input>
                            <img className='item_10' src={passwordChecks[0] && passwordChecks[1] ? Checkmark : X} alt=""/>
                        </span>
                        <span className={styles.validation}>
                            <p className={styles.p + ' item_90 ' + (passwordChecks[0] ? 'text-valid' : 'text-invalid')}>Only alphanumeric characters</p>
                            <img className='item_10 img_small' src={passwordChecks[0] ? Checkmark : X} alt=""/>
                        </span>
                        <span className={styles.validation}>
                            <p className={styles.p + ' item_90 ' + (passwordChecks[1] ? 'text-valid' : 'text-invalid')}>At least 6 characters long</p>
                            <img className='item_10 img_small' src={passwordChecks[1] ? Checkmark : X} alt=""/>
                        </span>
                        <br></br>
                        <span style={{justifyContent: 'center'}}>
                            <button className={selectedType && userNameValid && passwordChecks.every(v => v) ? 'button-enabled' : 'button-disabled'}>
                                {selectedType && userNameValid && passwordChecks.every(v => v) ?
                                    (<Link to={selectedType === 'user' ? '/home' : '/venuehome'} className='link-active' onClick={() => { signUp() }}>Sign Up</Link>) :
                                    (<>Sign Up</>)
                                }
                            </button>
                        </span>
                    </div>
                </div>
                <div class={styles.section_2}>
                    <svg id={styles.ticket} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 967 970">
                        <path d="M271.146 702.702C224.412 657.349 159.327 644.731 109.243 666.675L53.0387 612.131C33.001 592.685 22.9819 582.962 18.635 572.145C14.8116 562.629 13.9793 552.559 16.2571 543.377C18.847 532.939 27.3424 524.229 44.3328 506.809L493.325 46.4514C510.316 29.0294 518.811 20.3199 529.2 17.4508C538.34 14.9259 548.451 15.4815 558.093 19.0317C569.053 23.0685 579.072 32.7916 599.11 52.2373L655.307 106.775C634.693 157.318 649.134 221.876 695.868 267.229C742.602 312.582 807.681 325.194 857.763 303.249L913.961 357.786C934 377.233 944.018 386.955 948.365 397.773C952.189 407.29 953.021 417.355 950.742 426.539C948.153 436.977 939.659 445.687 922.667 463.109L473.675 923.466C456.685 940.886 448.189 949.597 437.8 952.466C428.661 954.989 418.549 954.438 408.907 950.886C397.947 946.849 387.929 937.127 367.89 917.68L311.7 863.15C332.315 812.608 317.88 748.055 271.146 702.702Z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}
export default SignUp;