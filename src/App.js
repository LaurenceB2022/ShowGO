import 'index.css';
import NavbarComponent from 'Components/Other/JSX/NavbarComponent';
import {BrowserRouter, Outlet} from 'react-router-dom'
import Routers from 'Components/Other/JSX/Routers';
import React, { useState } from 'react';

export const MyContext = React.createContext();
const MyProvider = props => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); //'user' or 'venue'
  const [user, setUser] = useState(null);
  
  return (
    <MyContext.Provider
    value={
        { loggedInState: [loggedIn, setLoggedIn],
          userTypeState: [userType, setUserType],
          userState: [user, setUser] }}
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
          <NavbarComponent/>
          <Routers/>
        </div>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
