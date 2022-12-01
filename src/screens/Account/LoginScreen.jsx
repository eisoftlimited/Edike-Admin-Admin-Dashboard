import { useState } from 'react';
import {Link} from 'react-router-dom'; 
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
        email: '',
        password: ''
    });

    const onLoginDataChangeHandler = (e)=> {
        setLoginData(prevData => {
            return {
                ...prevData,
                [e.target.id] : e.target.value
            }
        });
    };

    const loginHandler = (e)=> {
        e.preventDefault();

        const isEmailValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(loginData.email);
        const isPasswordValid = loginData.password.length > 6;

        if (!isEmailValid || !isPasswordValid) {
            return console.log('Incorrect login info');
        }
            
        console.log('Email not correct');
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
                            inputControls={{
                                type: 'email',
                                placeholder: 'johndoe@email.com',
                                onInput: onLoginDataChangeHandler,
                                value: loginData.email
                            }}
                        />
                        <FormControl
                            labelText={'Password'}
                            inputId={'password'}
                            inputControls={{
                                type: 'password',
                                placeholder: 'Enter password',
                                onInput: onLoginDataChangeHandler,
                                value: loginData.password
                            }}
                            icon={<i className={`fas fa-eye-slash`} />}
                        />
                        <FormQuestionSmall>Forgot Password? <Link to={'/forgot-password'}>Click Here</Link></FormQuestionSmall>
                        <FormButton>Login</FormButton>
                        <FormQuestion>Don’t have an account? <Link to={'/sign-in'}>You shouldn’t be here!</Link></FormQuestion>
                    </form>
                </AccountMain>
            </AccountLayout>
        </AccountBackground>
    );
}

export default LoginScreen;