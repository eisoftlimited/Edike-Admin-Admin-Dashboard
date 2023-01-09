import classes from './LoanNav.module.scss';

// git remote add origin https://github.com/devaladey/a.git
// https://github.com/eisoftlimited/Edike-Admin-Admin-Dashboard.git

function LoanNav({
    onAll, 
    onRunning, 
    onDefault, 
    onDecline, 
    onComplete, 
    allNum, 
    runningNum, 
    defaultNUm, 
    declinedNum, 
    completeNum}) {
    return ( 
        <nav className={classes['loan-nav']}>
            <button className={`${classes['loan-nav__link']} ${true ? classes.active : ''}`}>
                All <span>283</span>
            </button>
            <button className={classes['loan-nav__link']}>
                Running Loans <span>235</span>
            </button>
            <button className={classes['loan-nav__link']}>
                Defaulted <span>235</span>
            </button>
            <button className={classes['loan-nav__link']}>
                Declined <span>235</span>
            </button>
            <button className={classes['loan-nav__link']}>
                Completed <span>235</span>
            </button>
        </nav>
     );
}

export default LoanNav;