import classes from './FormDescription.module.scss';

function FormDescription({children}) {
    return ( 
        <p className={classes['form-description']}>{children}</p>
     );
}

export default FormDescription;