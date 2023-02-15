import AccountAside from "../../components/Account/AccountAside";
import AccountBackground from "../../components/Account/AccountBackground";
import AccountLayout from "../../components/Account/AccountLayout";
import AccountMain from "../../components/Account/AccountMain";
import FormButton from "../../components/Account/FormButton";
import FormControl from "../../components/Account/FormControl";
import FormHeading from "../../components/Account/FormHeading";
import FormQuestion from "../../components/Account/FormQuestion";
import FormDescription from "../../components/Account/FormDescription";
import './Account.scss';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/UI/LoadingScreen";
import { resetPassword } from "../../store/auth/authSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastComponent from "../../components/UI/ToastComponent";
import { toast } from "react-toastify";
import axios from "axios";
import { EDUKE_URL } from "../../store/url";

function CharItem({ isValid, text }) {
    return (
        <li style={{ color: `${isValid ? '#68C38C' : '#66666699'}` }}>{text} {isValid && <i className={`fas fa-check`} style={{ color: '#68C38C', marginLeft: '.4rem' }} />}</li>
    );
}

function ValidityBar({ isValid }) {

    return (
        <span style={{ opacity: `${isValid ? 1 : .2}` }} />
    );
}

function UpdatePasswordScreen() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isLength, setIsLength] = useState(false);
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isSymbol, setIsSymbol] = useState(false);
    const [isNumeric, setIsNumeric] = useState(false);
    const [isLowerCase, setIsLowerCase] = useState(false);

    const toggleType = e => {
        const sibling = e.target.parentElement && e.target.parentElement.previousElementSibling;

        if (sibling && sibling.type === 'password') {
            sibling.type = 'text';
        } else {
            sibling.type = 'password';
        }
    };

    const checkUpperCase = () => {
        // CHECKING IF IT CONTAINS UPPERCASE
        if (/[A-Z]/.test(password)) {
            setIsUpperCase(true);
        } else {
            setIsUpperCase(false);
        }
    };

    const checkLowerCase = () => {
        // CHECKING IF IT CONTAINS LOWERCASE
        if (/[a-z]/.test(password)) {
            setIsLowerCase(true);
        } else {
            setIsLowerCase(false);
        }
    };

    const checkSymbol = () => {
        // CHECKING IF IT CONTAINS SYMBOLS
        if (/[`!@#$%^&*()_+\-=[]{};':"\\|,.<>\/?~]/.test(password)) {
            setIsSymbol(true);
        } else {
            setIsSymbol(false);
        }
    };

    const checkLength = () => {
        // CHECKING THE LENGTH OF STRING
        if (password.length >= 8) {
            setIsLength(true);
        } else {
            setIsLength(false);
        }
    };

    const checkNumber = () => {
        // CHECKING IF IT CONTAINS NUMBER
        if (/[0-9]/.test(password)) {
            setIsNumeric(true);
        } else {
            setIsNumeric(false);
        }
    };

    const setPasswordHandler = e => {
        checkLength();
        checkLowerCase();
        checkNumber();
        checkSymbol();
        checkUpperCase();
        setPassword(e.target.value);
    };

    const emailChangeHandler = e => {
        setEmail(e.target.value);
    };

    // const isOverallValidity = () => {
    //     return isLength && isLowerCase && isNumeric && isSymbol && isUpperCase && isEmailValid;
    // };

    const onblurHandler = e => {
        if(e.target.id === 'email') {
            const validity = e.target.id === 'email' ? /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(e.target.value) : e.target.value.length > 6;            
            setIsEmailValid(validity);
        } else if(e.target.id === 'password') {
            setIsPasswordValid(isLength && isLowerCase && isNumeric && isSymbol && isUpperCase);
        }
    };

    const [updateLoading,setUpdateLoading] = useState(false);
    const [updateMsg, setUpdateMsg] = useState('');
    const [updateError, setUpdateError] = useState('');

    async function updateNow(data) {
        setUpdateLoading(true);
        try {

            const response = await axios({
                url: `${EDUKE_URL}/edike/api/v1/auth/admin/reset-password`,
                method: 'POST',
                data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setUpdateLoading(false);
            setUpdateMsg(response.data && response.data.msg);
            console.log(response.data);

        } catch(err) {
            setUpdateLoading(false);
            setUpdateError(err.response && err.response.data && err.response.data.msg);
        }
    }


    const resetPasswordHandler = async e => {
        e.preventDefault();

            const data = { password, email };
            
            false && dispatch(resetPassword(data));

            await updateNow(data);
    };

    useEffect(() => {

        if (updateMsg && updateMsg === 'Your new password has been updated.') {
            navigate('/redirecting-to-sign-in');
        }

        if (updateError && updateError.length > 0) {
            toast.error(updateError);
            setEmail('');
            setPassword('');
        }
    }, [updateMsg, updateError, navigate]);



    

    return (
        <>
            {updateLoading && <LoadingScreen />}
            {!updateLoading && updateError && updateError.length > 0 && <ToastComponent />}
            <AccountBackground>
                <AccountLayout>
                    <AccountAside />
                    <AccountMain>
                        <FormHeading>
                            Reset Your Password
                        </FormHeading>
                        <FormDescription>Please enter the OTP sent to you email <a href='#a' style={{ color: '#47B88F', textDecoration: 'none' }}>abisoye@eisoft.com.ng</a> to continue</FormDescription>
                        <form onSubmit={resetPasswordHandler} style={{ marginTop: '5rem' }}>
                            <FormControl
                                isValid={isEmailValid}
                                labelText={'Email Address'}
                                inputId={'email'}
                                inputControls={{
                                    placeholder: 'johndoe@email.com',
                                    value: email,
                                    onChange: emailChangeHandler,
                                    onBlur: onblurHandler,
                                }}
                            />
                            <FormControl
                                isValid={isPasswordValid}
                                onToggleType={toggleType}
                                labelText={'Password'}
                                inputId={'password'}
                                inputControls={{
                                    placeholder: 'Create password',
                                    type: 'password',
                                    value: password,
                                    onChange: setPasswordHandler,
                                    onBlur: onblurHandler,
                                }}
                                icon={<i className={`fas fa-eye-slash`} />}
                            />
                            <div className={`strenght-bars`}>
                                <ValidityBar isValid={isLength} />
                                <ValidityBar isValid={isLowerCase && isUpperCase} />
                                <ValidityBar isValid={isSymbol && isNumeric} />
                            </div>
                            <ul className={`passwordChars`}>
                                <CharItem text={'Use 8 or more characters'} isValid={isLength} />
                                <CharItem text={'Use upper and lower case letters (e.g. Aa)'} isValid={isUpperCase && isLowerCase} />
                                <CharItem text={'Use a symbol (e.g. !@#$)'} isValid={isSymbol} />
                                <CharItem text={'Use a number (e.g. 1234)'} isValid={isNumeric} />
                            </ul>
                            <FormButton
                            // disabled={isOverallValidity}
                            >Reset Password</FormButton>
                            {/* <FormQuestion>Remember you login details? <Link to='/sign-in'>Sign In</Link></FormQuestion> */}
                        </form>
                    </AccountMain>
                </AccountLayout>
            </AccountBackground>
        </>
    );
}

export default UpdatePasswordScreen;
