import classes from './DashBoardPagination.module.scss';

function DashBoardPagination() {
    return (
        <div className={classes['dashboard-paginations']}>
            <div className={classes['dashboard-pagination__limit']}>
                10 <i className={`fas fa-angle-down`} />
            </div>
            <div className={classes['dashboard-pagination__text']}>
                Showing 1 - 10 of 100
            </div>
            <div className={classes['dashboard-pagination']}>
                <a href='#a' className={`${classes['dashboard-pagination__pill']} ${classes['dashboard-pagination__pill--control']}`}>
                    <i className={`fas fa-angle-double-left`} />
                </a>
                <a href='#a' className={`${classes['dashboard-pagination__pill']} ${classes['dashboard-pagination__pill--control']}`}>
                    <i className={`fas fa-angle-left`} />
                </a>
                {[1, 2, 3, 4].map(el => <a key={el} href='#a' className={`${classes['dashboard-pagination__pill']} ${classes['dashboard-pagination__pill--number']}`}>{el}</a>)}
                <a href='#a' className={`${classes['dashboard-pagination__pill']} ${classes['dashboard-pagination__pill--control']}`}>
                    <i className={`fas fa-angle-right`} />
                </a>
                <a href='#a' className={`${classes['dashboard-pagination__pill']} ${classes['dashboard-pagination__pill--control']}`}>
                    <i className={`fas fa-angle-double-right`} />
                </a>
            </div>
        </div>
    );
}

export default DashBoardPagination;