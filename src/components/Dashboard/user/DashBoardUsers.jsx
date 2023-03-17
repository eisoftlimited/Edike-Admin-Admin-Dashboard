import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashBoardButtons from '../DashBoardButtons';
import DashBoardNav from '../DashBoardNav';
import DashBoardPagination from '../DashBoardPagination';
import classes from './DashBoardUsers.module.scss';
import DashTable from '../DashTable';
import AddUserDrawer from './AddUserDrawer';
import Options from '../../UI/Options';
import ActivateModal from './ActivateModal';
import DeleteModal from './DeleteModal';
import BlockModal from './BlockModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../store/customer/getAllUserSlice';
import SchoolsLoadingSpinner from '../schools/SchoolsLoadingSpinner';
import ToastComponent from '../../UI/ToastComponent';
import LoadingScreen from '../../UI/LoadingScreen';
import { deleteUser, deleteUserActions } from '../../../store/customer/deleteCustomerSlice';
import { toast } from 'react-toastify';
import { blockUser, blockUserActions } from '../../../store/customer/blockUserSlice';
import { activateUser } from '../../../store/customer/activateUserSlice';
import { activateUserActions } from '../../../store/customer/activateUserSlice';
import avatar from './../../../img/avatar.svg';
import { exportFileToExcel } from '../../../utils/exportToExcel';

