import { Route, Routes } from 'react-router-dom';
import LoginBox from 'Components/LoginBox';
import SignUp from 'Components/SignUp'
import App from 'App';

const Router = () => {
    return (
      <Routes path='/ShowGO' element={<App />}>
          <Route path='/' index element={<LoginBox />}/>
          <Route path='/SignUp' element={<SignUp />}/>
      </Routes>
    );
  }
export default Router; 