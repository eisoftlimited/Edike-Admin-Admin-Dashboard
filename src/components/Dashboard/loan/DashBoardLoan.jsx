
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
import { exportFileToExcel } from '../../../utils/exportToExcel';
import { formatCurr } from '../../../utils/currencyFormater';
import DashBoardPagination from './../DashBoardPagination';




function DashBoardLoan() {
    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    // USENAVIGATE STATE
    const navigate = useNavigate();

    // DISPATCHER
    const dispatch = useDispatch();

    // USESELECTOR STATES
    const loans = useSelector(state => state.getAllLoans);
    const { ongoingLoans, defaultedLoans, completedLoans, declinedLoans, allLoans, disbursedLoans, pendingLoans, pendingAppLoans } = useSelector(state => state.getAllLoans);
    const token = useSelector(state => state.auth.token);
    const approvedLoan = useSelector(state => state.approveLoan); // approveLoan
    const declinedLoan = useSelector(state => state.declineLoan);

    // console.log({allLoans, ongoingLoans, defaultedLoans, completedLoans, declinedLoans});

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
    const [page, setPage] = useState(0);
    const [filteredArray, setFilteredArray] = useState([]);

    const { state } = useLocation();

    useEffect(() => {

        // if (state && state.loanType) {
        //     if (state.loanType === 'running') {
        //         setFilterBy('ongoing');
        //     } else if (state && state.loanType === 'completed') {
        //         setFilterBy('completed');
        //     } else if (state && state.loanType === 'settled') {
        //         setFilterBy('settled');
        //     } else if (state && state.loanType === 'default') {
        //         setFilterBy('defaulted');
        //     } else if (state && state.loanType === 'pending_disbursement') {
        //         setFilterBy('pending_disbursement');
        //     } else if (state && state.loanType === 'pending') {
        //         setFilterBy('pending');
        //     }
        // }

        if (state && state.filterType) {
            if (state.filterType === 'running') {
                document.getElementById('running')?.click();
            } else if (state && state.filterType === 'settled') {
                document.getElementById('settled')?.click();
            } else if (state && state.filterType === 'default') {
                document.getElementById('def')?.click();
            }
        }

    }, [state]);

    useEffect(() => {
        // // THIS IS FOR FILTERING BUTTON CLICK
        if (filterBy === 'all') {
            setFilteredArray(allLoans || []);
            setPage(allLoans && allLoans.length);
        } else if (filterBy === 'ongoing') {
            setFilteredArray(ongoingLoans || []);
            setPage(ongoingLoans && ongoingLoans.length);
        } else if (filterBy === 'defaulted') {
            setFilteredArray(defaultedLoans || []);
            setPage(defaultedLoans && defaultedLoans.length);
        } else if (filterBy === 'completed') {
            setFilteredArray(completedLoans || []);
            setPage(completedLoans && completedLoans.length);
        } else if (filterBy === 'declined') {
            setFilteredArray(declinedLoans || []);
            setPage(declinedLoans && declinedLoans.length);
        } else if (filterBy === 'pending_disbursement') {
            setFilteredArray(disbursedLoans || []);
            setPage(disbursedLoans && disbursedLoans.length);
        } else if (filterBy === 'pending') {
            setFilteredArray(pendingLoans || []);
            setPage(pendingLoans && pendingLoans.length);
        } else if (filterBy === 'pending_approval') {
            setFilteredArray(pendingAppLoans || []);
            setPage(pendingAppLoans && pendingAppLoans.length);
        }

    }, [filterBy, ongoingLoans, defaultedLoans, completedLoans, declinedLoans, allLoans, disbursedLoans, pendingLoans, pendingAppLoans]);


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

    // function formatDate(userDate) {

    //     const formatValue = (value) => {
    //         const tempVal = value < 10 ? `0${value}` : `${value}`;
    //         return tempVal;
    //     };

    //     const d = new Date(userDate);

    //     const year = `${d.getFullYear()}`.slice(2, 4);
    //     const month = formatValue(d.getMonth() + 1);
    //     const day = formatValue(d.getDay() + 1);

    //     return `${month}.${day}.${year}`;
    // }

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

    const loanIdiy = 'EDI/00';

    const onExportTable = () => {
        exportFileToExcel(filteredArray, 'Loans');
    };


    const [paginatedArray, setPaginatedArray] = useState([]);

    const onPageChange = e => {

        const id = e.currentTarget.id;

        const startIndex = 0;
        const endIndex = 10;

        if (id === 'next') {

            console.log({ page });

            const tempArr = filteredArray.slice(startIndex, endIndex);

            // console.log

            setPaginatedArray(tempArr);

            console.log({ paginatedArray });

        } else {

        }

        // setPage()
    };



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
                                    defaultNum={defaultedLoans && defaultedLoans.length}
                                    onDefault={() => {
                                        setFilterBy('defaulted');
                                    }}
                                    runningNum={ongoingLoans && ongoingLoans.length}
                                    onRunning={() => {
                                        setFilterBy('ongoing');
                                    }}
                                    declinedNum={declinedLoans && declinedLoans.length}
                                    onDecline={() => {
                                        setFilterBy('declined');
                                    }}

                                    pendingNum={pendingLoans && pendingLoans.length}
                                    onPending={() => {
                                        setFilterBy('pending');
                                    }}
                                    disburseNum={disbursedLoans && disbursedLoans.length}
                                    onDisburse={() => {
                                        setFilterBy('pending_disbursement');
                                    }}

                                    onComplete={() => {
                                        setFilterBy('completed');
                                    }}
                                    completeNum={completedLoans && completedLoans.length}

                                    onPendingApp={() => {
                                        setFilterBy('pending_approval');
                                    }}
                                    pendingAppNum={pendingAppLoans && pendingAppLoans.length}

                                    onExportTable={onExportTable}
                                />

                                <div className={classes.stickyHeader}>
                                    <div>Date (Start period)</div>
                                    <div>Beneficiary</div>
                                    {(filterBy === 'all' || true) && <div>Loan ID</div>}
                                    <div>Amount</div>
                                    <div style={{ textAlign: 'center' }}>Tenor</div>
                                    <div>Monthly Pymt</div>
                                    <div style={{ textAlign: 'center' }}>Paid</div>
                                    <div>Balance</div>
                                    <div>Next Pymt</div>
                                    <div>1st Due date</div>
                                    <div>2nd Due date</div>
                                    <div>3rd Due date</div>
                                    <div>Status</div>
                                    <div>Action</div>
                                </div>
                                <div className={classes.table__container}>
                                    <DashTable>
                                        <tr className={classes.loantr}>
                                            <th>Date (Start period)</th>
                                            <th>Beneficiary</th>
                                            {(filterBy === 'all' || true) && <th>Loan ID</th>}
                                            <th>User ID</th>
                                            <th>Amount</th>
                                            <th style={{ textAlign: 'center' }}>Tenor</th>
                                            <th>Monthly Pymt</th>
                                            <th style={{ textAlign: 'center' }}>Paid</th>
                                            <th>Balance</th>
                                            <th>Next Pymt</th>
                                            <th>1st Due date</th>
                                            <th>2nd Due date</th>
                                            <th>3rd Due date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        {/* {loans.allLoans && loans.allLoans.map(loan => (<tr key={loan._id} className={classes.loantr}> */}

                                        {filteredArray && filteredArray.map((loan, loanIndex) => (<tr key={loan._id} className={classes.loantr}>
                                            <td>{(loan.startsTime && formatDate(loan.startsTime)) || '-'}</td>
                                            <td>{loan.beneficiaryDetails[0]?.firstname} {loan.beneficiaryDetails[0]?.lastname}</td>

                                            {(filterBy === 'all' || true) && <td>{loan.loan_reference}</td>}
                                            <td style={{color: '#3F434A'}}>{loan?.userLoan?.[0]}</td>
                                            <td>{(loan.beneficiary_amount && formatCurr(loan.beneficiary_amount)) || '-'}</td>
                                            <td style={{ textAlign: 'center' }}>{loan.beneficiary_duration || '-'} months</td>
                                            <td>{loan.nextPayment === '---' ? '---' : (loan.nextPayment && formatCurr(loan.nextPayment)) || '-'} </td>
                                            <td style={{ textAlign: 'center' }}>{loan.accessTime && formatCurr(loan.accessTime)}</td>
                                            <td>{loan.paymentBalance && formatCurr(loan.paymentBalance)}</td>
                                            <td>{loan.paymentDate === '---' ? '---' : (loan.paymentDate && formatDate(loan.paymentDate)) || '-'}</td>
                                            <td>{loan.firstdue === '---' ? '---' : (loan.firstdue && formatDate(loan.firstdue))}</td>
                                            <td>{loan.seconddue === '---' ? '---' : (loan.seconddue && formatDate(loan.seconddue))}</td>
                                            <td>{loan.thirddue === '---' ? '---' : (loan.thirddue && formatDate(loan.thirddue))}</td>
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
                                            <td style={{ textAlign: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <div className={classes.dots}>
                                                        {false && <i className={`fas fa-ellipsis-v`} />}
                                                        <span
                                                            style={{ marginRight: 0 }}
                                                            onClick={() => {
                                                                navigate(`/dashboard/loans/${loan.createdBy}/${loan._id}`, {
                                                                    state: {
                                                                        loanId: loan.loan_reference
                                                                    }
                                                                });
                                                            }}
                                                        ><i className={`far fa-eye`} /></span>
                                                    </div>
                                                    {false && <Options
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
                                                                    loanId: loan.loan_reference
                                                                }
                                                            });
                                                        }}
                                                    />}
                                                </div>
                                            </td>
                                        </tr>))}
                                    </DashTable>
                                    {false && <DashBoardPagination onNext={onPageChange} onPrev={onPageChange} />}
                                </div>
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
                            <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '.7rem', marginTop: '.5rem' }} className={classes['dashboard-user__fallback']}>
                                <h3 style={{ fontSize: '2rem', color: '#333' }}>No Loan found</h3>
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


