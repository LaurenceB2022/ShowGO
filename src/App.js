import 'index.css';
import NavbarComponent from 'Components/Other/JSX/NavbarComponent';
import {BrowserRouter} from 'react-router-dom'
import Routers from 'Components/Other/JSX/Routers';
import React, { useState } from 'react';

/*
  MyContext stores the current session's user, user type, and logged in status as props. 
*/
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

/*
  App is the main application component. Wraps the Routers and NavbarComponent in a BrowserRouter to
  handle navigation between each component. The App component is wrapped in the MyProvider component
  which stores the login session information.
*/
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
