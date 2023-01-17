import classes from './FormButton.module.scss';

function FormButton({ type='submit',children, onClick, disabled, className, style }) {

    const btnClass = `${classes['form-button']} ${className ? className : ''}`;

    return (
        <button
            type={type}
            disabled={disabled}
            style={{ ...style, opacity: `${disabled ? '.5' : '1'}` }}
            className={btnClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default FormButton;