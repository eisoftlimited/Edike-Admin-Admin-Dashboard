import AccountAside from "../../components/Account/AccountAside";
import AccountBackground from "../../components/Account/AccountBackground";
import AccountLayout from "../../components/Account/AccountLayout";
import AccountMain from "../../components/Account/AccountMain";
// import FormButton from "../../components/Account/FormButton";
// import FormControl from "../../components/Account/FormControl";
import FormHeading from "../../components/Account/FormHeading";
// import FormQuestion from "../../components/Account/FormQuestion";
import FormDescription from "../../components/Account/FormDescription";
import './Account.scss';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectingScreen() {

    const navigate = useNavigate();

    useEffect(()=> {
        const timeout = setTimeout(()=> {
            navigate('/sign-in');
        }, 800);

        return ()=> {
            clearTimeout(timeout);
        }
    }, [navigate]);


    return (
        <AccountBackground>
            <AccountLayout>
                <AccountAside />
                <AccountMain>
                    <FormHeading>
                        Redirecting...
                    </FormHeading>
                    {/* <FormDescription>Password reset successfull, redirecting to <a href='#a' style={{color: '#F9AC3B', textDecoration: 'none'}}>Login</a></FormDescription> */}
                    <FormDescription>Password reset successfull, redirecting to <span style={{color: '#F9AC3B', textDecoration: 'none'}}>Login</span></FormDescription>
                </AccountMain>
            </AccountLayout>
        </AccountBackground>
    );
}

export default RedirectingScreen;
