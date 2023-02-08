// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './DashBoardNav.module.scss';
import userAvatar from './../../img/userAvatar.svg';
import { Link } from 'react-router-dom';

function DashBoardNav({ searchPlaceholder='Search', navTitle, onOpenSidebar, onAddSchool, btnText, showSearchNav = true, search, showPlusIcon = true }) {
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
                    {/* <span className={classes['bell']}>
                        <i className={`far fa-bell`} />
                    </span> */}
                    <Link to='/dashboard/profile' className={classes['user']}>
                        <div className={classes['avatar']}>
                            {
                                user && user.profileImage ?
                                    <img style={{borderRadius: '50%'}} src={user.profileImage} alt='User Avatar' /> :
                                    <img src={userAvatar} alt='User Avatar' />
                            }
                        </div>
                        <h4>{user && user.firstname} {user && user.lastname}</h4>
                        <span><i className={`fas fa-caret-down`} /></span>
                    </Link>
                </div>
            </div>
            {showSearchNav && <div className={classes['dash-search']}>
                <div className={classes['form']}>
                    <div className={classes['form-container']}>
                        <div className={classes['form-control']}>
                            <span className={classes['form-control__icon']} onClick={search && search.onClick}>
                                <i className={`fas fa-search`} />
                            </span>
                            <input value={search.value} onChange={search && search.onChange} placeholder={searchPlaceholder} className={classes['form-control__input']} />
                        </div>
                        <button type='button' className={classes['form-btn']} onClick={onAddSchool}>{showPlusIcon && <i className={`far fa-plus`} />}{btnText}</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default DashBoardNav;