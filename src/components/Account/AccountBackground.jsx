import classes from './AccountBackground.module.scss';

function AccountBackground({children}) {
    return ( 
        <div className={classes['account-background']}>{children}</div>
     );
}

export default AccountBackground;