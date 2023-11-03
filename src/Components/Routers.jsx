import { Route, Routes } from 'react-router-dom';
import SignUp from 'Components/SignUp'
import { Outlet } from 'react-router-dom';
import LoginBox from 'Components/LoginBox';
import UserHomepage from 'Components/UserHomepage';
import VenueOverview from 'Components/VenueOverview';
import UserEventView from 'Components/UserEventView';

const Router = (props) => {
    return (
      <Routes>
        <Route path='/' element={<Outlet/>}>
          <Route path='login' element={<LoginBox loggedIn={props.loggedIn} loggedInUserVenue={props.loggedInUserVenue}/>}/>
          <Route path='signup' element={<SignUp loggedIn={props.loggedIn} loggedInUserVenue={props.loggedInUserVenue}/>}/>
          <Route path='home' element={<UserHomepage loggedIn={props.loggedIn} loggedInUserVenue={props.loggedInUserVenue}/>}/>
          <Route path='home/event/*' element={<UserEventView loggedIn={props.loggedIn} loggedInUserVenue={props.loggedInUserVenue}/>}/>
          <Route path='venuehome' element={<VenueOverview loggedIn={props.loggedIn} loggedInUserVenue={props.loggedInUserVenue}/>}/>
        </Route>
      </Routes>
    );
  }
export default Router; 