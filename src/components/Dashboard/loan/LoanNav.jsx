import classes from './LoanNav.module.scss';

// git remote add origin https://github.com/devaladey/a.git
// https://github.com/eisoftlimited/Edike-Admin-Admin-Dashboard.git

function LoanNav({
    onAll, 
    onRunning, 
    onDefault, 
    onDecline, 
    onComplete, 
    allNum = 0, 
    runningNum = 0, 
    defaultNum = 0, 
    declinedNum = 0, 
    completeNum = 0}) {
    return ( 
        <nav className={classes['loan-nav']}>
            <button onClick={onAll} className={`${classes['loan-nav__link']} ${true ? classes.active : ''}`}>
                All <span>{allNum}</span>
            </button>
            <button onClick={onRunning} className={classes['loan-nav__link']}>
                Running Loans <span>{runningNum}</span>
            </button>
            <button onClick={onDefault} className={classes['loan-nav__link']}>
                Defaulted <span>{defaultNum}</span>
            </button>
            <button onClick={onDecline} className={classes['loan-nav__link']}>
                Declined <span>{declinedNum}</span>
            </button>
            <button className={classes['loan-nav__link']}>
                Completed <span>{completeNum}</span>
            </button>
        </nav>
     );
}

export default LoanNav;