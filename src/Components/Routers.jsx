import { Route, Routes } from 'react-router-dom';
import LoginBox from 'Components/LoginBox';
import SignUp from 'Components/SignUp'
import App from 'App';

const Router = () => {
    return (
      <Routes path='/login' element={<App />}>
          <Route path='/login' element={<LoginBox />}/>
          <Route path='/signup' element={<SignUp />}/>
      </Routes>
    );
  }
export default Router; 