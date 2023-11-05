import { Route, Routes } from 'react-router-dom';
import SignUp from 'Components/SignUp'
import { Outlet } from 'react-router-dom';
import LoginBox from 'Components/LoginBox';
import UserHomepage from 'Components/UserHomepage';
import VenueOverview from 'Components/VenueOverview';
import UserEventView from 'Components/UserEventView';
import TicketCheckout from 'Components/TicketCheckout';
import TicketCheckoutComplete from 'Components/TicketCheckoutComplete';
import UserTickets from 'Components/UserTickets';

const Router = (props) => {
    return (
      <Routes>
        <Route path='/' element={<Outlet/>}>
          <Route index element={<LoginBox/>} />
          <Route path='login' element={<LoginBox/>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='home' element={<UserHomepage/>}/>
          <Route path='tickets' element={<UserTickets/>}/>
          <Route path='home/event/:event_id' exact element={<UserEventView/>}/>
          <Route path='home/event/:event_id/checkout' element={<TicketCheckout/>}/>
          <Route path='home/event/:event_id/checkout/complete' element={<TicketCheckoutComplete/>}/>
          <Route path='venuehome' element={<VenueOverview/>}/>
        </Route>
      </Routes>
    );
  }
export default Router; 