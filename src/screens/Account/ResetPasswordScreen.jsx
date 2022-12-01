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

function CharItem ({isValid, text}) {
    return (
        <li>{text} { isValid && <i className={`fas fa-check`} style={{color: '#68C38C', marginLeft: '.4rem'}} />}</li>
    )
}

function ResetPasswordScreen() {
    return (
        <AccountBackground>
            <AccountLayout>
                <AccountAside />
                <AccountMain>
                    <FormHeading>
                        Reset Your Password
                    </FormHeading>
                    <FormDescription>Please enter the OTP sent to you email <a href='#a' style={{color: '#47B88F', textDecoration: 'none'}}>abisoye@eisoft.com.ng</a> to continue</FormDescription>
                    <form style={{ marginTop: '5rem' }}>
                        <FormControl
                            labelText={'Email Address'}
                            inputId={'password'}
                            inputControls={{
                                placeholder: 'Create password'
                            }}
                            icon={<i className={`fas fa-eye-slash`} />}
                        />
                        <div className={`strenght-bars`}>
                            <span />
                            <span />
                            <span />
                        </div>
                        <ul className={`passwordChars`}>
                            <CharItem text={'Use 8 or more characters'} isValid={true} />
                            <CharItem text={'Use upper and lower case letters (e.g. Aa)'} />
                            <CharItem text={'Use a symbol (e.g. !@#$)'} />
                            <CharItem text={'Use a number (e.g. 1234)'} />
                        </ul>
                        <FormButton>Reset Password</FormButton>
                        <FormQuestion>Remember you login details? <a href='#a'>Sign In</a></FormQuestion>
                    </form>
                </AccountMain>
            </AccountLayout>
        </AccountBackground>
    );
}

export default ResetPasswordScreen;
