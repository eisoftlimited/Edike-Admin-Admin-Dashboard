import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
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
import SchoolsLoadingSpinner from '../schools/SchoolsLoadingSpinner';
import ToastComponent from '../../UI/ToastComponent';
import LoadingScreen from '../../UI/LoadingScreen';
import { deleteUser, deleteUserActions } from '../../../store/customer/deleteCustomerSlice';
import { toast } from 'react-toastify';
// import { blockUserActions } from '../../../store/customer/blockUserSlice';
// import { activateUser } from '../../../store/auth/authSlice';
// import { activateUserActions } from '../../../store/customer/activateUserSlice';
import { getAllCustomers } from '../../../store/realCustomers/getAllCustomersSlice';
import { blockCustomer, blockCustomerActions } from '../../../store/realCustomers/blockCustomerSlice';
import avatar from './../../../img/avatar.svg';
import { activateCustomer, activateCustomerActions } from '../../../store/realCustomers/activateCustomerSlice';
import { exportFileToExcel } from '../../../utils/exportToExcel';

function CustomerDash() {
    const dispatch = useDispatch();

    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    // NAVIGATE 
    const navigate = useNavigate();

    // USESELECTOR STATES
    const token = useSelector(state => state.auth.token);
    const allUsers = useSelector(state => state.getAllCustomers);
    const deletedUser = useSelector(state => state.deleteUser);
    const blockedUser = useSelector(state => state.blockCustomer);
    const activatedUser = useSelector(state => state.activateCustomer);
    const createdUser = useSelector(state => state.createUser);

    // console.log({token});

    // console.log(deletedUser);

    // LOCAL REACT STATE
    const [showDrawer, setShowDrawer] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [showActivateModal, setActivateModal] = useState(false);
    const [showBlockModal, setBlockModal] = useState(false);
    const [showDelModal, setDelModal] = useState(false);
    const [crud, setCrud] = useState('add-user'); //setCrud('edit');



    const drawerDisplayHandler = () => {
        setShowDrawer(!showDrawer);
    };

    const deleteUserHandler = () => {
        // console.log({ selectedId });
        dispatch(deleteUser({ id: selectedId, token }));
        setDelModal(!showDelModal);
    };

    const blockUserHandler = () => {
        dispatch(blockCustomer({ id: selectedId, token }));
        setBlockModal(!showBlockModal);
    };

    const activateUserHandler = () => {
        // console.log({token});
        dispatch(activateCustomer({ id: selectedId, token }));
        setActivateModal(!showActivateModal);
    };

    // FILTER LOGIC
    const [filterBy, setFilterBy] = useState('all');
    const [filteredArray, setFilteredArray] = useState([]);

    function filterCustomerFunction() {
        if (filterBy === 'all') {
            setFilteredArray(allUsers.allUsers || []);
        } else if (filterBy === 'active') {
            setFilteredArray(allUsers.activeUsers || []);
        } else if (filterBy === 'blocked') {
            setFilteredArray(allUsers.blockedUsers || []);
        }
    }


    // FILTERING USEEFFECT
    useEffect(() => {
        filterCustomerFunction();
    }, [filterBy, allUsers]);

    // USEEFFECT CODES
    useEffect(() => {
        dispatch(getAllCustomers({ token }));
    }, [dispatch, token,
        // createdUser.data, activatedUser.activateMsg, blockedUser.blockMsg
    ]);

    useEffect(() => {
        if ((createdUser.data) ||
            (activatedUser.activateMsg && activatedUser.activateMsg.length > 0) ||
            (blockedUser.blockMsg && blockedUser.blockMsg.length > 0)) {
            dispatch(getAllCustomers({ token }));
        }
    }, [dispatch, token, createdUser, activatedUser, blockedUser]);

    useEffect(() => {

        let interval;
        // DELETED USER CODE
        if (deletedUser.error && deletedUser.error.length > 0) {
            toast.error(deletedUser.error);
        }
        if (deletedUser.deleteMsg && deletedUser.deleteMsg === 'School Deleted Successfully') {
            toast.success(deletedUser.deleteMsg);

            interval = setTimeout(() => {
                dispatch(deleteUserActions.resetDeleteState());
            }, 5000);
        }

        // BLOCKED USER CODE
        if (blockedUser.error && blockedUser.error.length > 0) {
            toast.error(<p>{blockedUser.error}</p>);

            interval = setTimeout(() => {//blockUserActions
                dispatch(blockCustomerActions.resetBlockState());
            }, 5000);
        }
        if (blockedUser.blockMsg && blockedUser.blockMsg.length > 0) {
            toast.success(<p>{blockedUser.blockMsg}</p>);

            interval = setTimeout(() => {//blockUserActions
                dispatch(blockCustomerActions.resetBlockState());
            }, 5000);
        }

        // ACTIVATED USER CODE
        if (activatedUser.error && activatedUser.error.length > 0) {
            toast.error(<p>{activatedUser.error}</p>);

            interval = setTimeout(() => {//blockUserActions
                dispatch(activateCustomerActions.resetActivatedState());
            }, 5000);
        }

        if (activatedUser.activateMsg && activatedUser.activateMsg.length > 0) {
            toast.success(<p>{activatedUser.activateMsg}</p>);

            interval = setTimeout(() => {//blockUserActions
                dispatch(activateCustomerActions.resetActivatedState());
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
        const day = formatValue(d.getDay() + 1);

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
                // return (customer.name && customer.name.toLowerCase().match(regex)) || (customer.email && customer.email.toLowerCase().match(regex));

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

    // MODAL INFORMATION
    const [modalInfo, setModalInfo] = useState({name: '', amount: 0});

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
                searchPlaceholder='Search Customer'
                showPlusIcon={false}
                navTitle='Customers'
                onAddSchool={() => {
                    // drawerDisplayHandler();
                    console.log('Searching...');
                }}
                onOpenSidebar={openSideBarHandler}
                btnText='Search'

                search={{
                    value: searchState,
                    onChange: e => {
                        if(e.target.value.includes('\\')) {
                            return;
                        }
                        setSearchState(e.target.value);
                    },
                    // onClick: e => {
                    //     console.log('Button Clicked');
                    // }
                }}
            />
            <div className={classes['dashboard-user']}>
                {!allUsers.loading && allUsers.allUsers && <>
                    <DashBoardButtons
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

                        onExportTable={() => exportFileToExcel(filteredArray, 'Customers')}
                    />
                    <DashTable pagination={false && <DashBoardPagination />}>
                        <tr>
                            <th></th>
                            <th>Customer Name</th>
                            <th>Customer Id</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        {displayArray.map((user) => (
                        // {filteredArray.map((user) => (
                            <tr key={user._id}>
                                <td className={classes['table-data']}><input type="checkbox" name="" id="" /></td>
                                <td className={classes['table-data']}>
                                    <div>
                                        <span className={classes.avatar}>
                                            {user.profileImage && <img src={user.profileImage} alt={user.firstname} />}
                                            {!user.profileImage && <img src={avatar} alt={user.firstname} />}
                                        </span>
                                        {/* profileImage */}
                                        <section>
                                            <h3>{user.firstname || '-'} {user.lastname || '-'}</h3>
                                            <p>{user.email || '-'}</p>
                                        </section>
                                    </div>
                                </td>
                                <td className={classes['table-data']}>{user.customer_reference}</td>
                                <td className={classes['table-data']}>{user.residence_address ? user.residence_address : '-'}</td>
                                <td className={classes['table-data']}>{user.phone || '-'}</td>
                                <td className={classes['table-data']}>{user.createdAt && formatDate(user.createdAt)}</td>
                                <td className={`${classes['table-data']} ${classes.droptd}`}>
                                    <div>
                                        {user.status === 'active' && <span className={classes['success']}>Active</span>}
                                        {user.status === 'blocked' && <span className={classes['danger']}>Blocked</span>}
                                        <div onClick={e => {
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
                                            isCustomer={true}
                                            status={user.status}
                                            // status={'blocked'}
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
                                            onEditUser={() => {
                                                setCrud('edit');
                                                // dispatch(getSchoolActions.resetGetSchoolState());
                                                setSelectedId(user._id);
                                                setShowDrawer(false);
                                            }}
                                            onBlockUser={() => {
                                                setModalInfo(`${user.firstname} ${user.lastname}`);
                                                setBlockModal(true);
                                                setSelectedId(user._id);
                                            }}
                                            onViewUser={() => {
                                                navigate(`/dashboard/customers/${user._id}`);
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
                    <h1>No Customer found</h1>
                </div>}
            </div>

            <>
                <ActivateModal
                    isModalVisible={showActivateModal}
                    onCloseModal={() => setActivateModal(false)}
                    onConfirmClick={activateUserHandler}
                    onCancelClick={() => setActivateModal(false)}
                    
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
                    onConfirmClick={deleteUserHandler}
                    isModalVisible={showDelModal}
                    onCloseModal={() => setDelModal(false)}
                    onCancelClick={() => setDelModal(false)}

                    infoModal={{
                        msg: `Are you sure you want to delete ${modalInfo}? If you proceed,  their details will be deleted entirely from the platform`
                    }}
                />
                
                <AddUserDrawer crudOperation={crud} isDrawerVisible={showDrawer} onCloseDrawer={drawerDisplayHandler} />
            </>
        </>
    );
}

export default CustomerDash;