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
            <FormButton className={classes.drawer__btn}>Request Password Update {email}</FormButton>
        </form>
    );
}

export default SecurityForm;