import EdikeLogo from '../UI/EdikeLogo';
import classes from './AccountAside.module.scss';

function AccountAside() {
    return ( 
        <div className={classes['account-aside']}>
            <EdikeLogo className={classes['account-aside__img']} />
            {/* <h4>EDIKE</h4> */}
            <span className={classes['account-aside__welcome-text']}>Welcome back!</span>
            <p>Enter and authenticate your personal details to log back into your account on the Edike Admin Portal</p>
        </div>
     );
}

export default AccountAside;