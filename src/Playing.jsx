import { useState } from "react";
import FormButton from "../../../Account/FormButton";
import FormControl from "../../../Account/FormControl";
import classes from './PersonalDetail.module.scss';

function SecurityForm() {


    const [email, setEmail] = useState('');

    const forgotPasswordHandler = e => {
        e.preventDefault();
        console.log('Forgotting Password.');
    };


    return (
        <form onSubmit={forgotPasswordHandler}>
            <FormControl labelText='Email'
                isValid={true}
                inputId='email'
                inputControls={{
                    type: 'text',
                    placeholder: 'Enter Email here...',
                    name: 'email',
                    value: email,
                    onChange: e => setEmail(e.target.value),
                    // onBlur: textOnBlurHandler,
                    // onFocus: focusHandler
                }}
            />
            <FormButton className={classes.drawer__btn}>Request Password Update</FormButton>
        </form>
    );
}

export default SecurityForm;




















import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions, forgotPassword } from "../../../../store/auth/authSlice";
import FormButton from "../../../Account/FormButton";
import FormControl from "../../../Account/FormControl";
import ToastComponent from "../../../UI/ToastComponent";
import LoadingScreen from "../../../UI/LoadingScreen";
import classes from './PersonalDetail.module.scss';

function SecurityForm() {



    // ===========================================================================================
    // ===========================================================================================
    // ===========================================================================================

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
        if (auth.loggedInMessage && auth.loggedInMessage.length > 0) {
            navigate('/forgot-password-otp');
        }
    }, [auth, navigate]);

    // ===========================================================================================
    // ===========================================================================================
    // ===========================================================================================

    return (
        <>

            {auth.loading && <LoadingScreen />}
            {!auth.loading && auth.error && auth.error.length > 0 && <ToastComponent />}
            <form onSubmit={forgotPasswordHandler}>
                <FormControl labelText='Email'
                    isValid={true}
                    inputId='email'
                    inputControls={{
                        type: 'text',
                        placeholder: 'Enter Email here...',
                        name: 'email',
                        value: email,
                        onChange: e => setEmail(e.target.value),
                        // onBlur: textOnBlurHandler,
                        // onFocus: focusHandler
                    }}
                />
                <FormButton className={classes.drawer__btn}>Request Password Update</FormButton>
            </form>
        </>
    );
}

export default SecurityForm;