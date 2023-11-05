import 'index.css';
import NavBar from 'Components/Navbar';
import {BrowserRouter, Outlet} from 'react-router-dom'
import Routers from 'Components/Routers';
import React, { useState } from 'react';

export const MyContext = React.createContext();
const MyProvider = props => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); //'user' or 'venue'
  const [username, setUsername] = useState(null);
  
  return (
    <MyContext.Provider
    value={
        { loggedInState: [loggedIn, setLoggedIn],
          userTypeState: [userType, setUserType],
          usernameState: [username, setUsername] }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

function App() {


  return (
    <MyProvider>
      <BrowserRouter basename='/showgo'>
        <div className="App">
          <NavBar/>
          <Routers/>
        </div>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
