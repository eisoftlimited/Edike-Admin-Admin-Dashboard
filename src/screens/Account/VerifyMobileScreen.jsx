import AccountAside from "../../components/Account/AccountAside";
import AccountBackground from "../../components/Account/AccountBackground";
import AccountLayout from "../../components/Account/AccountLayout";
import AccountMain from "../../components/Account/AccountMain";
import FormButton from "../../components/Account/FormButton";
import FormDescription from "../../components/Account/FormDescription";
import FormHeading from "../../components/Account/FormHeading";
import FormQuestion, { FormQuestionSmall } from "../../components/Account/FormQuestion";
import './Account.scss';

function VerifyMobileScreen() {
    return (
        <AccountBackground>
            <AccountLayout>
                <AccountAside />
                <AccountMain>
                    <FormHeading>
                        Verify Your Mobile
                    </FormHeading>
                    <FormDescription>Enter the One-Time-Pin (OTP) sent to your mobile number 082******* to help protect your account.</FormDescription>
                    <form style={{ marginTop: '5rem' }}>
                        <div className={`otp-list`}>
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                        </div>
                        <FormQuestionSmall>
                            <div style={{ textAlign: 'left' }}>The verification code will be expire in <a href='#a'>01:23</a></div>
                            <div style={{ color: '#EB5757' }}><i className={`fas fa-exclamation-circle`} /> Incorrect OTP, Please confirm the OTP and try again.</div>
                        </FormQuestionSmall>
                        <FormButton>Submit</FormButton>
                        <FormQuestion>Didn’t receive the pin? <a href='#a'>Resend OTP</a></FormQuestion>

                    </form>
                </AccountMain>
            </AccountLayout>
        </AccountBackground>
    );
}

export default VerifyMobileScreen;