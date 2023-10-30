import 'index.css';
import NavBar from 'Components/Navbar';
import {BrowserRouter} from 'react-router-dom'
import Routers from 'Components/Routers';
import { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUserVenue, setLoggedInUserVenue] = useState(null);

  return (
    <BrowserRouter basename='/showgo'>
      <div className="App">
        <NavBar loggedIn={[loggedIn, setLoggedIn]} loggedInUserVenue={[loggedInUserVenue, setLoggedInUserVenue]}/>
        <Routers loggedIn={[loggedIn, setLoggedIn]} loggedInUserVenue={[loggedInUserVenue, setLoggedInUserVenue]}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
