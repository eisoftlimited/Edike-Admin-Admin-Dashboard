import DashBoardButtons from '../DashBoardButtons';
import classes from './DashBoardMain.module.scss';
import DashBoardPagination from '../DashBoardPagination';
import DashTable from '../DashTable';
import DeleteModal from './DeleteModal';
import BlockModal from './BlockModal';
import Options from '../../UI/Options';
import AddSchoolDrawer from './AddSchoolDrawer';
import { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import DashBoardNav from '../DashBoardNav';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSchools } from '../../../store/schools/getAllSchoolSlice';
import SchoolsLoadingSpinner from './SchoolsLoadingSpinner';
import { deleteSchool, deleteSchoolActions } from '../../../store/schools/deleteSchool';
import { getSchoolActions } from '../../../store/schools/getSchoolSlice';
import ToastComponent from '../../UI/ToastComponent';
import LoadingScreen from '../../UI/LoadingScreen';
import { toast } from 'react-toastify';
import { blockSchool, blockSchoolActions } from '../../../store/schools/blockSchoolSlice';
import ActivateModal from './ActivateModal';
import { fetchBankList } from '../../../store/accountNum/listBanksSlice';
import { activateSchool, activateSchoolActions } from '../../../store/schools/activateSchoolSlice';
import { exportAsFile } from '../../../utils/exportFile';
import avatar from './../../../img/avatar.svg';

