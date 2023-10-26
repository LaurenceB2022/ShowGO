import { Route, Routes } from 'react-router-dom';
import LoginBox from 'Components/LoginBox';
import SignUp from 'Components/SignUp'
import App from 'App';
import UserHomepage from './UserHomepage';

const Router = () => {
    return (
      <Routes>
          <Route path='/login' element={<LoginBox />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/home' element={<UserHomepage />}/>
      </Routes>
    );
  }
export default Router; 