
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { approveLoanActions, loanApproval } from '../../../store/loan/approveLoanSlice';
import { declineLoanActions, loanDecline } from '../../../store/loan/declineLoanSlice';
import { loanManagement } from '../../../store/loan/getAllLoansSlice';
import LoadingScreen from '../../UI/LoadingScreen';
import Options from '../../UI/Options';
import ToastComponent from '../../UI/ToastComponent';
import DashBoardNav from '../DashBoardNav';
import SchoolsLoadingSpinner from '../schools/SchoolsLoadingSpinner';
import DashTable from './../DashTable';
import classes from './DashBoardLoan.module.scss';
import LoanApproveModal from './LoanApproveModal';
import LoanDeclineModal from './LoanDeclineModal';
import LoanDetail from './LoanDetail';
import LoanNav from './LoanNav';
import LoanCards from './loancards/LoanCards';




function DashBoardLoan() {
    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    const { state } = useLocation();


    useEffect(() => {

        if (state && state.loanType) {
            if (state.loanType === 'running') {
                console.log('Running');
            } else if (state && state.loanType === 'settled') {
                console.log('Settled');
            } else if (state && state.loanType === 'default') {
                console.log('Default');
            }
        }

    }, [state]);

    // USENAVIGATE STATE
    const navigate = useNavigate();

    // DISPATCHER
    const dispatch = useDispatch();

    // USESELECTOR STATES
    const loans = useSelector(state => state.getAllLoans);
    const { ongoingLoans, pendingLoans, completedLoans, declinedLoans, allLoans } = useSelector(state => state.getAllLoans);
    const token = useSelector(state => state.auth.token);
    const approvedLoan = useSelector(state => state.approveLoan); // approveLoan
    const declinedLoan = useSelector(state => state.declineLoan);

    // console.log({allLoans, ongoingLoans, pendingLoans, completedLoans, declinedLoans});

    // TOGGLE ALL AND DETAIL STATE
    const [showDetail, setShowDetail] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [showDeclineModal, setDeclineModal] = useState(false);
    const [showActivateModal, setActivateModal] = useState(false);

    // Loan status state
    const [loanStatus, setLoanStatus] = useState('');

    // console.log({selectedId});

    // FILTER LOGIC
    const [filterBy, setFilterBy] = useState('all');
    const [filteredArray, setFilteredArray] = useState([]);

    useEffect(() => {
        // // THIS IS FOR FILTERING BUTTON CLICK
        if (filterBy === 'all') {
            setFilteredArray(allLoans || []);
        } else if (filterBy === 'ongoing') {
            setFilteredArray(ongoingLoans || []);
        } else if (filterBy === 'pending') {
            setFilteredArray(pendingLoans || []);
        } else if (filterBy === 'completed') {
            setFilteredArray(completedLoans || []);
        } else if (filterBy === 'declined') {
            setFilteredArray(declinedLoans || []);
        }

    }, [filterBy, ongoingLoans, pendingLoans, completedLoans, declinedLoans, allLoans]);


    const approveLoanHandler = () => {
        setActivateModal(false);
        if (loanStatus === 'ongoing') {
            return toast('Loan already approved');
        }
        dispatch(loanApproval({ token, id: selectedId }));
    };

    const deactivateLoanHandler = () => {
        setDeclineModal(false);
        dispatch(loanDecline({ token, id: selectedId }));
    };

    useEffect(() => {

        let interval;

        if (approvedLoan.error && approvedLoan.error.length > 0) {
            toast.error(<p>{approvedLoan.error}</p>);

            interval = setTimeout(() => {
                dispatch(approveLoanActions.resetApprovedState());
            }, 5000);
        }

        if (approvedLoan.loanApprovedMsg && approvedLoan.loanApprovedMsg.length > 0) {
            // console.log('Working...', approvedLoan.loanApprovedMsg);
            toast.success(<p>{approvedLoan.loanApprovedMsg}</p>);
            interval = setTimeout(() => {
                dispatch(approveLoanActions.resetApprovedState());
            }, 5000);
        }

        if (declinedLoan.error && declinedLoan.error.length > 0) {
            toast.error(<p>{declinedLoan.error}</p>);

            interval = setTimeout(() => {
                dispatch(declineLoanActions.resetDeclineState());
            }, 5000);
        }

        if (declinedLoan.declineLoanMsg && declinedLoan.declineLoanMsg.length > 0) {
            toast.success(<p>{declinedLoan.declineLoanMsg}</p>);

            interval = setTimeout(() => {
                dispatch(declineLoanActions.resetDeclineState());
            }, 5000);
        }


        return () => {
            clearTimeout(interval);
        }

    }, [approvedLoan, declinedLoan, dispatch]);

    useEffect(() => {
        dispatch(loanManagement(token));
    }, [dispatch, token]);

    useEffect(() => {
        if ((approvedLoan.loanApprovedMsg && approvedLoan.loanApprovedMsg.length > 0) ||
            (declinedLoan.declineLoanMsg && declinedLoan.declineLoanMsg.length > 0)) {
            dispatch(loanManagement(token));
        }
    }, [dispatch, token, approvedLoan, declinedLoan]);

    // console.log({ filterBy, filteredArray });

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

    const loanIdiy = 'EDI 00';

    return (
        <>
            {/* DECLINED SCHOOLS TOAST COMPONENTS */}
            {declinedLoan.error && declinedLoan.error.length > 0 && <ToastComponent />}
            {declinedLoan.declineLoanMsg && <ToastComponent />}
            {declinedLoan.loading && <LoadingScreen />}

            {/* APPROVE LOANS TOAST COMPONENTS */}
            {approvedLoan.error && approvedLoan.error.length > 0 && <ToastComponent />}
            {approvedLoan.loanApprovedMsg && <ToastComponent />}
            {approvedLoan.loading && <LoadingScreen />}
            <ToastComponent />

            <DashBoardNav navTitle='Loan Management'
                // onAddSchool={drawerDisplayHandler} 
                onOpenSidebar={openSideBarHandler}
                btnText='Add User'
                showSearchNav={false}
            />
            <div className={classes['dashboard']}>
                {!showDetail && <>
                    <LoanCards />
                    <div style={{ position: 'relative' }}>
                        {!loans.loading && loans.allLoans &&
                            <>
                                <LoanNav
                                    activeBtn={filterBy}
                                    allNum={allLoans && allLoans.length}
                                    onAll={() => {
                                        setFilterBy('all');
                                    }}
                                    defaultNum={pendingLoans && pendingLoans.length}
                                    onDefault={() => {
                                        setFilterBy('pending');
                                    }}
                                    runningNum={ongoingLoans && ongoingLoans.length}
                                    onRunning={() => {
                                        setFilterBy('ongoing');
                                    }}
                                    declinedNum={declinedLoans && declinedLoans.length}
                                    onDecline={() => {
                                        setFilterBy('declined');
                                    }}
                                />
                                <DashTable>
                                    <tr className={classes.loantr}>
                                        <th>Date</th>
                                        <th>Borrower Name</th>
                                        <th>Loan ID</th>
                                        <th>Loan Amount</th>
                                        <th>KYC Status</th>
                                        <th>Loan Status</th>
                                        <th>Action</th>
                                    </tr>
                                    {/* {loans.allLoans && loans.allLoans.map(loan => (<tr key={loan._id} className={classes.loantr}> */}
                                    {filteredArray && filteredArray.map((loan, loanIndex) => (<tr key={loan._id} className={classes.loantr}>
                                        <td>{loan.createdAt && formatDate(loan.createdAt)}</td>
                                        <td>{loan.beneficiaryDetails[0]?.firstname} {loan.beneficiaryDetails[0]?.lastname}</td>
                                        <td>{loanIdiy + (loanIndex + 1)}</td>
                                        <td>N {loan.beneficiary_amount}</td>
                                        <td>KYC Complete</td>
                                        <td>
                                            {loan.status === 'active' && <span className={classes['success']}>Active</span>}
                                            {loan.status === 'pending' && <span className={classes['pending']}>Pending</span>}
                                            {loan.status === 'pending_approval' && <span style={{ height: '3.3rem', color: '#fafafa', backgroundColor: 'rgba(0,0,255,.6)' }}
                                            // className={classes['pending']}
                                            >Pending Approval</span>}
                                            {loan.status === 'declined' && <span className={classes['danger']}>Declined</span>}
                                            {loan.status === 'ongoing' && <span className={classes['pending']}>Ongoing</span>}
                                            {loan.status === 'completed' && <span className={classes['success']}>Completed</span>}
                                            {/* {loan.status === 'completed' && <span style={{ color: '#fafafa', backgroundColor: 'rgba(0, 255, 0, .6)' }}>Completed</span>} */}
                                            {loan.status === 'defaulted' && <span className={classes['defaulted']}>Defaulted</span>}
                                            {loan.status === 'pending_disbursement' && <span className={classes['pending_disbursement']}>Pending Disbursement</span>}
                                        </td>
                                        <td>
                                            <div>
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
                                                    isLoan={true}
                                                    status={loan.status}
                                                    className={classes.dropdown}
                                                    onActivateUser={() => {
                                                        setLoanStatus(loan.status);
                                                        setSelectedId(loan._id);
                                                        setActivateModal(!showActivateModal);
                                                    }}
                                                    onBlockUser={() => {
                                                        setSelectedId(loan._id);
                                                        setDeclineModal(!showDeclineModal);
                                                    }}

                                                    onViewUser={() => {
                                                        navigate(`/dashboard/loans/${loan.createdBy}/${loan._id}`, {
                                                            state: {
                                                                loanId: loanIdiy + (loanIndex + 1)
                                                            }
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>))}
                                </DashTable>
                            </>
                        }

                        {/* {filteredArray && filteredArray.length === 0 &&
                            <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '.7rem', marginTop: '.5rem'}}>
                                <h3 style={{fontSize: '2rem', color: '#333'}}>No loan found</h3>
                            </div>
                        } */}

                        <LoanDeclineModal
                            onCloseModal={() => setDeclineModal(false)}
                            isModalVisible={showDeclineModal}
                            onConfirmClick={() => {
                                deactivateLoanHandler();
                            }}
                            onCancelClick={() => setDeclineModal(false)}
                        />
                        <LoanApproveModal
                            onConfirmClick={() => {
                                approveLoanHandler();
                            }}
                            onCancelClick={() => setActivateModal(false)}
                            onCloseModal={() => setActivateModal(false)}
                            isModalVisible={showActivateModal}
                        />

                        {loans.loading && <SchoolsLoadingSpinner />}
                        {((!loans.loading && !loans.allLoans) || (filteredArray && filteredArray.length === 0)) &&
                            <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '.7rem', marginTop: '.5rem'}} className={classes['dashboard-user__fallback']}>
                                <h3 style={{fontSize: '2rem', color: '#333'}}>No Loan found</h3>
                            </div>
                        }
                    </div>
                </>}

                {showDetail && <LoanDetail />}
            </div>
        </>
    );
}

export default DashBoardLoan;


