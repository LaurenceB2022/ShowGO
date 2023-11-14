import { Route, Routes } from 'react-router-dom';
import SignUp from 'Components/Other/JSX/SignUp'
import { Outlet } from 'react-router-dom';
import Login from 'Components/Other/JSX/Login';
import UserHomepage from 'Components/User/JSX/UserHomepage';
import VenueHomepage from 'Components/Venue/JSX/VenueHomepage';
import UserViewEvent from 'Components/User/JSX/UserViewEvent';
import UserCheckout from 'Components/User/JSX/UserCheckout';
import UserCheckoutComplete from 'Components/User/JSX/UserCheckoutComplete';
import UserViewTickets from 'Components/User/JSX/UserViewTickets';
import VenueCreateEvent from 'Components/Venue/JSX/VenueCreateEvent';
import VenueSettings from 'Components/Venue/JSX/VenueSettings';
import VenueSettingsGeneralMenuComponent from 'Components/Venue/JSX/VenueSettingsGeneralMenuComponent'
import VenueSettingsSecurityMenuComponent from 'Components/Venue/JSX/VenueSettingsSecurityMenuComponent'
import VenueSettingsBillingMenuComponent from 'Components/Venue/JSX/VenueSettingsBillingMenuComponent';
import VenueSettingsAuthorizedMenuComponent from 'Components/Venue/JSX/VenueSettingsAuthorizedMenuComponent';
import VenueSettingsPaymentMenuComponent from 'Components/Venue/JSX/VenueSettingsPaymentMenuComponent';

const Router = (props) => {
    return (
      <Routes>
        <Route path='/' element={<Outlet/>}>
          <Route index element={<Login/>} />
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='home' element={<UserHomepage/>}/>
          <Route path='tickets' element={<UserViewTickets/>}/>
          <Route path='home/event/:id' exact element={<UserViewEvent/>}/>
          <Route path='home/event/:id/checkout' element={<UserCheckout/>}/>
          <Route path='home/event/:id/checkout/complete' element={<UserCheckoutComplete/>}/>
          <Route path='venuehome' element={<VenueHomepage/>}/>
          <Route path='createevent' element={<VenueCreateEvent/>}/>
          <Route path='venuesettings/' element={<VenueSettings/>}>
              <Route path='general' element={<VenueSettingsGeneralMenuComponent/>}/>
              <Route path='security' element={<VenueSettingsSecurityMenuComponent/>}/>
              <Route path='billing' element={<VenueSettingsBillingMenuComponent/>}/>
              <Route path='authorized' element={<VenueSettingsAuthorizedMenuComponent/>}/>
              <Route path='payment' element={<VenueSettingsPaymentMenuComponent/>}/>
          </Route>
          
        </Route>
      </Routes>
    );
  }
export default Router; 