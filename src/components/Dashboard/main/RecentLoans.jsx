import axios from 'axios';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { approveLoanActions, loanApproval } from '../../../store/loan/approveLoanSlice';
import { declineLoanActions, loanDecline } from '../../../store/loan/declineLoanSlice';
import { EDUKE_URL } from '../../../store/url';
import { formatCurr } from '../../../utils/currencyFormater';
import Options from '../../UI/Options';
import ToastComponent from '../../UI/ToastComponent';
import LoanApproveModal from '../loan/LoanApproveModal';
import LoanDeclineModal from './LoanDeclineModal';
import classes from './RecentLoans.module.scss';

function RecentLoans({ className }) {

    const dispatch = useDispatch();

    // USESELECTOR STATES


    // const loans = useSelector(state => state.getAllLoans);
    // const { ongoingLoans, defaultedLoans, completedLoans, declinedLoans, allLoans } = useSelector(state => state.getAllLoans);


    const token = useSelector(state => state.auth.token);
    const approvedLoan = useSelector(state => state.approveLoan);
    const declinedLoan = useSelector(state => state.declineLoan);

    const navigate = useNavigate();
    // Loan status state
    const [loanStatus, setLoanStatus] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loans, setLoans] = useState(null);

    async function fetchLoans() {
        setLoading(true);
        try {
            const response = await axios({
                url: `${EDUKE_URL}/edike/api/v1/loans/admin/get-all-loans`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-admin-token': token
                }
            });

            // console.log(response.data);
            setLoading(false);
            setLoans(response.data && response.data.loans.slice(0, 5));
        } catch (err) {
            setLoading(false);
            setError(err.response && err.response.data);
        }
    }

    const memoisedFetchLoans = useCallback(fetchLoans, [token]);

    useEffect(() => {
        memoisedFetchLoans();
    }, [memoisedFetchLoans]);



    useEffect(() => {
        if ((approvedLoan.loanApprovedMsg && approvedLoan.loanApprovedMsg.length > 0) ||
            (declinedLoan.declineLoanMsg && declinedLoan.declineLoanMsg.length > 0)) {
            memoisedFetchLoans();
        }
    }, [memoisedFetchLoans, approvedLoan, declinedLoan]);

    useEffect(() => {
        let interval;

        if (error && error.length > 0) {
            toast.error(<p>{error}</p>);

            interval = setTimeout(() => {
                setError('');
            }, 5000);
        }

        return () => {
            clearTimeout(interval);
        }
    }, [error]);

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleString().split(',')[0];
    }

    const loanIdiy = 'EDI 00';



    // const [showDetail, setShowDetail] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [showDeclineModal, setDeclineModal] = useState(false);
    const [showActivateModal, setActivateModal] = useState(false);

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


    // const [placehoderName, setPlaceholderName] = useState('');
    // const [placehoderAmount, setPlaceholderAmount] = useState('');

    return (
        <>
            <LoanDeclineModal
                onCloseModal={() => setDeclineModal(false)}
                isModalVisible={showDeclineModal}
                onConfirmClick={deactivateLoanHandler}
                onCancelClick={() => setDeclineModal(false)}
                infoModal={`Are you sure you want to Decline ${''}’s loan application for ${''}?`}
            />
            <LoanApproveModal
                onCloseModal={() => setActivateModal(false)}
                isModalVisible={showActivateModal}
                onConfirmClick={() => {
                    approveLoanHandler();
                }}
                onCancelClick={() => setActivateModal(false)}
                loanInfo={{
                    user: '',
                    amount: ''
                }}
            />



            <ToastComponent />
            <div className={`${classes['recent-loans']} ${className ? className : ''}`}>
                <h2>Recent Loan Applications</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Borrower Name</th>
                            <th>Loan ID</th>
                            <th>Loan Amount</th>
                            <th>Loan Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && loans && loans.length !== 0 && loans.map((loan, index) => {
                            return (
                                <tr key={loan._id}>
                                    <td>{formatDate(loan.createdAt)}</td>
                                    <td>{loan.beneficiaryDetails[0]?.firstname} {loan.beneficiaryDetails[0]?.lastname}</td>
                                    {/* <td>Abiola Ogunjobi</td> */}
                                    <td>EDI 00{index + 1}</td>
                                    <td>{loan.beneficiary_amount && formatCurr(loan.beneficiary_amount)}</td>
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
                                            <div
                                                // onClick={e => {
                                                //     const optionsList = e.currentTarget.nextElementSibling;
                                                //     if (optionsList.style.display === 'none') {
                                                //         optionsList.style.display = 'block';
                                                //     } else {
                                                //         optionsList.style.display = 'none';
                                                //     }
                                                // }}
                                                className={classes.dots}>
                                                {/* <i className={`fas fa-ellipsis-v`} /> */}

                                                <span
                                                    style={{ marginRight: 0 }}
                                                    onClick={() => {
                                                        navigate(`/dashboard/loans/${loan.createdBy}/${loan._id}`, {
                                                            state: {
                                                                loanId: loanIdiy + (index + 1)
                                                            }
                                                        });
                                                    }}
                                                ><i className={`far fa-eye`} /></span>
                                            </div>

                                            <Options
                                                isRecent={true}
                                                className={classes['dropdown']}
                                                onViewUser={() => {
                                                    navigate(`/dashboard/loans/${loan.createdBy}/${loan._id}`, {
                                                        state: {
                                                            loanId: loanIdiy + (index + 1)
                                                        }
                                                    });
                                                }}

                                                onBlockUser={() => {
                                                    setSelectedId(loan._id);
                                                    setDeclineModal(!showDeclineModal);
                                                }}

                                                onActivateUser={() => {
                                                    setLoanStatus(loan.status);
                                                    setSelectedId(loan._id);
                                                    setActivateModal(!showActivateModal);
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default RecentLoans;