function DashBoardUsers() {
    const dispatch = useDispatch();

    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    // USESELECTOR STATES
    const token = useSelector(state => state.auth.token);
    const allUsers = useSelector(state => state.getAllUsers);
    const deletedUser = useSelector(state => state.deleteUser);
    const blockedUser = useSelector(state => state.blockUser);
    const activatedUser = useSelector(state => state.activateUser);
    const createdUser = useSelector(state => state.createUser);

    // const [filterBy, setFilterBy] = useState('all');

    // const navigate = useNavigate();

    // console.log(activatedUser);

    // LOCAL REACT STATE
    const [showDrawer, setShowDrawer] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [showActivateModal, setActivateModal] = useState(false);
    const [showBlockModal, setBlockModal] = useState(false);
    const [showDelModal, setDelModal] = useState(false);
    const [crud] = useState('add-user'); //setCrud('edit');

    const drawerDisplayHandler = () => {
        setShowDrawer(!showDrawer);
    };

    const deleteUserHandler = () => {
        // console.log({ selectedId });
        dispatch(deleteUser({ id: selectedId, token }));
        setDelModal(!showDelModal);
    };

    const blockUserHandler = () => {
        dispatch(blockUser({ id: selectedId, token }));
        setBlockModal(!showBlockModal);
    };

    const activateUserHandler = () => {
        // return console.log('Activating user...');
        dispatch(activateUser({ id: selectedId, token }));
        setActivateModal(!showActivateModal);
    };

    // FILTER LOGIC
    const [filterBy, setFilterBy] = useState('all');
    const [filteredArray, setFilteredArray] = useState([]);

    // const searchHandler = e => {
    //     console.log()
    // };

    // FILTERING USEEFFECT
    useEffect(() => {
        if (filterBy === 'all') {
            setFilteredArray(allUsers.allUsers || []);
        } else if (filterBy === 'active') {
            setFilteredArray(allUsers.activeUsers || []);
        } else if (filterBy === 'blocked') {
            setFilteredArray(allUsers.blockedUsers || []);
        }
    }, [filterBy, allUsers]);

    // USEEFFECT CODES
    useEffect(() => {
        dispatch(getAllUsers({ token }));
    }, [dispatch, token]);

    useEffect(() => {
        if ((createdUser.data) ||
            (blockedUser.blockMsg && blockedUser.blockMsg.length > 0) ||
            (activatedUser.activateMsg && activatedUser.activateMsg.length > 0) ||
            (deletedUser.deleteMsg && deletedUser.deleteMsg.length > 0)
        ) {
            dispatch(getAllUsers({ token }));
        }
    }, [dispatch, token, createdUser.data, blockedUser.blockMsg, activatedUser.activateMsg, deletedUser.deleteMsg]);


    useEffect(() => {

        let interval;
        // DELETED USER CODE
        if (deletedUser.error && deletedUser.error.length > 0) {
            toast.error(<p>{deletedUser.error}</p>);

            interval = setTimeout(() => {
                dispatch(deleteUserActions.resetDeleteState());
            }, 5000);
        }
        if (deletedUser.deleteMsg && deletedUser.deleteMsg === 'User Deleted Successfully') {
            toast.success(<p>{deletedUser.deleteMsg}</p>);

            interval = setTimeout(() => {
                dispatch(deleteUserActions.resetDeleteState());
            }, 5000);
        }

        // BLOCKED USER CODE
        if (blockedUser.error && blockedUser.error.length > 0) {
            toast.error(<p>{blockedUser.error}</p>);

            interval = setTimeout(() => {//blockUserActions
                dispatch(blockUserActions.resetState());
            }, 5000);
        }
        if (blockedUser.blockMsg && blockedUser.blockMsg === 'User Blocked Successfully') {
            toast.success(<p>{blockedUser.blockMsg}</p>);

            interval = setTimeout(() => {//blockUserActions
                dispatch(blockUserActions.resetState());
            }, 5000);
        }

        // ACTIVATED USER CODE
        if (activatedUser.error && activatedUser.error.length > 0) {
            toast.error(<p>{activatedUser.error}</p>);

            interval = setTimeout(() => {//blockUserActions
                dispatch(activateUserActions.resetState());
            }, 5000);
        }

        if (activatedUser.activateMsg && activatedUser.activateMsg === 'User Activation Successful') {
            toast.success(<p>{activatedUser.activateMsg}</p>);

            interval = setTimeout(() => {//blockUserActions
                dispatch(activateUserActions.resetState());
            }, 5000);
        }


        return () => {
            clearTimeout(interval);
        }

    }, [deletedUser, dispatch, blockedUser, activatedUser]);

    function formatDate(userDate) {

        const formatValue = (value) => {
            const tempVal = value < 10 ? `0${value}` : `${value}`;
            return tempVal;
        };

        const d = new Date(userDate);

        const year = `${d.getFullYear()}`.slice(2, 4);
        const month = formatValue(d.getMonth() + 1);
        const day = formatValue(d.getDate());

        return `${month}.${day}.${year}`;
    }

    // FILTERING USEEFFECT

    const [searchState, setSearchState] = useState('');
    const [searchArray, setSearchArray] = useState([]);

    useEffect(() => {
        // THIS IS FOR FILTERING BY SEARCH TEXT

        if (searchState.length === 0) {
            // filterCustomerFunction();
        } else if (searchState.length > 0) {
            const filteredCustomer = filteredArray && filteredArray.filter(customer => {
                const regex = new RegExp(searchState.toLowerCase());
                return (customer.firstname && customer.firstname.toLowerCase().match(regex)) || 
                    (customer.lastname && customer.lastname.toLowerCase().match(regex)) || 
                    (customer.email && customer.email.toLowerCase().match(regex));
            });
            setSearchArray(filteredCustomer);
        }
    }, [searchState, filteredArray]);

    let displayArray = filteredArray;

    if(searchState.length > 0) {
        displayArray = searchArray;
    }

    // MODAL INFORMATION STATE
    const [modalInfo, setModalInfo] = useState('');

    return (
        <>
            {/* DELETED USERS TOAST COMPONENT */}
            {deletedUser.error && deletedUser.error.length > 0 && <ToastComponent />}
            {deletedUser.deleteMsg && deletedUser.deleteMsg.length > 0 && <ToastComponent />}
            {deletedUser.loading && <LoadingScreen />}
            {/* BLOCKED USER TOAST COMPONENT */}
            {blockedUser.error && blockedUser.error.length > 0 && <ToastComponent />}
            {blockedUser.blockMsg && blockedUser.blockMsg.length > 0 && <ToastComponent />}
            {blockedUser.loading && <LoadingScreen />}
            {/* ACTIVATED USER TOAST COMPONENT */}
            {activatedUser.error && activatedUser.error.length > 0 && <ToastComponent />}
            {activatedUser.activateMsg && activatedUser.activateMsg.length > 0 && <ToastComponent />}
            {activatedUser.loading && <LoadingScreen />}

            <DashBoardNav
                navTitle='Users'
                searchPlaceholder='Search beneficiiary...'
                onAddSchool={drawerDisplayHandler}
                onOpenSidebar={openSideBarHandler}
                btnText='Add User'
                search={{
                    value: searchState,
                    onChange: e => {

                        if(e.target.value.includes('\\')) {
                            return;
                        }

                        setSearchState(e.target.value)
                    },
                    onClick: e => {
                        console.log('Button Clicked');
                    }
                }}
            />
            <div className={classes['dashboard-user']}>
                {!allUsers.loading && allUsers.allUsers && <>
                    <DashBoardButtons
                        isUser={true}
                        allAmount={allUsers.allUsers && allUsers.allUsers.length}
                        activeAmount={allUsers.activeUsers && allUsers.activeUsers.length}
                        blockedAmount={allUsers.blockedUsers && allUsers.blockedUsers.length}

                        onActive={() => {
                            setSearchState('');
                            setFilterBy('active');
                        }}
                        onAll={() => {
                            setSearchState('');
                            setFilterBy('all');
                        }}
                        onBlocked={() => {
                            setSearchState('');
                            setFilterBy('blocked');
                        }}
                        
                        onExportTable={()=> exportFileToExcel(filteredArray, 'Users')}
                    />
                    <DashTable pagination={false && <DashBoardPagination />}>
                        <tr>
                            <th></th>
                            <th>Admin Name</th>
                            <th>Staff Id</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        {displayArray && displayArray.map((user) => (
                        // {filteredArray && filteredArray.map((user) => (
                            <tr key={user._id}>
                                <td className={classes['table-data']}><input type="checkbox" name="" id="" /></td>
                                <td className={classes['table-data']}>
                                    <div>
                                        <span>
                                            {!user.profileImage ? <img src={avatar} alt={user.firstname} /> :
                                                <img style={{ width: '100%', height: '100%' }} src={user.profileImage} alt={user.firstname} />
                                            }
                                        </span>
                                        <section>
                                            <h3>{user.firstname || '-'} {user.lastname || '-'}</h3>
                                            <p>{user.email || '-'}</p>
                                        </section>
                                    </div>
                                </td>
                                <td className={classes['table-data']}>{user.staff_number || '-'}</td>
                                <td className={classes['table-data']}>{user.phone_number || '-'}</td>
                                <td className={classes['table-data']}>{formatDate(user.createdAt || '-')}</td>
                                <td className={classes['table-data']}>
                                    <div>
                                        {user.status === 'active' && <span className={classes['success']}>Active</span>}
                                        {user.status === 'blocked' && <span className={classes['danger']}>Blocked</span>}
                                        <div onClick={e => {

                                            // console.log('Working');
                                            // const dotts = document.querySelectorAll('.dots');

                                            // for(let i=0; i<dotts.length; i++) {
                                            //     dotts[i].nextElementSibling.style.display = 'none';
                                            // }

                                            const optionsList = e.currentTarget.nextElementSibling;

                                            if (optionsList.style.display === 'none') {
                                                optionsList.style.display = 'block';
                                            } else {
                                                optionsList.style.display = 'none';
                                            }

                                            
                                        }} className={classes.dots}>
                                            <i className={`fas fa-ellipsis-v`} />
                                        </div>

                                        <Options
                                            isUser={true}
                                            // status={user.status}
                                            status={user.status}
                                            className={classes.dropdown}
                                            onActivateUser={() => {
                                                setModalInfo(`${user.firstname} ${user.lastname}`);
                                                setActivateModal(true);
                                                setSelectedId(user._id);
                                            }}
                                            onDeleteUser={() => {
                                                setModalInfo(`${user.firstname} ${user.lastname}`);
                                                setDelModal(true);
                                                setSelectedId(user._id);
                                            }}
                                            // onEditUser={() => {
                                            //     setCrud('edit');
                                            //     // dispatch(getSchoolActions.resetGetSchoolState());
                                            //     setSelectedId(user._id);
                                            //     setShowDrawer(true);
                                            // }}
                                            onBlockUser={() => {
                                                setModalInfo(`${user.firstname} ${user.lastname}`);
                                                setBlockModal(true);
                                                setSelectedId(user._id);
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>))
                        }
                    </DashTable>
                </>}


                {allUsers.loading && <SchoolsLoadingSpinner />}
                {!allUsers.loading && !allUsers.allUsers && <div className={classes['dashboard-user__fallback']}>
                    <h1>No User found</h1>
                    <button
                        onClick={drawerDisplayHandler}
                    >Click to add User</button>
                </div>}
            </div>

            <>
                <ActivateModal
                    isModalVisible={showActivateModal}
                    onCloseModal={() => setActivateModal(false)}
                    onConfirmClick={activateUserHandler}
                    onCancelClick={()=> setActivateModal(false)}
                    infoModal={{
                        msg: `Are you sure you want to activate ${modalInfo}? Once activated, They will have access to their account`
                    }}
                />
                <BlockModal
                    isModalVisible={showBlockModal}
                    onCloseModal={() => setBlockModal(false)}
                    onConfirmClick={blockUserHandler}
                    onCancelClick={() => setBlockModal(false)}
                    infoModal={{
                        msg: `Are you sure you want to block ${modalInfo}? Once blocked, They will no longer have access to their account`
                    }}
                />
                <DeleteModal
                    onCancelClick={()=> setDelModal(false)}
                    onConfirmClick={deleteUserHandler}
                    isModalVisible={showDelModal}
                    onCloseModal={() => setDelModal(false)}
                    infoModal={{
                        msg: `Are you sure you want to delete ${modalInfo}? If you proceed,  their details will be deleted entirely from the platform`
                    }}
                />
                <AddUserDrawer crudOperation={crud} isDrawerVisible={showDrawer} onCloseDrawer={drawerDisplayHandler} />
            </>
        </>
    );
}

export default DashBoardUsers;