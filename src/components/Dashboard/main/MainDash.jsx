import DashBoardNav from '../DashBoardNav';
import classes from './MainDash.module.scss';
import LoanCards from '../loan/loancards/LoanCards';
import { useOutletContext } from 'react-router-dom';
import MainChart from './MainChart';
import NewCustomers from './NewCustomers';
import TopFiveSchools from './TopFiveSchools';
import RecentLoans from './RecentLoans';

function MainDash() {
    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    return (
        <>
            <DashBoardNav
                navTitle='Dashboard'
                showSearchNav={false}
                onOpenSidebar={openSideBarHandler}
            />
            <div className={classes['main-dashboard']}>
                <LoanCards />
                <div className={classes['main-dashboard__row']}>
                    <MainChart className={classes['main-dashboard__chart']} />
                    <NewCustomers className={classes['main-dashboard__newcustomers']} />
                </div>
                <div className={classes['main-dashboard__row']}>
                    <TopFiveSchools className={classes['main-dashboard__topfive']} />
                    <RecentLoans className={classes['main-dashboard__recentloans']} />
                </div>
            </div>
        </>
    );
}

export default MainDash;