import DashBoardAside from './DashBoardAside';
import classes from './DashBoardLayout.module.scss';
import DashBoardMain from './DashBoardMain';
import DashBoardNav from './DashBoardNav';

function DashBoardLayout() {
    return ( 
        <div className={classes['dashboard-layout']}>
            <div className={classes['dashboard-layout__aside']}>
                <DashBoardAside />
            </div>
            <div className={classes['dashboard-layout__nav']}>
                <DashBoardNav />
            </div>
            <div className={classes['dashboard-layout__main']}>
                <DashBoardMain />
            </div>
        </div>
     );
}

export default DashBoardLayout;