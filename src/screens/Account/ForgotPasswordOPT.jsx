import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountAside from "../../components/Account/AccountAside";
import AccountBackground from "../../components/Account/AccountBackground";
import AccountLayout from "../../components/Account/AccountLayout";
import AccountMain from "../../components/Account/AccountMain";
import FormButton from "../../components/Account/FormButton";
import FormDescription from "../../components/Account/FormDescription";
import FormHeading from "../../components/Account/FormHeading";
import FormQuestion, { FormQuestionSmall } from "../../components/Account/FormQuestion";
import OtpInput from "../../components/Account/OtpInput";
import { authActions, forgotPasswordOTPP, resendAdminForgotPassword } from "../../store/auth/authSlice";
import './Account.scss';
import LoadingScreen from '../../components/UI/LoadingScreen';
import ToastComponent from '../../components/UI/ToastComponent';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

function ForgotPasswordOPT() {
    const undefArray = [undefined, undefined, undefined, undefined, undefined, undefined];
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [otp, setOtp] = useState(undefArray);


    const email = localStorage.getItem('edike-admin-email');

    // const email = 'email';

    // =========================

    const [countDown, setCountDown] = useState(2 * 60);
    const timerId = useRef();

    // console.log(countDown, ' in the verify password.');

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountDown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
        if (countDown <= 0) {
            clearInterval(timerId.current);
        }
    }, [countDown]);

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        return `${minutes}:${seconds}`
    };

    // ========================

    // console.log({otp});





    useEffect(() => {
        if (auth.loggedInMessage === 'Verification Successful') { //Verification Successful
            navigate('/reset-password', { replace: true })
        }
    }, [auth.loggedInMessage, navigate]);

    useEffect(() => {
        if (auth.error.length > 0) {
            toast.error(auth.error);
        }
    }, [auth]);

    useEffect(() => {
        dispatch(authActions.clearLoginUpdateState());
    }, [dispatch]);

    const setOtpHandler = e => {

        if (e.target.value.length >= 1) {
            e.target.value = e.target.value.charAt(1) || e.target.value.charAt(0);
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.focus();
            }
        }

        setOtp(prevData => {
            const data = [...prevData];
            data[+e.target.id] = +e.target.value;
            return data;
        });
    };

    const resendForgotPasswordCodeHandler = () => {
        const email = localStorage.getItem('edike-admin-email');
        setCountDown(2 * 60);

        // timerId.current = setInterval(() => {
        //     setCountDown(prev => prev - 1);
        // }, 1000);

        console.log('Resend');
        // console.log({otp});
        dispatch(resendAdminForgotPassword({ email }));
    };

    // useEffect(() => {
    //     setCountDown(2 * 60);
    //     timerId.current = setInterval(() => {
    //         setCountDown(prev => prev - 1);
    //     }, 1000);

    //     return () => clearInterval(timerId.current);
    // }, [resendForgotPasswordCodeHandler]);

    const activateHandler = async e => {
        e.preventDefault();

        /*
        const email = localStorage.getItem('edike-admin-email');
        //console.log({email});
        dispatch(forgotPasswordOTPP({email, otpToken: otp.join('')}));
        */

        const email = localStorage.getItem('edike-admin-email');
        const data = { otpToken: otp.join(''), email };
        // console.log(data);
        dispatch(forgotPasswordOTPP(data));
        setOtp(undefArray);
    };

    return (

        <>
            {auth.loading && <LoadingScreen />}
            {!auth.loading && auth.error.length > 0 && <ToastComponent />}
            {!!auth.token === false && (<AccountBackground>
                <AccountLayout>
                    <AccountAside />
                    <AccountMain>
                        <FormHeading>
                            Reset Password
                        </FormHeading>
                        {/* {JSON.stringify(otp)} */}
                        <FormDescription>Please enter the OTP sent to you email <a href='#a' style={{ textDecoration: 'none', color: '#47B88F' }}>{email}</a> to continue</FormDescription>
                        <form onSubmit={activateHandler} style={{ marginTop: '5rem' }}>
                            <div className={`otp-list`}>
                                <OtpInput value={otp[0]} id={'0'} onChange={setOtpHandler} />
                                <OtpInput value={otp[1]} id={'1'} onChange={setOtpHandler} />
                                <OtpInput value={otp[2]} id={'2'} onChange={setOtpHandler} />
                                <OtpInput value={otp[3]} id={'3'} onChange={setOtpHandler} />
                                <OtpInput value={otp[4]} id={'4'} onChange={setOtpHandler} />
                                <OtpInput value={otp[5]} id={'5'} onChange={setOtpHandler} />
                            </div>
                            <FormQuestionSmall>
                                <div style={{ textAlign: 'left' }}>The verification code will be expire in <a href='#a'>{formatTime(countDown)}</a></div>
                                {/* {countDown <= 0 && <div style={{ color: '#EB5757', marginTop: '1rem' }}><i className={`fas fa-exclamation-circle`} /> Incorrect OTP, Please confirm the OTP and try again.</div>} */}
                            </FormQuestionSmall>
                            <div style={{ display: 'flex' }}>
                                <FormButton style={{ color: '#47B88F', backgroundColor: '#fafafa' }} type='button' onClick={resendForgotPasswordCodeHandler}>Resend Code</FormButton>
                                <FormButton disabled={otp.includes(undefined)}>Submit</FormButton>
                            </div>
                            <FormQuestion>Remember you login details? <Link to='/sign-in'>Sign In</Link></FormQuestion>
                        </form>
                    </AccountMain>
                </AccountLayout>
            </AccountBackground>)}
        </>
    );
}

export default ForgotPasswordOPT;