import classes from './AddUserDrawer.module.scss';
import FormHeading from '../../Account/FormHeading';
import FormDescription from '../../Account/FormDescription';
import FormControl from '../../Account/FormControl';
import FileUpload from '../../Account/FileUpload';
import FormPhone from '../../Account/FormPhone';
import FormButton from '../../Account/FormButton';
import { useEffect, useState, useRef } from 'react';
import FormSelect from '../../Account/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import ToastComponent from '../../UI/ToastComponent';
import { toast } from 'react-toastify';
import { addUser, addUserActions } from '../../../store/customer/addUserSlice';
import { RotatingLines } from 'react-loader-spinner';
import userImg from './../../../img/user-image-logo.svg';
import { useNavigate } from 'react-router-dom';

function AddUserDrawer({ onCloseDrawer, isDrawerVisible, crudOperation, selectedId }) {

    const navigate = useNavigate();

    // USESELECTOR STATE
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const createdUser = useSelector(state => state.createUser);

    // console.log({ createdUser });

    const [isFound, setIsFound] = useState(false);

    const [firstname, setFirstname] = useState({
        value: '',
        isValid: true
    });
    const [lastname, setLastname] = useState({
        value: '',
        isValid: true
    });
    const [email, setEmail] = useState({
        value: '',
        isValid: true
    });
    const [phoneno, setPhoneno] = useState({
        value: '',
        isValid: true
    });
    const [img, setImg] = useState(null);
    const [staffNo, setStaffNo] = useState({
        value: '',
        isValid: true
    });
    const [role, setRole] = useState('Admin');



    // console.log({firstname, lastname, email});

    // TOGGLE FILE STATE
    const [toggleFile, setToggleFile] = useState(false);

    // FILE FUNCTIONS HANDLER
    function showPreview(event) {
        if (event.target.files.length > 0) {
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById("file-user");
            preview.src = src;
            setToggleFile(true);
        }
    }

    const fileUploadHandler = e => {
        // console.log(e.target.files[0]);
        setImg(e.target.files[0]);
        showPreview(e);
    };

    const textOnBlurHandler = e => {

        const eventTarget = e.currentTarget.id;

        const condition = eventTarget === 'fname' || eventTarget === 'lname' || eventTarget === 'staffid';

        if (condition) {
            if (e.currentTarget.value.trim().length === 0) {
                e.currentTarget.style.borderColor = 'rgb(250, 166, 26)';
            } else {
                e.currentTarget.style.borderColor = 'rgb(178, 178, 178)';
            }
        }

        if (eventTarget === 'email') {
            const isValid = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(e.target.value);
            if (isValid) {
                e.currentTarget.style.borderColor = 'rgb(178, 178, 178)';
            } else {
                e.currentTarget.style.borderColor = 'rgb(250, 166, 26)';
            }
        }

        if (eventTarget === 'phoneno') {
            // console.log(e.target.value);
            if (e.currentTarget.value.trim().length < 0) {
                e.currentTarget.style.borderColor = 'rgb(250, 166, 26)';
            } else {
                e.currentTarget.style.borderColor = 'rgb(178, 178, 178)';
            }
        }
    };

    const userCrudHandler = e => {
        e.preventDefault();

        let userRole = role;

        if(userRole === 'Risk Manager') {
            userRole = 'risk_management';
        } 

        if(userRole === 'Admin') {
            userRole = 'admin';
        }

        if(userRole === 'CFO') {
            userRole = 'cfo';
        }

        const formData = new FormData();
        formData.append('firstname', firstname.value);
        formData.append('lastname', lastname.value);
        formData.append('email', email.value);
        formData.append('phone_number', phoneno.value);
        formData.append('img', img);
        formData.append('staff_number', staffNo.value);
        formData.append('role', userRole);

        // for(let data of formData) {
        //     console.log(`${data[0]}--${data[1]}`);
        // }

        setToggleFile(false);

        if (crudOperation === 'add-user') {
            // Add USER
            formData.delete('username');
            dispatch(addUser({ token, data: formData }));
        } else if (crudOperation === 'edit') {
            // EDIT USER
        }

    };

    function resetAllState() {

        const init = {
            value: '',
            isValid: true
        };

        setFirstname(init);
        setLastname(init);
        setEmail(init);
        setPhoneno(init);
        setImg(null);
        setStaffNo(init);
    }

    function focusHandler(e) {
        e.currentTarget.style.borderColor = 'rgb(250, 166, 26)';
    }



    // MY USEEFFECT CODE

    useEffect(() => {
<<<<<<< HEAD

        // let interval;

=======
>>>>>>> e9e810dfdad00d7de681eca1584002b8c0d625ed
        if (createdUser.data && createdUser.data === 'User Successfully Added') {
            setIsFound(true);
        }
    }, [createdUser]);

    useEffect(() => {

        let interval;
        const { error } = createdUser;
        if (error && error.length > 0) {
            toast.error(error);
            interval = setTimeout(() => {
                dispatch(addUserActions.resetState());
            }, 5000);
        }

        return () => {
            clearTimeout(interval);
        }
    }, [createdUser, dispatch]);

    useEffect(() => {
        if (crudOperation === 'edit') {
            // dispatch(getSchool({ token, id: selectedId }));
        }

        if (crudOperation === 'add-school') {
            // setSchoolName('');
            // setSchoolLocation('');
            // setPhoneno('');
            // setEmail('');
            // setConFirstName('');
            // setSchoolProfile(null);
            // setConLastName('');
            // setConBank('');
            // setConPhone('');
            // setConAccNo('');
        }
    }, [crudOperation, selectedId, dispatch, token]);

    // useEffect(() => {

    //     if (editSchool.singleSchool) {
    //         const {singleSchool} = editSchool;
    //         setSchoolName(singleSchool.school_name);
    //         setSchoolLocation(singleSchool.school_location);
    //         setPhoneno(singleSchool.phoneno);
    //         setEmail(singleSchool.email);
    //         setConFirstName(singleSchool.contact_firstname);
    //         setSchoolProfile(null);
    //         setConLastName(singleSchool.contact_lastname);
    //         setConBank(singleSchool.contact_bank);
    //         setConPhone(singleSchool.contact_phone);
    //         setConAccNo(singleSchool.contact_acct_number);
    //     }

    // }, [editSchool]);

    // LOADING STATE OF DRAWER
    const drawerRef = useRef();
    useEffect(() => {
        if (createdUser.loading) {
            drawerRef.current.scrollTop = 0;
            drawerRef.current.style.overflowY = 'hidden';
        } else {
            drawerRef.current.style.overflowY = 'auto';
        }
    }, [createdUser.loading]);


    return (
        <>
            {!createdUser.loading && createdUser.error && createdUser.error.length > 0 && <ToastComponent />}
            <div ref={drawerRef} className={`${classes.drawer} ${isDrawerVisible ? classes['drawer--show'] : ''}`}>

                {createdUser.loading &&
                    <div className={classes.drawer__loader}>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="96"
                            visible={true}
                        />
                    </div>
                }

                {!isFound && (<form autoComplete='off' onSubmit={userCrudHandler}>
                    <FormHeading className={classes.drawer__heading}>Add User</FormHeading>
                    <FormDescription className={classes.drawer__description}>Please fill the form below to add a user to the Edike platform</FormDescription>
                    <div style={{ height: '3rem' }} />
                    <div className={classes.drawer__formgroup}>
                        <FormControl labelText='First Name'
                            isValid={firstname.isValid}
                            inputId='fname'
                            inputControls={{
                                type: 'text',
<<<<<<< HEAD
                                placeholder: 'Enter first name here...',
=======
                                placeholder: 'Enter text here...',
>>>>>>> e9e810dfdad00d7de681eca1584002b8c0d625ed
                                name: 'firstname',
                                value: firstname.value,
                                onChange: e => setFirstname(prevVal => {
                                    return { ...prevVal, value: e.target.value }
                                }),
                                onBlur: textOnBlurHandler,
                                onFocus: focusHandler
                            }}
                        />
                        <FormControl labelText='Last Name'
                            isValid={lastname.isValid}
                            inputId='lname'
                            inputControls={{
                                type: 'text',
<<<<<<< HEAD
                                placeholder: 'Enter last name here...',
=======
                                placeholder: 'Enter text here...',
>>>>>>> e9e810dfdad00d7de681eca1584002b8c0d625ed
                                name: 'lastname',
                                value: lastname.value,
                                onChange: e => setLastname(prevVal => {
                                    return { ...prevVal, value: e.target.value }
                                }),
                                onBlur: textOnBlurHandler,
                                onFocus: focusHandler
                            }}
                        />
                    </div>
                    <FormControl labelText='Email'
                        isValid={email.isValid}
                        inputId='email'
                        inputControls={{
                            type: 'text',
<<<<<<< HEAD
                            placeholder: 'Enter email here...',
=======
                            placeholder: 'Enter text here...',
>>>>>>> e9e810dfdad00d7de681eca1584002b8c0d625ed
                            name: 'email',
                            value: email.value,
                            onChange: e => setEmail(prevVal => {
                                return { ...prevVal, value: e.target.value }
                            }),
                            onBlur: textOnBlurHandler,
                            onFocus: focusHandler
                        }}
                    />
                    <FormPhone labelText='Phone'
                        isValid={phoneno.isValid}
                        inputId='phoneno'
                        inputControls={{
                            type: 'number',
<<<<<<< HEAD
                            placeholder: 'Enter phone here...',
=======
                            placeholder: 'Enter text here...',
>>>>>>> e9e810dfdad00d7de681eca1584002b8c0d625ed
                            value: phoneno.value,
                            name: 'phone_number',
                            onChange: e => setPhoneno(prevVal => {
                                return { ...prevVal, value: e.target.value }
                            }),
                            onBlur: textOnBlurHandler,
                            onFocus: focusHandler
                        }}
                    />
                    <div style={{ display: `${toggleFile ? 'none' : 'block'}` }}>
                        <FileUpload name='img' value={img} onChange={fileUploadHandler} />
                    </div>
                    <div style={{ display: `${!toggleFile ? 'none' : 'flex'}` }}>
                        <img src={''}
                            id='file-user'
                            alt='Preview' style={{
                                width: '8rem',
                                height: '8rem',
                                borderRadius: '.7rem',
                                margin: '2rem 0'
                            }} />
                        <span
                            onClick={() => setToggleFile(false)}
                            style={{
                                fontSize: '2rem',
                                cursor: 'pointer'
                            }}>x</span>
                    </div>
                    <FormSelect labelText='Role'
                        options={['Admin', 'Risk Manager', 'CFO']}
                        inputControls={{
                            value: role,
                            onChange: e => {
                                setRole(e.target.value)
                                // console.log(e.target.value);
                            },
                            name: 'role'
                        }}
                    />
                    <FormControl labelText='Staff ID'
                        isValid={staffNo.isValid}
                        inputId='staffid'
                        inputControls={{
                            type: 'text',
                            placeholder: 'EDI-01',
                            value: staffNo.value,
                            onChange: e => setStaffNo(prevVal => {
                                return { ...prevVal, value: e.target.value }
                            }),
                            name: 'staff_number',
                            onBlur: textOnBlurHandler,
                            onFocus: focusHandler
                        }}
                    />
                    <div className={classes.drawer__btns}>
<<<<<<< HEAD
                        <FormButton type='button' onClick={onCloseDrawer} className={classes.drawer__btn}>Cancel</FormButton>
=======
                        <FormButton type='button' className={classes.drawer__btn}>Cancel</FormButton>
>>>>>>> e9e810dfdad00d7de681eca1584002b8c0d625ed
                        <FormButton className={classes.drawer__btn}>Save</FormButton>
                    </div>
                </form>)}
                {isFound && (<>
                    <div className={classes.drawer__image}>
                        <img src={userImg} alt='' />
                    </div>
                    <FormHeading>User Added Successfully!</FormHeading>
                    <FormDescription>A mail has been sent to blossom@edike.ng to complete thier account setup and access teh Edike Admin Platform</FormDescription>
                    <div className={classes.drawer__btns}>
                        <FormButton type='button'
                         onClick={() => {
                            resetAllState();
                            setIsFound(false);
                        }}
                        className={classes.drawer__btn}>Add Another user</FormButton>
                        <FormButton className={classes.drawer__btn} onClick={()=> navigate('/dashboard')}>Go to Dashboard</FormButton>
                    </div>
                </>)}
            </div>
            <div className={`${classes.drawer__overlay} ${isDrawerVisible ? classes['drawer__overlay--show'] : ''}`} onClick={onCloseDrawer}></div>
        </>
    );
}

export default AddUserDrawer;


/*
<FormSelect labelText='Role'
options={options}
value={role}
onChange={setRole}
/>
*/ 