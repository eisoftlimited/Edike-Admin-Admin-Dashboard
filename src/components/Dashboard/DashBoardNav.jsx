// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './DashBoardNav.module.scss';
import userAvatar from './../../img/userAvatar.svg';

function DashBoardNav({ navTitle, onOpenSidebar, onAddSchool, btnText, showSearchNav = true, search }) {
    const { user,
        // loading
    } = useSelector(state => state.auth);
    // console.log({user});



    return (
        <div className={classes['dashboard-nav']}>
            <div className={classes['dashboard-nav__top']}>
                <div className={classes['dashboard-nav__top-cont']}>
                    <div className={classes['dashboard-nav__top-toggler']} onClick={onOpenSidebar}><i className={`fas fa-bars`} /></div>
                    <h3>{navTitle}</h3>
                </div>
                <div className={classes['dashboard-nav__profile']}>
                    <span className={classes['bell']}>
                        <i className={`far fa-bell`} />
                    </span>
                    <div className={classes['user']}>
                        <div className={classes['avatar']}>
                            {
                                true ?
                                    <img src={userAvatar} alt='User Avatar' /> :
                                    <img src={userAvatar} alt='User Avatar' />
                            }
                        </div>
                        <h4>{user && user.firstname} {user && user.lastname}</h4>
                        <span><i className={`fas fa-caret-down`} /></span>
                    </div>
                </div>
            </div>
            {showSearchNav && <div className={classes['dash-search']}>
                <div className={classes['form']}>
                    <div className={classes['form-container']}>
                        <div className={classes['form-control']}>
                            <span className={classes['form-control__icon']} onClick={search && search.onClick}>
                                <i className={`fas fa-search`} />
                            </span>
                            <input value={search && search.value} onChange={search && search.onChange} placeholder='Search' className={classes['form-control__input']} />
                        </div>
                        <button type='button' className={classes['form-btn']} onClick={onAddSchool}><i className={`far fa-plus`} />{btnText}</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default DashBoardNav;