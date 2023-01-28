import FormButton from '../../../Account/FormButton';
import FormControl from '../../../Account/FormControl';
import FormDescription from '../../../Account/FormDescription';
import FormHeading from '../../../Account/FormHeading';
import FormPhone from '../../../Account/FormPhone';
import FormSelect from '../../../Account/FormSelect';
import classes from './PersonalDetail.module.scss';
import passwordcuate from './../../../../img/password-cuate.svg';
import avatar from './../../../../img/avatar.svg';

function PersonalDetail({ userDetail={}, selectedTab }) {
    return (
        <>
            <div style={{display: selectedTab === 'personal' ? 'flex' : 'none'}} className={classes['personal-detail']}>
                <div className={classes['personal-detail__img']}>
                    {userDetail && <img src={userDetail.profileImage} alt={userDetail.firstname} style={{width: '100%', height: '100%'}} />}
                    {!userDetail && <img src={avatar} alt={userDetail.firstname} style={{width: '100%', height: '100%'}} />}
                </div>
                <div className={classes['personal-detail__form']}>
                    <FormHeading className={classes['personal-detail__heading']}>Personal Details</FormHeading>
                    <FormDescription className={classes['personal-detail__description']}>Update your photo and personal details here.</FormDescription>

                    <form onSubmit={e => e.preventDefault()}>
                        <FormControl labelText='First Name'
                            isValid={true}
                            inputId='fname'
                            inputControls={{
                                type: 'text',
                                placeholder: 'Enter first name here...',
                                name: 'firstname',
                                value: userDetail.firstname,
                                onChange: e => null,
                                // onBlur: textOnBlurHandler,
                                // onFocus: focusHandler
                            }}
                        />
                        <FormControl labelText='Last Name'
                            isValid={true}
                            inputId='lname'
                            inputControls={{
                                type: 'text',
                                placeholder: 'Enter Last name here...',
                                name: 'lastname',
                                value: userDetail.lastname,
                                onChange: e => null,
                                // onBlur: textOnBlurHandler,
                                // onFocus: focusHandler
                            }}
                        />
                        <FormControl labelText='Email'
                            isValid={true}
                            inputId='email'
                            inputControls={{
                                type: 'text',
                                placeholder: 'Enter Email here...',
                                name: 'email',
                                value: userDetail.email,
                                onChange: e => null,
                                // onBlur: textOnBlurHandler,
                                // onFocus: focusHandler
                            }}
                        />
                        <FormPhone labelText='Phone'
                            isValid={true}
                            inputId='phoneno'
                            inputControls={{
                                type: 'number',
                                placeholder: 'Enter phone here...',
                                value: userDetail.phone,
                                // name: 'phone_number',
                                onChange: e => null,
                                // onBlur: textOnBlurHandler,
                                // onFocus: focusHandler
                            }}
                        />
                        <FormSelect labelText='Role'
                            options={['Admin', 'Risk Manager', 'CFO']}
                            inputControls={{
                                value: userDetail.role,
                                onChange: e => {
                                    // setRole(e.target.value)
                                    // console.log(e.target.value);
                                },
                                name: 'role'
                            }}
                        />

                        <FormControl labelText='Staff ID'
                            isValid={true}
                            inputId='staffid'
                            inputControls={{
                                type: 'text',
                                placeholder: 'EDI-01',
                                value: userDetail.staffId || 'N/A',
                                onChange: e => null,
                                name: 'staff_number',
                                // onBlur: textOnBlurHandler,
                                // onFocus: focusHandler
                            }}
                        />
                        <FormButton className={classes.drawer__btn}>Update Profile</FormButton>
                    </form>
                </div>
            </div>
            <div style={{display: selectedTab === 'security' ? 'flex' : 'none'}} className={classes['personal-detail']}>
                <div className={classes['personal-detail__form']}>
                    <FormHeading className={classes['personal-detail__heading']}>Security Settings</FormHeading>
                    <FormDescription className={classes['personal-detail__description']}>Please enter your official email address to request a password change</FormDescription>

                    <form>
                        <FormControl labelText='Email'
                            isValid={true}
                            inputId='email'
                            inputControls={{
                                type: 'text',
                                placeholder: 'Enter Email here...',
                                name: 'email',
                                // value: firstname.value,
                                // onChange: e => setFirstname(prevVal => {
                                //     return { ...prevVal, value: e.target.value }
                                // }),
                                // onBlur: textOnBlurHandler,
                                // onFocus: focusHandler
                            }}
                        />
                        <FormButton className={classes.drawer__btn}>Request Password Update</FormButton>
                    </form>
                </div>
                <img src={passwordcuate} alt='' />
            </div>
        </>
    );
}

export default PersonalDetail;