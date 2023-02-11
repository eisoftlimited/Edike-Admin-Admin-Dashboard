// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './DashBoardNav.module.scss';
import userAvatar from './../../img/userAvatar.svg';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth/authSlice';
import { useState } from 'react';

function DashBoardNav({ searchPlaceholder = 'Search', navTitle, onOpenSidebar, onAddSchool, btnText, showSearchNav = true, search, showPlusIcon = true }) {
    const { user,
        // loading
    } = useSelector(state => state.auth);
    // console.log({user});

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const navigateToProfile = ()=> {
        setDropdownShow(false);
        navigate('/dashboard/profile');
    };

    const onLogout = () => {
        dispatch(authActions.clearToken());
        localStorage.removeItem('edike-admin-token');
        setDropdownShow(false);
        navigate('/sign-in');
    };

    const [isDropdownShown, setDropdownShow] = useState(false);


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
                    {/* <Link to='/dashboard/profile' className={classes['user']}> */}
                    <div className={classes['user']}>
                        <div className={classes['avatar']}>
                            {
                                user && user.profileImage ?
                                    <img style={{ borderRadius: '50%' }} src={user.profileImage} alt='User Avatar' /> :
                                    <img src={userAvatar} alt='User Avatar' />
                            }
                        </div>
                        <h4>{user && user.firstname} {user && user.lastname}</h4>
                        <div className={classes.menuDropDown}>
                            <span onClick={()=> setDropdownShow(!isDropdownShown)} className={classes.menuDropDownButton}><i className={`fas fa-caret-down`} /></span>
                            {isDropdownShown && (<div className={classes.menuDropDownDiv}>
                                <button onClick={navigateToProfile}><i className="fa fa-user" /> Profile</button>
                                <button onClick={onLogout}><i class="fa fa-power-off" /> Logout</button>
                            </div>)}
                        </div>
                    </div>
                    {/* </Link> */}
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