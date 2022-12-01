
import {Routes, Route} from 'react-router-dom';
import './App.scss';
import RedirectingScreen from './screens/Account/RedirectingScreen';
import ResetPasswordScreen from './screens/Account/ResetPasswordScreen';
import LoginScreen from './screens/Account/LoginScreen';
import VerifyMobileScreen from './screens/Account/VerifyMobileScreen';
import ForgotPasswordScreen from './screens/Account/ForgotPasswordScreen';

function App() {
  return (
    <Routes>
      <Route path={'/sign-in'} element={<LoginScreen />} />
      <Route path={'/verify-password'} element={<VerifyMobileScreen />} />
      <Route path={'/reset-password'} element={<ResetPasswordScreen />} />
      <Route path={'/forgot-password'} element={<ForgotPasswordScreen />} />
    </Routes>
  );
}

export default App;
