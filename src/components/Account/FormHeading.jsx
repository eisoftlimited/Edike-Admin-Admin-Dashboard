import classes from './FormHeading.module.scss';

function FormHeading({children}) {
    return ( 
        <h4 className={classes['form-heading']}>
            {children}
        </h4>
     );
}

export default FormHeading;