import classes from './AccountMain.module.scss';

function AccountMain({ children }) {
    return (
        <div className={classes['account-main']}>
            <div className={classes['account-main__inner']}>
                {children}
            </div>
        </div>
    );
}

export default AccountMain;