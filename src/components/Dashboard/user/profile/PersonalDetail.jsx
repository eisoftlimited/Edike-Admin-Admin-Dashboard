import FormDescription from '../../../Account/FormDescription';
import FormHeading from '../../../Account/FormHeading';
import classes from './PersonalDetail.module.scss';
import passwordcuate from './../../../../img/password-cuate.svg';
import avatar from './../../../../img/avatar.svg';

import SecurityForm from './SecurityForm';
import UserDetailForm from './UserDetailForm'

function PersonalDetail({ userDetail = {}, selectedTab }) {

    return (
        <>
            <div style={{ display: selectedTab === 'personal' ? 'flex' : 'none' }} className={classes['personal-detail']}>
                <div className={classes['personal-detail__img']}>
                    {userDetail && <img src={userDetail.profileImage} alt={userDetail.firstname} style={{ width: '100%', height: '100%' }} />}
                    {!userDetail && <img src={avatar} alt={userDetail.firstname} style={{ width: '100%', height: '100%' }} />}
                </div>
                <div className={classes['personal-detail__form']}>
                    <FormHeading className={classes['personal-detail__heading']}>Personal Details</FormHeading>
                    <FormDescription className={classes['personal-detail__description']}>Update your photo and personal details here.</FormDescription>
                    <UserDetailForm userDetail={userDetail || {}} />
                </div>
            </div>
            <div style={{ display: selectedTab === 'security' ? 'flex' : 'none' }} className={classes['personal-detail']}>
                <div className={classes['personal-detail__form']}>
                    <FormHeading className={classes['personal-detail__heading']}>Security Settings</FormHeading>
                    <FormDescription className={classes['personal-detail__description']}>Please enter your official email address to request a password change</FormDescription>
                    <SecurityForm />
                </div>
                <img src={passwordcuate} alt='' />
            </div>
        </>
    );
}

export default PersonalDetail;