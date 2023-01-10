
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
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
import nairaOrange from './../../../img/nairaOrange.svg';
import nairaGreen from './../../../img/nairaGreen.svg';
import nairaRed from './../../../img/nairaRed.svg';

function LoanCard({ state, image }) {
    return (
        <div className={classes['dashboard-loan']}>
            <span className={classes['dashboard-loan__label']}>Running Loans</span>
            <p className={`${classes['dashboard-loan__amount']} ${classes['dashboard-loan__amount--' + state]}`}>N 10,000,000</p>
            <div className={classes['dashboard-loan__icon-box']}>
                <img src={image} alt='' />
            </div>

        </div>
    );
}

function DashBoardLoan() {
    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

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
            console.log('Working...', approvedLoan.loanApprovedMsg);
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

    console.log({ filterBy, filteredArray });

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

            <DashBoardNav navTitle='Loan Management'
                // onAddSchool={drawerDisplayHandler} 
                onOpenSidebar={openSideBarHandler}
                btnText='Add User'
                showSearchNav={false}
            />
            <div className={classes['dashboard']}>
                {!showDetail && <>
                    <div className={classes['dashboard-loan__container']}>
                        <LoanCard state={'running'} image={nairaOrange} />
                        <LoanCard state={'settled'} image={nairaGreen} />
                        <LoanCard state={'default'} image={nairaRed} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        {!loans.loading && loans.allLoans &&
                            <>
                                <LoanNav
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
                                    onDecline={()=> {
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
                                    {filteredArray && filteredArray.map(loan => (<tr key={loan._id} className={classes.loantr}>
                                        <td>08/04/2022</td>
                                        <td>{loan.beneficiaryDetails[0]?.firstname} {loan.beneficiaryDetails[0]?.lastname}</td>
                                        <td>EDI 001</td>
                                        <td>N {loan.beneficiary_amount}</td>
                                        <td>KYC Complete</td>
                                        <td>
                                            {false && <span className={classes['success']}>Active</span>}
                                            {loan.status === 'pending' && <span className={classes['pending']}>Pending</span>}
                                            {loan.status === 'pending_approval' && <span style={{ height: '3.3rem', color: '#fafafa', backgroundColor: 'rgba(0,0,255,.6)' }}
                                            // className={classes['pending']}
                                            >Pending Approval</span>}
                                            {loan.status === 'declined' && <span className={classes['danger']}>Declined</span>}
                                            {loan.status === 'ongoing' && <span className={classes['pending']}>Ongoing</span>}
                                            {loan.status === 'completed' && <span
                                                style={{ color: '#fafafa', backgroundColor: 'rgba(0, 255, 0, .6)' }}
                                            // className={classes['pending']}
                                            >Completed</span>}
                                            {loan.status === 'pending_disbursement' && <span
                                                style={{ height: '3.3rem', width: '10rem', color: '#fafafa', backgroundColor: '#964B00', }}
                                            // className={classes['pending']}
                                            >Pending Disbursement</span>}
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
                                                        setSelectedId(loan._id);
                                                        setActivateModal(!showActivateModal);
                                                    }}
                                                    onBlockUser={() => {
                                                        setSelectedId(loan._id);
                                                        setDeclineModal(!showDeclineModal);
                                                    }}

                                                    onViewUser={() => {
                                                        navigate(`/dashboard/loans/${loan.createdBy}/${loan._id}`);
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>))}
                                </DashTable>
                            </>
                        }

                        <LoanDeclineModal
                            onCloseModal={() => setDeclineModal(false)}
                            isModalVisible={showDeclineModal}
                            onConfirmClick={deactivateLoanHandler}
                            onCancelClick={() => setDeclineModal(false)}
                        />
                        <LoanApproveModal
                            onConfirmClick={approveLoanHandler}
                            onCancelClick={() => setActivateModal(false)}
                            onCloseModal={() => setActivateModal(false)}
                            isModalVisible={showActivateModal}
                        />

                        {loans.loading && <SchoolsLoadingSpinner />}
                        {!loans.loading && !loans.allLoans &&
                            <div className={classes['dashboard-user__fallback']}>
                                <h1>No Loan found</h1>
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


