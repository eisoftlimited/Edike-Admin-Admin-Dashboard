import classes from './FormButton.module.scss';

function FormButton({ children, onClick, disabled }) {
    return (
        <button
            type='submit'
            disabled={disabled}
            style={{ opacity: `${disabled ? '.5' : '1'}` }}
            className={classes['form-button']}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default FormButton;