function DashBoardMain() {
    const token = useSelector(state => state.auth.token);
    const { loading, error, allSchools, blockedSchools, activeSchools } = useSelector(state => state.getSchools);
    const deletedSchool = useSelector(state => state.deleteSchool);
    const blockedSchool = useSelector(state => state.blockSchool);
    const activatedSchool = useSelector(state => state.activateSchool);
    const createdSchool = useSelector(state => state.createSchool);
    const updatedSchool = useSelector(state => state.updateSchool);
    const dispatch = useDispatch();

    const [openSideBarHandler] = useOutletContext();
    const [showDelModal, setDelModal] = useState(false);
    const [showBlockModal, setBlockModal] = useState(false);
    const [showActivateModal, setActivateModal] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [crud, setCrud] = useState('add-school');

    // console.log({token}, ' In the schools');

    // FILTER LOGIC
    const [filterBy, setFilterBy] = useState('all');
    const [filteredArray, setFilteredArray] = useState([]);

    // SEARCH STATE AND LOGIC
    const [searchState, setSearchState] = useState('');
    const [shouldSearch, setShouldSearch] = useState(false);
    const [filteredSearch, setFilteredSearch] = useState([]);

    // FILTERING USEEFFECT

    // useEffect(() => {
    //      // THIS IS FOR FILTERING BY SEARCH TEXT

    //     if (searchState.length === 0) {
    //         setShouldSearch(false);
    //     } else if(searchState.length > 0) {
    //         setShouldSearch(true);
    //         const filteredSchool = filteredArray.filter(school => {
    //             const regex = new RegExp(searchState);
    //             return school.school_name.match(regex) || school.email.match(regex);
    //         });
    //         setFilteredSearch(filteredSchool);
    //     }
    // }, [searchState, shouldSearch]);

    useEffect(() => {
        // // THIS IS FOR FILTERING BUTTON CLICK
        if (filterBy === 'all') {
            setFilteredArray(allSchools || []);
        } else if (filterBy === 'active') {
            setFilteredArray(activeSchools || []);
        } else if (filterBy === 'blocked') {
            setFilteredArray(blockedSchools || []);
        }

    }, [filterBy, blockedSchools, activeSchools, allSchools]);


    useEffect(() => {
        dispatch(fetchBankList());
    }, [dispatch]);


    useEffect(() => {
        if (searchState.length !== 0) {
            const filteredSchool = filteredArray.filter(school => {
                const regex = new RegExp(searchState);
                return school.school_name.match(regex) || school.email.match(regex);
            });
            setFilteredArray(filteredSchool);
        }
    }, [searchState]);

    useEffect(() => {
        dispatch(getSchools({ token }));

        // return ()=> {
        //     console.log('Updating...');
        // }
    }, [dispatch, token, activatedSchool.activateMsg, blockedSchool.blockMsg, createdSchool.school, updatedSchool.data, deletedSchool.deleteMsg]);

    // useEffect(() => {
    //     if (createdSchool) {
    //         dispatch(getSchools({ token }));
    //     }
    // }, [createdSchool, dispatch, token]);



    const exportTableToJsonHandler = () => {
        const jsonData = JSON.stringify(allSchools);

        // console.log(jsonData);
    };

    const deleteUserHandler = () => {
        dispatch(deleteSchool({ id: deleteId, token }));
        setDelModal(!showDelModal);
    };


    const blockUserHandler = () => {
        dispatch(blockSchool({ id: deleteId, token }));
        setBlockModal(!showBlockModal);
    }

    const activateUserHandler = () => {
        dispatch(activateSchool({ id: deleteId, token }));
        setActivateModal(!showActivateModal);
    };

    const viewUserHandler = id => null;
    const drawerDisplayHandler = () => {
        setShowDrawer(!showDrawer);
    }

    const showDropdownHandler = e => {
        const element = e.target.nextElementSibling;
        if (element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    useEffect(() => {

        let interval;

        // DELETED SCHOOLS CODE
        if (deletedSchool.error && deletedSchool.error.length > 0) {
            toast.error(<p>{deletedSchool.error}</p>);

            interval = setTimeout(() => {
                dispatch(deleteSchoolActions.resetDeleteState());
            }, 5000);
        }
        if (deletedSchool.deleteMsg && deletedSchool.deleteMsg === 'School Deleted Successfully') {
            toast.success(<p>{deletedSchool.deleteMsg}</p>);

            interval = setTimeout(() => {
                dispatch(deleteSchoolActions.resetDeleteState());
            }, 5000);
        }

        // BLOCKED SCHOOL CODE
        if (blockedSchool.error && blockedSchool.error.length > 0) {
            toast.error(<p>{blockedSchool.error}</p>);

            interval = setTimeout(() => {
                dispatch(blockSchoolActions.resetBlockState());
            }, 5000);
        }
        if (blockedSchool.blockMsg) {
            toast.success(<p>School successfully blocked</p>);

            interval = setTimeout(() => {
                dispatch(blockSchoolActions.resetBlockState());
            }, 5000);
        }

        // ACTIVATED SCHOOL CODE
        if (activatedSchool.error && activatedSchool.error.length > 0) {
            toast.error(<p>{activatedSchool.error}</p>);

            interval = setTimeout(() => {
                dispatch(activateSchoolActions.resetBlockState());
            }, 5000);
        }

        if (activatedSchool.activateMsg) {
            toast.success(<p>School successfully activated.</p>);

            interval = setTimeout(() => {
                dispatch(activateSchoolActions.resetBlockState());
            }, 5000);
        }


        return () => {
            clearTimeout(interval);
        }

    }, [deletedSchool, dispatch, blockedSchool, activatedSchool]);





    // ===================================================================

    const [schoolSearchState, setSchoolSearchState] = useState('');
    const [searchArray, setSearchArray] = useState([]);

    useEffect(() => {
        // THIS IS FOR FILTERING BY SEARCH TEXT

        if (schoolSearchState.length === 0) {
            // filterCustomerFunction();
        } else if (schoolSearchState.length > 0) {
            const filteredCustomer = filteredArray && filteredArray.filter(customer => {
                const regex = new RegExp(schoolSearchState.toLowerCase());
                return (customer.school_name && customer.school_name.toLowerCase().match(regex)) || (customer.email && customer.email.toLowerCase().match(regex));
            });
            setSearchArray(filteredCustomer);
        }
    }, [schoolSearchState, filteredArray]);

    let displayArray = filteredArray;

    if (schoolSearchState.length > 0) {
        displayArray = searchArray;
    }
    // ===================================================================


    const [modalInfo, setModalInfo] = useState('');

    return (
        <>
            {/* DELETED SCHOOLS TOAST COMPONENT */}
            {deletedSchool.error && deletedSchool.error.length > 0 && <ToastComponent />}
            {deletedSchool.deleteMsg && deletedSchool.deleteMsg.length > 0 && <ToastComponent />}
            {deletedSchool.loading && <LoadingScreen />}

            {/* BLOCKED SCHOOLS TOAST COMPONENTS */}
            {blockedSchool.error && blockedSchool.error.length > 0 && <ToastComponent />}
            {blockedSchool.blockMsg && <ToastComponent />}
            {blockedSchool.loading && <LoadingScreen />}

            {/* ACTIVATE SCHOOLS TOAST COMPONENTS */}
            {activatedSchool.error && activatedSchool.error.length > 0 && <ToastComponent />}
            {activatedSchool.activateMsg && <ToastComponent />}
            {activatedSchool.loading && <LoadingScreen />}



            <DashBoardNav 
                navTitle='Schools'
                onOpenSidebar={openSideBarHandler}
                onAddSchool={() => {
                    setCrud('add-school');
                    drawerDisplayHandler();
                    setDeleteId('');
                }}
                btnText='Add School'
                // search={{
                //     onClick: () => {
                //         setShouldSearch(true);
                //     },
                //     onChange: e => setSearchState(e.target.value),
                //     value: searchState
                // }}

                search={{
                    value: schoolSearchState,
                    onChange: e => {

                        if(e.target.value.includes('\\')) {
                            return;
                        }

                        setSchoolSearchState(e.target.value)
                    },
                }}



            />
            <div className={classes['dashboard-main']}>
                {
                    !loading && allSchools && allSchools.length > 0 && <>
                        <DashBoardButtons
                            allAmount={allSchools && allSchools.length}
                            activeAmount={activeSchools && activeSchools.length}
                            blockedAmount={blockedSchools && blockedSchools.length}

                            onActive={() => {
                            setSchoolSearchState('');
                                setFilterBy('active');
                            }}
                            onAll={() => {
                            setSchoolSearchState('');
                                setFilterBy('all');
                            }}
                            onBlocked={() => {
                            setSchoolSearchState('');
                                setFilterBy('blocked');
                            }}
                            onExportTable={() => exportAsFile(filteredArray, 'school')}
                        />
                        <DashTable pagination={false && <DashBoardPagination />}>
                            <tr>
                                <th>School Name</th>
                                <th>Location</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                            {displayArray.length > 0 && displayArray.map(school => (
                                <tr key={school._id}>
                                    <td>
                                        <div>
                                            <span>
                                                {school.school_profile && <img src={school.school_profile} alt={school.school_name + ' Photo'} />}
                                                {!school.school_profile && <img src={avatar} alt={school.school_name + ' Photo'} />}
                                            </span>
                                            <h3>{school.school_name || '-'}</h3>
                                        </div>
                                    </td>
                                    <td>{school.school_location || '-'}</td>
                                    <td>{school.phoneno || '-'}</td>
                                    <td>{school.email || '-'}</td>
                                    <td>
                                        <div>
                                            {school.status === 'active' && <span className={classes['success']}>Active</span>}
                                            {school.status === 'blocked' && <span className={classes['danger']}>Blocked</span>}
                                            <i className={`${classes.dots} fas fa-ellipsis-v`} onClick={showDropdownHandler} />
                                            <Options

                                                status={school.status}

                                                onBlockUser={() => {
                                                    setModalInfo(school.school_name);
                                                    setBlockModal(true);
                                                    setDeleteId(school._id);
                                                }}

                                                onDeleteUser={() => {
                                                    setModalInfo(school.school_name);
                                                    setDelModal(true);
                                                    setDeleteId(school._id);
                                                }}

                                                onEditUser={() => {
                                                    setCrud('edit');
                                                    dispatch(getSchoolActions.resetGetSchoolState());
                                                    setDeleteId(school._id);
                                                    setShowDrawer(true);
                                                }}

                                                onActivateUser={() => {
                                                    setModalInfo(school.school_name);
                                                    setActivateModal(true);
                                                    setDeleteId(school._id);
                                                }}

                                                onViewUser={viewUserHandler}
                                                className={classes.dropdown} />
                                        </div>
                                    </td>
                                </tr>))
                            }
                        </DashTable>
                    </>
                }

                <ActivateModal
                    isModalVisible={showActivateModal}
                    onCloseModal={() => setActivateModal(false)}
                    onConfirmClick={activateUserHandler}
                    infoModal={{
                        msg: `Are you sure you want to activate ${modalInfo} Schools? Once activated, Edike Users wont be able to apply for loan with this school?`
                    }}
                />
                <BlockModal
                    isModalVisible={showBlockModal}
                    onCloseModal={() => setBlockModal(false)}
                    onConfirmClick={blockUserHandler}
                    infoModal={{
                        msg: `Are you sure you want to block ${modalInfo} Schools? Once blocked, Edike Users wont be able to apply for loan with this school?`
                    }}
                />
                <DeleteModal
                    onConfirmClick={deleteUserHandler}
                    isModalVisible={showDelModal}
                    onCloseModal={() => setDelModal(false)}
                    infoModal={{
                        msg: `Are you sure you want to block ${modalInfo} Schools? Once blocked, Edike Users wont be able to apply for loan with this school, and the details will be deleted entirely from the platform`
                    }}
                />
                <AddSchoolDrawer
                    schoolId={deleteId}
                    crudOperation={crud}
                    isDrawerVisible={showDrawer}
                    onCloseDrawer={() => setShowDrawer(false)}
                />
                {loading && <SchoolsLoadingSpinner />}
                {!loading && !allSchools && <div className={classes['dashboard-main__fallback']}>
                    <h1>No school found</h1>
                    <button
                        onClick={drawerDisplayHandler}>Click to add school</button>
                </div>}
            </div>
        </>
    );
}

export default DashBoardMain;