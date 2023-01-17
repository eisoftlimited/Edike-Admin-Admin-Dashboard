import { Link, useNavigate } from "react-router-dom";
import AccountAside from "../../components/Account/AccountAside";
import AccountBackground from "../../components/Account/AccountBackground";
import AccountLayout from "../../components/Account/AccountLayout";
import AccountMain from "../../components/Account/AccountMain";
import FormButton from "../../components/Account/FormButton";
import FormControl from "../../components/Account/FormControl";
import FormHeading from "../../components/Account/FormHeading";
import FormQuestion from "../../components/Account/FormQuestion";
import FormDescription from "../../components/Account/FormDescription";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, authActions } from "../../store/auth/authSlice";
import { useEffect } from "react";
import LoadingScreen from "../../components/UI/LoadingScreen";
import { toast } from "react-toastify";
import ToastComponent from "../../components/UI/ToastComponent";

function ForgotPasswordScreen() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const emailChangeHandler = e => {
        setEmail(e.target.value);
    };

    const forgotPasswordHandler = e => {
        e.preventDefault();
        const validity = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
        if (validity) {
            localStorage.setItem('edike-admin-email', email);
            dispatch(forgotPassword({ email }));
        }
    };

    useEffect(() => {
        // console.log('In the effect: ', auth.error);
        // if(auth.error.length > 0) {
        toast.error(auth.error);
        setEmail('');
        //  }
    }, [auth, setEmail]);

    useEffect(() => {
        dispatch(authActions.clearLoginUpdateState());
    }, [dispatch]);


    useEffect(() => {
        if (auth.loggedInMessage.length > 0) {
            navigate('/forgot-password-otp');
        }
    }, [auth, navigate]);

    return (
        <>
            {auth.loading && <LoadingScreen />}
            {!auth.loading && auth.error.length > 0 && <ToastComponent />}
            <AccountBackground>
                <AccountLayout>
                    <AccountAside />
                    <AccountMain>
                        <FormHeading>
                            Reset Your Password
                        </FormHeading>
                        <FormDescription>Please enter the email address registered on your account.</FormDescription>
                        <form onSubmit={forgotPasswordHandler} style={{ marginTop: '5rem' }}>
                            <FormControl
                                isValid={true}
                                labelText={'Email Address'}
                                inputId={'email'}
                                inputControls={{
                                    placeholder: 'johndoe@email.com',
                                    value: email,
                                    onChange: emailChangeHandler
                                }}
                            />
                            <FormButton>Reset Password</FormButton>
                            <FormQuestion>Remember you login details? <Link to={'/sign-in'}>Sign In</Link></FormQuestion>
                        </form>
                    </AccountMain>
                </AccountLayout>
            </AccountBackground>
        </>
    );
}

export default ForgotPasswordScreen;