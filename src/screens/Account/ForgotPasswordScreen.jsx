import { Link } from "react-router-dom";
import AccountAside from "../../components/Account/AccountAside";
import AccountBackground from "../../components/Account/AccountBackground";
import AccountLayout from "../../components/Account/AccountLayout";
import AccountMain from "../../components/Account/AccountMain";
import FormButton from "../../components/Account/FormButton";
import FormControl from "../../components/Account/FormControl";
import FormHeading from "../../components/Account/FormHeading";
import FormQuestion from "../../components/Account/FormQuestion";
import FormDescription from "../../components/Account/FormDescription";

function ForgotPasswordScreen() {
    return (
        <AccountBackground>
            <AccountLayout>
                <AccountAside />
                <AccountMain>
                    <FormHeading>
                        Reset Your Password
                    </FormHeading>
                    <FormDescription>Please enter the email address registered on your account.</FormDescription>
                    <form style={{ marginTop: '5rem' }}>
                        <FormControl
                            labelText={'Email Address'}
                            inputId={'email'}
                            inputControls={{
                                placeholder: 'johndoe@email.com'
                            }}
                        />
                        <FormButton>Reset Password</FormButton>
                        <FormQuestion>Remember you login details? <Link to={'/sign-in'}>Sign In</Link></FormQuestion>
                    </form>
                </AccountMain>
            </AccountLayout>
        </AccountBackground>
    );
}

export default ForgotPasswordScreen;