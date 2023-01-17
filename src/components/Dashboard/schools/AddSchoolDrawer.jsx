import classes from './AddSchoolDrawer.module.scss';
import FormHeading from './../../Account/FormHeading';
import FormDescription from './../../Account/FormDescription';
import FormControl from './../../Account/FormControl';
import FileUpload from '../../Account/FileUpload';
import FormPhone from '../../Account/FormPhone';
import FormButton from '../../Account/FormButton';
import AccountFound from './AccountFound';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSchool, createSchoolActions } from '../../../store/schools/createSchoolSlice';
import schoolImg from './../../../img/school-image.svg';
import { toast } from 'react-toastify';
import ToastComponent from '../../UI/ToastComponent';
// import SchoolsLoadingSpinner from './SchoolsLoadingSpinner';
import { RotatingLines } from 'react-loader-spinner';
import { getSchool } from '../../../store/schools/getSchoolSlice';
import { updateSchool, updateSchoolActions } from '../../../store/schools/editSchool';
import FormSelect from '../../Account/FormSelect';
import { verifyAccountNumber } from '../../../store/accountNum/verifyAccountNumberSlice';
import { useNavigate } from 'react-router-dom';

function AddSchoolDrawer({ onCloseDrawer, isDrawerVisible, crudOperation, schoolId }) {

    // const
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const { loading, error, school } = useSelector(state => state.createSchool);
    const editSchool = useSelector(state => state.getSchool);
    const listedBanks = useSelector(state => state.getBanks);
    const verifiedBank = useSelector(state => state.verifyBank);    
    const updatedSchool = useSelector(state => state.updateSchool);

    const navigate = useNavigate();


    // const {bname, bcode} = listedBanks.banks || [];

    // console.log(editSchool.singleSchool);

    const [isFound, setIsFound] = useState(false);
    const [schoolName, setSchoolName] = useState('');
    const [schoolLocation, setSchoolLocation] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [email, setEmail] = useState('');
    const [conFirstName, setConFirstName] = useState('');
    const [schoolProfile, setSchoolProfile] = useState(null);
    const [conLastName, setConLastName] = useState('');
    const [conBank, setConBank] = useState('');
    const [conPhone, setConPhone] = useState('');
    const [conAccNo, setConAccNo] = useState('');
    const [conAccName, setConAccName] = useState('');

    const [bankCode, setBankCode] = useState(null);

    // console.log({conAccName});

    const [toggleFile, setToggleFile] = useState(false);

    const drawerRef = useRef();

    function resetAllState() {
        setConAccNo('');
        setSchoolName('');
        setSchoolLocation('');
        setPhoneno('');
        setEmail('');
        setConFirstName('');
        setSchoolProfile(null);
        setConLastName('');
        setConBank('');
        setConPhone('');
        setConAccNo('');
    }

    const schoolCrudHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('school_name', schoolName);
        formData.append('school_location', schoolLocation);
        formData.append('phoneno', phoneno);
        formData.append('email', email);
        formData.append('contact_firstname', conFirstName);
        formData.append('school_profile', schoolProfile);
        formData.append('contact_lastname', conLastName);
        formData.append('contact_bank', conBank);
        formData.append('contact_phone', conPhone);
        formData.append('contact_acct_number', conAccNo);
        formData.append('contact_bank_acct_name', conAccName);

        setToggleFile(false);

        if (crudOperation === 'add-school') {
            // console.log({schoolName, schoolLocation, phoneno, email, conFirstName,  schoolProfile, conLastName, conBank, conPhone, conAccNo, conAccName});
        
            dispatch(createSchool({ data: formData, token }));
        } else if (crudOperation === 'edit') {
            formData.delete('school_profile');
            // console.log({schoolName, schoolLocation, phoneno, email, conFirstName,  schoolProfile, conLastName, conBank, conPhone, conAccNo, conAccName});

            // for(let data of formData) {
            //     console.log(`${data[0]}===${data[1]}`);
            // }

            dispatch(updateSchool({ token, id: schoolId, data: formData }));
        }

        // resetAllState();
    };

    function showPreview(event) {
        if (event.target.files.length > 0) {
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById("file-ip-1-preview");
            preview.src = src;
            setToggleFile(true);
            // preview.style.display = "block";
            // event.target.parentElement.style.display = 'none';
        }
    }

    const onblurHandler = e => {

        if (e.target.value.length === 0) {
            e.target.style.borderColor = '#FAA61A';
            e.target.parentElement.previousElementSibling.style.color = '#B2B2B2';
            e.target.style.color = '#B2B2B2';
        } else {
            e.target.style.borderColor = '#B2B2B2';
            e.target.parentElement.previousElementSibling.style.color = '#B2B2B2';
            e.target.style.color = '#B2B2B2';
        }
    };

    const accountOnBlur = e => {
        if (e.target.value.length !== 10) {
            e.target.style.borderColor = '#FAA61A';
            e.target.parentElement.previousElementSibling.style.color = '#FAA61A';
            e.target.style.color = '#B2B2B2';
        } else {
            e.target.style.borderColor = '#B2B2B2';
            e.target.parentElement.previousElementSibling.style.color = '#B2B2B2';
            e.target.style.color = '#B2B2B2';

            // console.log('e.target.value: ', e.target.value);
            // console.log('Bank code: ', bankCode);

            dispatch(verifyAccountNumber({
                account_number: e.target.value,
                bank_code: bankCode
            }));
        }
    };

    const fileUploadHandler = e => {
        console.log(e.target.files[0]);
        setSchoolProfile(e.target.files[0]);
        showPreview(e);
    };

    useEffect(()=> {
        if(verifiedBank.bankDetails && verifiedBank.bankDetails.account_name) {
            setConAccName(verifiedBank.bankDetails.account_name);
        }
    }, [verifiedBank]);


    useEffect(() => {
        if (school) {
            setIsFound(true);
        }
    }, [school]);

    useEffect(() => {

        // CREATE SCHOOL CODE
        let interval;
        if (error && error.length > 0) {
            toast.error(error);
            interval = setTimeout(() => {
                dispatch(createSchoolActions.resetState());
            }, 5000);
        }

        // UPDATE SCHOOL CODE
        if(updatedSchool.error && updatedSchool.error.length > 0) {
            toast.error(updatedSchool.error);
            interval = setTimeout(()=> {
                dispatch(updateSchoolActions.resetState());
            }, 5000);
        }

        return () => {
            clearTimeout(interval);
        }
    }, [error, dispatch, updatedSchool]);

    useEffect(() => {
        if (crudOperation === 'edit') {
            dispatch(getSchool({ token, id: schoolId }));
        }

        if (crudOperation === 'add-school') {
            setSchoolName('');
            setSchoolLocation('');
            setPhoneno('');
            setEmail('');
            setConFirstName('');
            setSchoolProfile(null);
            setConLastName('');
            setConBank('');
            setConPhone('');
            setConAccNo('');
        }

    }, [crudOperation, schoolId, dispatch, token]);

    useEffect(() => {

        if (editSchool.singleSchool) {
            const { singleSchool } = editSchool;
            setSchoolName(singleSchool.school_name);
            setSchoolLocation(singleSchool.school_location);
            setPhoneno(singleSchool.phoneno);
            setEmail(singleSchool.email);
            setConFirstName(singleSchool.contact_firstname);
            setSchoolProfile(null);
            setConLastName(singleSchool.contact_lastname);
            setConBank(singleSchool.contact_bank);
            setConPhone(singleSchool.contact_phone);
            setConAccNo(singleSchool.contact_acct_number);
            setConAccName(singleSchool.contact_bank_acct_name);
            // console.log({conAccName, conBank});
        }

    }, [editSchool]);


    // LOADING STATE OF DRAWER
    useEffect(() => {
        if (loading || updatedSchool.loading) {
            drawerRef.current.scrollTop = 0;
            drawerRef.current.style.overflowY = 'hidden';
        } else {
            drawerRef.current.style.overflowY = 'auto';
        }
    }, [loading, updatedSchool]);

    function focusHandler(e) {
        e.currentTarget.style.borderColor = 'rgb(250, 166, 26)';
    }

    return (
        <>

            {!loading && error && error.length > 0 && <ToastComponent />}
            {!updatedSchool.loading && updatedSchool.error && updatedSchool.error.length > 0 && <ToastComponent />}
            <div ref={drawerRef} className={`${classes.drawer} ${isDrawerVisible ? classes['drawer--show'] : ''}`}>
                {(loading || updatedSchool.loading) &&
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
                {!isFound && (<form onSubmit={schoolCrudHandler}>
                    {crudOperation === 'add-school' && <FormHeading className={classes.drawer__heading}>Add School</FormHeading>}
                    {crudOperation === 'edit' && <FormHeading className={classes.drawer__heading}>Edit School</FormHeading>}
                    <FormDescription className={classes.drawer__description}>Please fill the form below to add a school to the Edike platform</FormDescription>
                    <div style={{ height: '3rem' }} />
                    <FormControl labelText='School Name'
                        inputId='sname'
                        isValid={true}
                        inputControls={{
                            type: 'text',
                            placeholder: 'Enter school name here...',
                            value: schoolName,
                            name: 'school_name',
                            onChange: e => setSchoolName(e.target.value),
                            onBlur: onblurHandler,
                            onFocus: focusHandler
                        }}
                    />
                    <FormControl labelText='Address'
                        inputId='saddress'
                        isValid={true}
                        inputControls={{
                            type: 'text',
                            placeholder: 'Enter address here...',
                            value: schoolLocation,
                            name: 'school_location',
                            onChange: e => setSchoolLocation(e.target.value),
                            onBlur: onblurHandler,
                            onFocus: focusHandler
                        }}
                    />
                    <FormPhone labelText='Phone'
                        isValid={true}
                        inputId='phoneno'
                        inputControls={{
                            type: 'number',
                            placeholder: 'Enter phone number here...',
                            value: phoneno,
                            name: 'phoneno',
                            onChange: e => setPhoneno(e.target.value),
                            onFocus: focusHandler
                        }}
                    />
                    <input type='hidden' name='contact_bank_acct_name' value={conAccName} />
                    {crudOperation !== 'edit' && (
                        <>
                            <div style={{ display: `${toggleFile ? 'none' : 'block'}` }}>
                                <FileUpload name='school_profile' value={schoolProfile} onChange={fileUploadHandler} />
                            </div>
                            <div style={{ display: `${!toggleFile ? 'none' : 'flex'}` }}>
                                <img src={''} id='file-ip-1-preview' alt='Preview' style={{ width: '8rem', height: '8rem', borderRadius: '.7rem', margin: '2rem 0' }} />
                                <span style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => setToggleFile(false)}>x</span>
                            </div>
                        </>)}
                    <h2 className={classes.drawer__subheading}>Contact Person</h2>
                    <div className={classes.drawer__formgroup}>
                        <FormControl labelText='First Name'
                            inputId='fname'
                            isValid={true}
                            inputControls={{
                                type: 'text',
                                placeholder: 'Enter first name here...',
                                value: conFirstName,
                                name: 'contact_firstname',
                                onChange: e => setConFirstName(e.target.value),
                                onBlur: onblurHandler,
                                onFocus: focusHandler
                            }}
                        />
                        <FormControl labelText='Last Name'
                            inputId='lname'
                            isValid={true}
                            inputControls={{
                                type: 'text',
                                placeholder: 'Enter last name here...',
                                value: conLastName,
                                name: 'contact_lastname',
                                onChange: e => setConLastName(e.target.value),
                                onBlur: onblurHandler,
                                onFocus: focusHandler
                            }}
                        />
                    </div>
                    <FormPhone labelText='Phone'
                        inputId='conphoneno'
                        isValid={true}
                        inputControls={{
                            type: 'number',
                            placeholder: 'Enter contact phone here...',
                            value: conPhone,
                            name: 'contact_phone',
                            onChange: e => setConPhone(e.target.value),
                            onFocus: focusHandler
                        }}
                    />
                    <FormControl labelText='Email'
                        inputId='email'
                        isValid={true}
                        inputControls={{
                            type: 'text',
                            placeholder: 'Enter email here...',
                            value: email,
                            onChange: e => setEmail(e.target.value),
                            onFocus: focusHandler
                        }}
                    />
                    <h2 className={classes.drawer__subheading}>Account Details</h2>
                    <FormSelect labelText='Bank Name'
                        optionsObject={listedBanks.banks ? listedBanks.banks : []}
                        inputControls={{
                            placeholder: 'Select bank...',
                            value: `${conBank}+${bankCode}`,
                            name: 'contact_bank',
                            onChange: e => {
                                const value = e.target.value.split('+');
                                setConBank(value[0]);
                                setBankCode(value[1]);
                            },
                        }}
                    />
                    <FormControl labelText='Account Number'
                        inputId='accnumber'
                        isValid={true}
                        inputControls={{
                            type: 'text',
                            placeholder: 'Enter account number here...',
                            value: conAccNo,
                            name: 'contact_acct_number',
                            onChange: e => {
                                setConAccNo(e.target.value);
                            },
                            onBlur: accountOnBlur,
                            onFocus: focusHandler
                        }}
                    />
                    {!verifiedBank.loading && <AccountFound bankDetails={verifiedBank} />}
                    {verifiedBank.loading && <p>Loading account...</p>}
                    <div className={classes.drawer__btns}>
                        <FormButton type='button' onClick={onCloseDrawer} className={classes.drawer__btn}>Cancel</FormButton>
                        {crudOperation === 'add-school' && <FormButton className={classes.drawer__btn}>Save</FormButton>}
                        {crudOperation === 'edit' && <FormButton className={classes.drawer__btn}>update</FormButton>}
                    </div>
                </form>)}
                {isFound && (<>
                    <div className={classes.drawer__image}>
                        <img src={schoolImg} alt='' />
                    </div>
                    <FormHeading>School Added Successfully!</FormHeading>
                    <FormDescription>A mail has been sent to the school email address to notify them of this action.</FormDescription>
                    <div className={classes.drawer__btns}>
                        <FormButton type='button'
                            onClick={() => {
                                resetAllState();
                                setIsFound(false);
                            }}
                            className={classes.drawer__btn}>Add another school</FormButton>
                        <FormButton type='button' className={classes.drawer__btn} onClick={()=> navigate('/dashboard')}>Go to dashboard</FormButton>
                    </div>
                </>)}
            </div>
            <div className={`${classes.drawer__overlay} ${isDrawerVisible ? classes['drawer__overlay--show'] : ''}`} onClick={onCloseDrawer}></div>
        </>
    );
}

export default AddSchoolDrawer;