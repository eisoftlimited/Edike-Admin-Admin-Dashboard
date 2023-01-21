import { Routes, Route } from 'react-router-dom';
import './App.scss';
import RedirectingScreen from './screens/Account/RedirectingScreen';
import ResetPasswordScreen from './screens/Account/ResetPasswordScreen';
import LoginScreen from './screens/Account/LoginScreen';
import VerifyMobileScreen from './screens/Account/VerifyMobileScreen';
import ForgotPasswordScreen from './screens/Account/ForgotPasswordScreen';
import Error from './components/Error/Error';
import DashBoardScreen from './screens/DashBoard/DashBoardScreen';
import DashBoardUsers from './components/Dashboard/user/DashBoardUsers';
import DashBoardMain from './components/Dashboard/schools/DashBoardMain';
import DashBoardLoan from './components/Dashboard/loan/DashBoardLoan';
import DashBeneficiaries from './components/Dashboard/DashBeneficiaries';
import LoggedInScreen from './screens/security/LoggedInScreen';
import LoggedOutScreen from './screens/security/LoggedoutScreen';
import ForgotPasswordOPT from './screens/Account/ForgotPasswordOPT';
// import Playing from './Playing';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth/authSlice';
import CustomerDetail from './components/Dashboard/user/CustomerDetail';
import CustomerDash from './components/Dashboard/user/CustomerDash';
import { useEffect } from 'react';
import LoanDetail from './components/Dashboard/loan/LoanDetail';
import EdukeLoader from './components/UI/EdikeLoader';
import MainDash from './components/Dashboard/main/MainDash';
import LoanInterest from './components/Dashboard/loan/LoanInterest';
import UserProfile from './components/Dashboard/user/profile/UserProfile';

function App() {

  // const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    const token = localStorage.getItem('edike-admin-token');

    dispatch(authActions.setToken({ token }));
  }, [dispatch]);

  




  return (
    <>
      <Routes>
        <Route path='/'
          element={
            <LoggedOutScreen>
              <LoginScreen />
            </LoggedOutScreen>
          }
        />
        <Route path={'/dashboard'} element={<DashBoardScreen />}>
          <Route index
            element={
              <LoggedInScreen>
                <MainDash />
              </LoggedInScreen>
            }
          />
          <Route path={'beneficiaries'} element={<DashBeneficiaries />} />
          <Route path={'users'}
            element={
              <LoggedInScreen>
                <DashBoardUsers />
              </LoggedInScreen>
            }
          />
          <Route path={'customers'}
            element={
              <LoggedInScreen>
                <CustomerDash />
              </LoggedInScreen>
            }
          />
          {/* <Route path={'customers/:customerId'}
            element={
              <LoggedInScreen>
                <CustomerDetail />
              </LoggedInScreen>
            }
          /> */}
          <Route path='customers/:customerId'
            element={
              <LoggedInScreen>
                <CustomerDetail />
              </LoggedInScreen>
            } />
          <Route path={'schools'}
            element={
              <LoggedInScreen>
                <DashBoardMain />
              </LoggedInScreen>
            }
          />
          <Route path={'loans'}
            element={
              <LoggedInScreen>
                <DashBoardLoan />
              </LoggedInScreen>
            }
          />
          <Route path={'loans/loan-rate'}
            element={
              <LoggedInScreen>
                <LoanInterest />
              </LoggedInScreen>
            }
          />
          <Route path={'profile'}
            element={
              // <LoggedInScreen>
                <UserProfile />
              // </LoggedInScreen>
            }
          />
          <Route path={'loans/:loanId/:loanmainId'}
            element={
              <LoggedInScreen>
                <LoanDetail />
              </LoggedInScreen>
            }
          />
        </Route>
        <Route path={'/sign-in'} element={
          <LoggedOutScreen>
            <LoginScreen />
          </LoggedOutScreen>
        }
        />
        <Route path={'/verify-password'} element={
          <LoggedOutScreen>
            <VerifyMobileScreen />
          </LoggedOutScreen>
        } />
        <Route path={'/forgot-password'}
          element={
            <LoggedOutScreen>
              <ForgotPasswordScreen />
            </LoggedOutScreen>
          }
        />
        <Route path={'/forgot-password-otp'}
          element={
            <LoggedOutScreen>
              <ForgotPasswordOPT />
            </LoggedOutScreen>
          }
        />
        <Route path={'/reset-password'} element={
          <LoggedOutScreen>
            <ResetPasswordScreen />
          </LoggedOutScreen>
        }
        />
        <Route path={'/redirecting-to-sign-in'} element={
          <LoggedOutScreen>
            <RedirectingScreen />
          </LoggedOutScreen>
        }
        />

        <Route path='/testing' element={<EdukeLoader />} />
        <Route path={'*'} element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
