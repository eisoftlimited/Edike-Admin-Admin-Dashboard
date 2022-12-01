import classes from './FormButton.module.scss';

function FormButton({children, onClick}) {
    return ( 
        <button type='submit' className={classes['form-button']} onClick={onClick}>
            {children}
        </button>
     );
}

export default FormButton;