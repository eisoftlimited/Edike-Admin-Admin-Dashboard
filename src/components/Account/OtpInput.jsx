import classes from './OtpInput.module.scss';

function OtpInput({ value, onChange, id }) {

    return (
        <input id={id}
            onChange={onChange}
            type="text"
            className={classes['otp-input']}
            autoComplete='off'
        />
    );
}

export default OtpInput;