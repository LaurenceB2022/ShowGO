import 'App.css';
import 'index.css';
import NavBar from 'Components/Navbar';
import {BrowserRouter, Outlet} from 'react-router-dom'
import Routers from 'Components/Routers';

function App() {

  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <>
          <Routers />
        </>
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

export default App;
