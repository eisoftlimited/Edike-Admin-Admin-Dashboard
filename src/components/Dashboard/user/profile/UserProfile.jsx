import DashBoardNav from '../../DashBoardNav';
import PersonalDetail from './PersonalDetail';
import classes from './UserProfile.module.scss';

function UserProfile() {
    return ( 
        <>
            <DashBoardNav navTitle='Profile' showSearchNav={false} />
            <div className={classes['user-profile']}>
                <div className={classes['user-profile__inner']}>
                    <nav className={classes.user__nav}>
                        <button className={classes.active}>Personal Details</button>
                        <button>Security</button>
                        <button>Contact Us</button>
                    </nav>
                    <PersonalDetail />
                </div>
            </div>
        </>
     );
}

export default UserProfile;