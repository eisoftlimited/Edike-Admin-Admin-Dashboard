import classes from './Button.module.scss';

function Button({className, children, outline, onClick}) {

    const btnClass = `${classes.button} ${ outline ? classes['button--outline'] : ''} ${className ? className : ''}`;
    return ( 
        <button className={btnClass} onClick={onClick}>{children}</button>
     );
}

export default Button;