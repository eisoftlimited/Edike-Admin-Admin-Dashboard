import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountAside from "../../components/Account/AccountAside";
import AccountBackground from "../../components/Account/AccountBackground";
import AccountLayout from "../../components/Account/AccountLayout";
import AccountMain from "../../components/Account/AccountMain";
import FormButton from "../../components/Account/FormButton";
import FormControl from "../../components/Account/FormControl";
import FormHeading from "../../components/Account/FormHeading";
import FormQuestion, { FormQuestionSmall } from "../../components/Account/FormQuestion";
import { signUserIn, authActions } from '../../store/auth/authSlice';
import { useEffect } from 'react';
import LoadingScreen from '../../components/UI/LoadingScreen';
import ToastComponent from '../../components/UI/ToastComponent';
import { toast } from 'react-toastify';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…jQ0fQ.ZV73b0_SADEUoTPJdMcbjYtTc6qj8EyMq7sjE11V_d0

function LoginScreen() { 

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: {
            value: '',
            isValid: true,
        },
        password: {
            value: '',
            isValid: true,
        }
    });
    const [passwordIcon, setPasswordIcon] = useState(true);

    const onLoginDataChangeHandler = (e) => {
        setLoginData(prevData => {
            return {
                ...prevData,
                [e.target.id]: {
                    ...prevData[e.target.id],
                    value: e.target.value
                }
            }
        });
    };

    const onblurHandler = (e) => {
        let validity = e.target.id === 'email' ? /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(e.target.value) : e.target.value.length > 6;

        setLoginData(prevData => {
            return {
                ...prevData,
                [e.target.id]: {
                    ...prevData[e.target.id],
                    isValid: validity
                }
            }
        });
    };

    useEffect(() => {
        if (auth.loggedInMessage && auth.loggedInMessage.length > 0) {
            navigate('/verify-password');
        }
    }, [auth, navigate]);

    useEffect(() => {

        async function errorHandler() {
            if (auth.error && auth.error.length > 0) {
                toast.error(auth.error);

                setLoginData({
                    email: {
                        value: '',
                        isValid: true,
                    },
                    password: {
                        value: '',
                        isValid: true,
                    }
                });
            }
        }

        errorHandler();

    // eslint-disable-next-line
    }, [auth]);

    useEffect(() => {

        return () => {
            dispatch(authActions.clearLoginUpdateState());
        }
    }, [dispatch]);



    const loginHandler = e => {
        e.preventDefault();

        if ((!loginData.email.isValid || loginData.email.value.length === 0) ||
            (!loginData.password.isValid || loginData.password.value.length === 0)) {
            return;
        }

        const data = {
            email: loginData.email.value,
            password: loginData.password.value
        };
        
        localStorage.setItem('edike-admin-email', loginData.email.value);
        dispatch(signUserIn(data));
    };

    const toggleType = e => {
        const sibling = e.target.parentElement && e.target.parentElement.previousElementSibling;

        if (sibling && sibling.type === 'password') {
            sibling.type = 'text';

            setPasswordIcon(false);

        } else {
            sibling.type = 'password';
            setPasswordIcon(true);
        }
    };

    // const btnDisabledHandler = (e) => {
    //     if (!loginData.email.isValid || !loginData.password.isValid) {
    //         return true
    //     }
    //     return false;
    // };



    return (
        <>
            {auth.loading && <LoadingScreen />}
            {!auth.loading && auth.error && auth.error.length > 0 && <ToastComponent />}
            <AccountBackground>
                <AccountLayout>
                    <AccountAside />
                    <AccountMain>
                        <FormHeading>
                            Sign In to your Account
                        </FormHeading>
                        <form onSubmit={loginHandler} style={{ marginTop: '5rem' }}>
                            <FormControl
                                labelText={'Email Address'}
                                inputId={'email'}
                                isValid={loginData.email.isValid}
                                inputControls={{
                                    type: 'email',
                                    placeholder: 'johndoe@email.com',
                                    onChange: onLoginDataChangeHandler,
                                    onBlur: onblurHandler,
                                    value: loginData.email.value,
                                }}
                            />
                            <FormControl
                                onToggleType={toggleType}
                                labelText={'Password'}
                                inputId={'password'}
                                isValid={loginData.password.isValid}
                                inputControls={{
                                    type: 'password',
                                    placeholder: 'Enter password',
                                    onInput: onLoginDataChangeHandler,
                                    onBlur: onblurHandler,
                                    value: loginData.password.value
                                }}
                                icon={passwordIcon ? <i className={`fas fa-eye-slash`} /> : <i className={`fas fa-eye`} />}
                            />
                            <FormQuestionSmall>Forgot Password? <Link to={'/forgot-password'}>Click Here</Link></FormQuestionSmall>
                            <FormButton 
                            // onClick={btnDisabledHandler}
                            >Login</FormButton>
                            <FormQuestion>Don’t have an account? <Link to={'/sign-in'}>You shouldn’t be here!</Link></FormQuestion>
                        </form>
                    </AccountMain>
                </AccountLayout>
            </AccountBackground>
        </>
    );
}

export default LoginScreen;





/*


async function loginRequest() {
        try {
            const res = await axios({
                url: 'https://edikeatadmin.onrender.com/edike/api/v1/auth/admin/login',
                method: 'POST',
                data: {
                    email: loginData.email.value,
                    password: loginData.password.value
                }
            });
            console.log(res);

        } catch(err) {
            console.log('The error is: ', err);
        }
    }

if (e.target.id === 'email') {
            const isEmailValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(loginData.email.value);
            // setLoginData(prevData => {
            //     return {
            //         ...prevData,
            //         email: {
            //             ...prevData.email,
            //             isValid: isEmailValid
            //         }
            //     };
            // });

            
        } else if(e.target.id === 'password') {
            const isPasswordValid = loginData.password.value.length > 6;
            // setLoginData(prevData => {
            //     return {
            //         ...prevData,
            //         password: {
            //             ...prevData.password,
            //             isValid: isPasswordValid
            //         }
            //     };
            // });
        }*/



