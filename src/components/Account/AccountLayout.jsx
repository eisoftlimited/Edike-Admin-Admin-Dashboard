import classes from './AccountLayout.module.scss';

function AccountLayout({children}) {
    return (  
        <div className={classes['account-layout']}>
            {children[0]}
            {children[1]}
        </div>
    );
}

export default AccountLayout;