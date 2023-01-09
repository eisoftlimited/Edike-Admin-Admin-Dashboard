import classes from './FormHeading.module.scss';

function FormHeading({children, className}) {
    return ( 
        <h4 className={`${classes['form-heading']} ${className ? className : ''}`}>
            {children}
        </h4>
     );
}

export default FormHeading;