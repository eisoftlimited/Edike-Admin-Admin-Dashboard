import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EDUKE_URL } from "../../../../store/url";
import FormButton from "../../../Account/FormButton";
import FormControl from "../../../Account/FormControl";
import ToastComponent from "../../../UI/ToastComponent";
import classes from './PersonalDetail.module.scss';

function SecurityForm() {

    const navigate = useNavigate();


    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);

    const updatePassword = async e => {
        e.preventDefault();
        const validity = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);

        if (!validity) return;

        setLoading(true);

        try {
            const response = await axios({
                url: `${EDUKE_URL}/edike/api/v1/auth/admin/forgot-password`,
                method: 'POST',
                data: {
                    email
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setLoading(false);
            setData(response.data && response.data.msg);
            toast.success(response.data && response.data.msg);

        } catch (err) {

            setLoading(false);
            setError(err.response && err.response.data && err.response.data.msg);
            toast.error(err.response && err.response.data && err.response.data.msg);
            setEmail('');
        }
    }


    useEffect(() => {

        let timeout;

        if (data && data.length > 0) {

            setTimeout(() => {
                navigate('/update-password-otp', {
                    state: email
                });
            }, 2000)

        }

        return ()=> {
            clearTimeout(timeout);
        }

    }, [data, navigate]);



    return (
        <>
            <ToastComponent />
            <form onSubmit={updatePassword}>
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