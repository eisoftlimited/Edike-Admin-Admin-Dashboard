import FormButton from "../../../Account/FormButton";
import FormControl from "../../../Account/FormControl";
import FormPhone from "../../../Account/FormPhone";
import FormSelect from "../../../Account/FormSelect";
import classes from './PersonalDetail.module.scss';

function UserDetailForm({userDetail}) {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <FormControl labelText='First Name'
                isValid={true}
                inputId='fname'
                inputControls={{
                    type: 'text',
                    placeholder: 'Enter first name here...',
                    name: 'firstname',
                    value: userDetail.firstname,
                    onChange: e => null,
                    // onBlur: textOnBlurHandler,
                    // onFocus: focusHandler
                }}
            />
            <FormControl labelText='Last Name'
                isValid={true}
                inputId='lname'
                inputControls={{
                    type: 'text',
                    placeholder: 'Enter Last name here...',
                    name: 'lastname',
                    value: userDetail.lastname,
                    onChange: e => null,
                    // onBlur: textOnBlurHandler,
                    // onFocus: focusHandler
                }}
            />
            <FormControl labelText='Email'
                isValid={true}
                inputId='email'
                inputControls={{
                    type: 'text',
                    placeholder: 'Enter Email here...',
                    name: 'email',
                    value: userDetail.email,
                    onChange: e => null,
                    // onBlur: textOnBlurHandler,
                    // onFocus: focusHandler
                }}
            />
            <FormPhone labelText='Phone'
                isValid={true}
                inputId='phoneno'
                inputControls={{
                    type: 'number',
                    placeholder: 'Enter phone here...',
                    value: userDetail.phone,
                    // name: 'phone_number',
                    onChange: e => null,
                    // onBlur: textOnBlurHandler,
                    // onFocus: focusHandler
                }}
            />
            <FormSelect labelText='Role'
                options={['Admin', 'Risk Manager', 'CFO']}
                inputControls={{
                    value: userDetail.role,
                    onChange: e => {
                        // setRole(e.target.value)
                        // console.log(e.target.value);
                    },
                    name: 'role'
                }}
            />

            <FormControl labelText='Staff ID'
                isValid={true}
                inputId='staffid'
                inputControls={{
                    type: 'text',
                    placeholder: 'EDI-01',
                    value: userDetail.staffId || 'N/A',
                    onChange: e => null,
                    name: 'staff_number',
                    // onBlur: textOnBlurHandler,
                    // onFocus: focusHandler
                }}
            />
            <FormButton className={classes.drawer__btn}>Update Profile</FormButton>
        </form>
    );
}

export default UserDetailForm;