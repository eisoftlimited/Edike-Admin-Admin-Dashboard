import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountAside from "../../components/Account/AccountAside";
import AccountBackground from "../../components/Account/AccountBackground";
import AccountLayout from "../../components/Account/AccountLayout";
import AccountMain from "../../components/Account/AccountMain";
import FormButton from "../../components/Account/FormButton";
import FormControl from "../../components/Account/FormControl";
import FormHeading from "../../components/Account/FormHeading";
import FormQuestion, { FormQuestionSmall } from "../../components/Account/FormQuestion";

function LoginScreen() {

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


    const loginHandler = (e) => {
        e.preventDefault();
        
        if((!loginData.email.isValid || loginData.email.value.length === 0) || (!loginData.password.isValid || loginData.password.value.length === 0)) {
            return;
        }

        console.log(loginData);
    };

    const btnDisabledHandler = (e)=> {
        if(!loginData.email.isValid || !loginData.password.isValid) {
            return true
        }
        return false;
    };

    

    return (
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
                            icon={<i className={`fas fa-eye-slash`} />}
                        />
                        <FormQuestionSmall>Forgot Password? <Link to={'/forgot-password'}>Click Here</Link></FormQuestionSmall>
                        <FormButton onClick={btnDisabledHandler}>Login</FormButton>
                        <FormQuestion>Don’t have an account? <Link to={'/sign-in'}>You shouldn’t be here!</Link></FormQuestion>
                    </form>
                </AccountMain>
            </AccountLayout>
        </AccountBackground>
    );
}

export default LoginScreen;





/*

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



