import classes from './FormDescription.module.scss';

function FormDescription({children, className}) {
    return ( 
        <p className={`${classes['form-description']} ${className ? className : ''}`}>{children}</p>
     );
}

export default FormDescription;