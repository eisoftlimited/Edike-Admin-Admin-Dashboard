import classes from './DashBoardNav.module.scss';

function DashBoardNav() {
    return (
        <div className={classes['dashboard-nav']}>
            <div className={classes['dashboard-nav__top']}>
                <h3>Schools</h3>
                <div className={classes['dashboard-nav__profile']}>
                    <span className={classes['bell']}>
                        <i className={`far fa-bell`} />
                    </span>
                    <div className={classes['user']}>
                        <div className={classes['avatar']} />
                        <h4>Abiola Ogunjobi</h4>
                        <span><i className={`fas fa-caret-down`} /></span>
                    </div>
                </div>
            </div>
            <div className={classes['dash-search']}>
                <form className={classes['form']}>
                    <div className={classes['form-container']}>
                        <div className={classes['form-control']}>
                            <span className={classes['form-control__icon']}>
                                <i className={`fas fa-search`} />
                            </span>
                            <input placeholder='Search' className={classes['form-control__input']} />
                        </div>
                        <button className={classes['form-btn']}><i className={`far fa-plus`} /> Add School</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DashBoardNav;