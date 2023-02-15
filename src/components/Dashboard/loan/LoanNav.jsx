import { useSelector } from 'react-redux';
import { ExportBtn } from '../DashBoardButtons';
import classes from './LoanNav.module.scss';

// git remote add origin https://github.com/devaladey/a.git
// https://github.com/eisoftlimited/Edike-Admin-Admin-Dashboard.git

function LoanNav({
    activeBtn,
    onAll,
    onRunning,
    onDefault,
    onDecline,
    onDisburse,
    onPending,
    onComplete,
    allNum = 0,
    runningNum = 0,
    defaultNum = 0,
    declinedNum = 0,
    disburseNum = 0,
    pendingNum = 0,
    completeNum = 0,
    onExportTable }) {

        
        const userRole = useSelector(state => state.auth.user);

    return (
        <nav className={classes['loan-nav']}>
            {userRole && userRole.role !== 'cfo' && (<button onClick={onPending} className={`${classes['loan-nav__link']} ${activeBtn === 'pending' ? classes.active : ''}`}>
                Pending <span>{pendingNum}</span>
            </button>)}
            <button onClick={onDisburse} className={`${classes['loan-nav__link']} ${activeBtn === 'pending_disbursement' ? classes.active : ''}`}>
                Pending Disburstment <span>{disburseNum}</span>
            </button>
            <button onClick={onRunning} className={`${classes['loan-nav__link']} ${activeBtn === 'ongoing' ? classes.active : ''}`}>
                Running Loans <span>{runningNum}</span>
            </button>
            <button onClick={onDefault} className={`${classes['loan-nav__link']} ${activeBtn === 'defaulted' ? classes.active : ''}`}>
                Defaulted <span>{defaultNum}</span>
            </button>
             <button onClick={onDecline} className={`${classes['loan-nav__link']} ${activeBtn === 'declined' ? classes.active : ''}`}>
                Declined <span>{declinedNum}</span>
            </button>
            <button onClick={onComplete} className={`${classes['loan-nav__link']} ${activeBtn === 'completed' ? classes.active : ''}`}>
                Completed <span>{completeNum}</span> {activeBtn}
            </button>
            <button onClick={onAll} className={`${classes['loan-nav__link']} ${activeBtn === 'all' ? classes.active : ''}`}>
                All <span>{allNum}</span>
            </button>
            <div>
                <ExportBtn onExportTable={onExportTable} />
            </div>
        </nav>
    );
}

export default LoanNav;