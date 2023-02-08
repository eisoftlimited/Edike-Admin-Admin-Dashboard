import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashBoardNav from '../../DashBoardNav';
import PersonalDetail from './PersonalDetail';
import classes from './UserProfile.module.scss';

function UserProfile() {
    const user = useSelector(state => state.auth.user);



    const [selectedTab, setSelectedTab] = useState('personal');
    return ( 
        <>
            <DashBoardNav navTitle='Profile' showSearchNav={false} />
            <div className={classes['user-profile']}>
                <div className={classes['user-profile__inner']}>
                <Link to='/dashboard' style={{fontSize: '3rem', display: 'inline-block', marginBottom:'1.5rem', color: '#111'}}><i className="fas fa-long-arrow-left"></i></Link>
                    <nav className={classes.user__nav}>
                        <button onClick={()=> setSelectedTab('personal')} className={selectedTab === 'personal' ? classes.active : ''}>Personal Details</button>
                        <button onClick={()=> setSelectedTab('security')} className={selectedTab === 'security' ? classes.active : ''}>Security</button>
                        {/* <button onClick={()=> setSelectedTab('contact')} className={selectedTab === 'contact' ? classes.active : ''}>Contact Us</button> */}
                    </nav>
                    <PersonalDetail selectedTab={selectedTab} userDetail={user || {}} />
                </div>
            </div>
        </>
     );
}

export default UserProfile;