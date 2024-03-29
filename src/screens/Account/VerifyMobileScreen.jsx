import { useEffect } from "react";
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
import { activateUser, resendAdminVerification } from "../../store/auth/authSlice";
import './Account.scss';
import LoadingScreen from '../../components/UI/LoadingScreen';
import ToastComponent from '../../components/UI/ToastComponent';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
// import { useRef } from "react";

function VerifyMobileScreen() {
    const undefArray = [undefined, undefined, undefined, undefined, undefined, undefined];
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    // const inputRef = useRef();

    const [otp, setOtp] = useState(undefArray);

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


    useEffect(() => {
        if (!!auth.token) {
            console.log('Navigating to dashboard.');
            navigate('/dashboard', { replace: true });
        }
    }, [auth.token, navigate]);

    useEffect(() => {
        if (auth.error && auth.error.length > 0) {
            toast.error(auth.error);
        }
    }, [auth]);

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

    const resendOtpHandler = e => {

        const email = localStorage.getItem('edike-admin-email');

        dispatch(resendAdminVerification({
            email: email
        }));
    };

    const activateHandler = async e => {
        e.preventDefault();

        const email = localStorage.getItem('edike-admin-email');

        const data = { otpToken: otp.join(''), email };
        console.log(data);
        dispatch(activateUser(data));
        setOtp(undefArray);
    };

    return (

        <>
            {auth.loading && <LoadingScreen />}
            {!auth.loading && auth.error && auth.error.length > 0 && <ToastComponent />}
            {!!auth.token === false && (<AccountBackground>
                <AccountLayout>
                    <AccountAside />
                    <AccountMain>
                        <FormHeading>
                            Verify Your Email Address
                        </FormHeading>
                        {/* {JSON.stringify(otp)} */}
                        <FormDescription>Enter the One-Time-Pin (OTP) sent to your email address to help verify your account.</FormDescription>
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
                                {countDown <= 0 && <div style={{ color: '#EB5757', marginTop: '1rem' }}><i className={`fas fa-exclamation-circle`} /> Incorrect OTP, Please confirm the OTP and try again.</div>}
                            </FormQuestionSmall>
                            <FormButton disabled={otp.includes(undefined)}>Submit</FormButton>
                            <FormQuestion>Didn’t receive the pin? <button type='button' onClick={resendOtpHandler}>Resend OTP</button> {/*<a href='#a'>Resend OTP</a>*/}</FormQuestion>

                        </form>
                    </AccountMain>
                </AccountLayout>
            </AccountBackground>)}
        </>
    );
}

export default VerifyMobileScreen;