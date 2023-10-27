import 'index.css';
import NavBar from 'Components/Navbar';
import {BrowserRouter} from 'react-router-dom'
import Routers from 'Components/Routers';
import { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter basename='/showgo'>
      <div className="App">
        <NavBar loggedIn={[loggedIn, setLoggedIn]}/>
        <Routers loggedIn={[loggedIn, setLoggedIn]}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
