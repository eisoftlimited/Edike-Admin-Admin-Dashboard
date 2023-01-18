import classes from './DashBoardAside.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import EdikeLogo from '../UI/EdikeLogo';
import user from './../../img/user.svg';
import moneystack from './../../img/money-stack.svg';
import logout from './../../img/logout.svg';
import grid from './../../img/Grid.svg';
import childrenOnTeer from './../../img/children-on-teer.svg';
// import vector from './../../img/Vector.svg';
import vector1 from './../../img/vector1.svg';
import debitcard from './../../img/debit-card.svg';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth/authSlice';


function DashMenuItem({ icon, text, link, onLogout, onCloseSidebar }) {

    const currentUrl = window.location.pathname;

    return (
        <li className={classes['dashboard-menu__item']}>
            {!onLogout && <Link to={link} className={`${classes['dashboard-menu__link']} ${currentUrl === link ? classes.active : ''}`} onClick={onCloseSidebar}>
                <span className={classes['dashboard-menu__link-icon']}>
                    <img src={icon} alt='' />
                </span>
                <span className={classes['dashboard-menu__link-text']}>
                    {text}
                </span>
            </Link>}
            {onLogout && <button onClick={onLogout} className={classes['dashboard-menu__link']}>
                <span className={classes['dashboard-menu__link-icon']}>
                    <img src={icon} alt='' />
                </span>
                <span className={classes['dashboard-menu__link-text']}>
                    {text}
                </span>
            </button>}
        </li>
    );
}

function DashBoardAside({ onSidebarClose }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onLogout = () => {
        dispatch(authActions.clearToken());
        localStorage.removeItem('edike-admin-token');
        navigate('/sign-in');
    };


    return (
        <>
            <div className={classes['logo']}>
                <EdikeLogo className={classes['logo__img']} />
                <span onClick={onSidebarClose}><i className={`fas fa-bars`} /></span>
            </div>
            <ul className={classes['dashboard-menu']}>
                <DashMenuItem
                    text={'Dashboard'}
                    icon={grid}
                    link={'/dashboard'}
                    onCloseSidebar={onSidebarClose}
                />
                <DashMenuItem
                    text={'Loan Management'}
                    icon={moneystack}
                    link={'/dashboard/loans'}
                    onCloseSidebar={onSidebarClose}
                />
                <DashMenuItem
                    text={'Fees Payment'}
                    icon={<i className={`fas fa-columns`} />}
                    link={'/dashboard/loans/loan-rate'}
                    onCloseSidebar={onSidebarClose}
                />
                <DashMenuItem
                    text={'Schools'}
                    icon={childrenOnTeer}
                    link={'/dashboard/schools'}
                    onCloseSidebar={onSidebarClose}
                />
                
                {/* <DashMenuItem
                    text={'Debit Cards'}
                    icon={debitcard}
                    onCloseSidebar={onSidebarClose}
                />
                 */}
                <DashMenuItem
                    text={'Customers'}
                    icon={user}
                    link={'/dashboard/customers'}
                    onCloseSidebar={onSidebarClose}
                />
                <DashMenuItem
                    text={'Users'}
                    icon={user}
                    link={'/dashboard/users'}
                    onCloseSidebar={onSidebarClose}
                />
                <DashMenuItem
                    text={'Logout'}
                    icon={logout}
                    onLogout={onLogout}
                />
            </ul>
        </>
    );
}

export default DashBoardAside;