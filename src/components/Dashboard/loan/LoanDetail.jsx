import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { singleLoan } from '../../../store/loan/getLoanSlice';
import DashBoardNav from '../DashBoardNav';
import LoanApproveModal from './LoanApproveModal';
import LoanDeclineModal from './LoanDeclineModal';
import classes from './LoanDetail.module.scss';
import avatar from './../../../img/avatar.svg';
import ToastComponent from '../../UI/ToastComponent';
import LoadingScreen from '../../UI/LoadingScreen';
import { toast } from 'react-toastify';
import { declineLoanActions, loanDecline } from '../../../store/loan/declineLoanSlice';
import { approveLoanActions, loanApproval } from '../../../store/loan/approveLoanSlice';

function LoanDetail() {

    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    const { loanId, loanmainId } = useParams();
    const { token } = useSelector(state => state.auth);
    const { loan, user } = useSelector(state => state.getSingleLoan);
    const { beneficiaryDetails, beneficiary_amount, status, beneficiary_duration } = (loan && loan[0]) || [];
    const ben = (beneficiaryDetails && beneficiaryDetails[0]) || [];
    // const secureUrl = beneficiary_file_results;

    // console.log({user});



    const dispatch = useDispatch();

    const [showActivateModal, setActivateModal] = useState(false);
    const [showDeclineModal, setDeclineModal] = useState(false);

    const approvedLoan = useSelector(state => state.approveLoan);
    const declinedLoan = useSelector(state => state.declineLoan);


    useEffect(() => {
        // if (approvedLoan.error && approvedLoan.error.length > 0) {
        //     toast.error(approvedLoan.error);
        // }

        // if (approvedLoan.loanApprovedMsg && approvedLoan.loanApprovedMsg.length > 0) {
        //     toast.success(approvedLoan.loanApprovedMsg);
        // }

        // if (declinedLoan.error && declinedLoan.error.length > 0) {
        //     toast.error(declinedLoan.error);
        // }

        // if (declinedLoan.declineLoanMsg && declinedLoan.declineLoanMsg.length > 0) {
        //     toast.success(declinedLoan.declineLoanMsg);
        // }

        let interval;

        if (approvedLoan.error && approvedLoan.error.length > 0) {
            toast.error(<p>{approvedLoan.error}</p>);

            interval = setTimeout(() => {
                dispatch(approveLoanActions.resetApprovedState());
            }, 5000);
        }

        if (approvedLoan.loanApprovedMsg && approvedLoan.loanApprovedMsg.length > 0) {
            toast.success(<p>{approvedLoan.loanApprovedMsg}</p>);
            // approveLoanActions
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


        return ()=> {
            clearTimeout(interval);
        }

    }, [approvedLoan, declinedLoan, dispatch]);

    // console.log({token});

    useEffect(() => {
        dispatch(singleLoan({ token, id: loanId, idMain: loanmainId }));
    }, [dispatch, token, loanId]);

    const approveLoanHandler = () => {
        setActivateModal(false);
        dispatch(loanApproval({ token, id: loanmainId }));
    };

    const declineLoanHandler = () => {
        setDeclineModal(false);
        dispatch(loanDecline({ token, id: loanmainId }));
    };



    return (
        <>
            {/* DECLINED SCHOOLS TOAST COMPONENTS */}
            {declinedLoan.error && declinedLoan.error.length > 0 && <ToastComponent />}
            {declinedLoan.declineLoanMsg && <ToastComponent />}
            {declinedLoan.loading && <LoadingScreen />}

            {/* APPROVE LOANS TOAST COMPONENTS */}
            {approvedLoan.error && approvedLoan.error.length > 0 && <ToastComponent />}
            {approvedLoan.activateMsg && <ToastComponent />}
            {approvedLoan.loading && <LoadingScreen />}




            <DashBoardNav navTitle={`Loan Application - `}
                // onAddSchool={drawerDisplayHandler} 
                onOpenSidebar={openSideBarHandler}
                // btnText='Add User'
                showSearchNav={false}
            />
            <div className={classes['loan-detail']}>
                <h1 className={classes['loan-detail__heading']}>Customer Details</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user && user.length !== 0 && user.map(user => <tr key={user._id}>
                            <td>
                                <div>
                                    <span style={{ backgroundColor: 'transparent' }}>
                                        {user && user.profileImage ? <img src={user.profileImage} alt={user.firstname} />
                                            : <img src={null} alt='' />
                                        }
                                    </span>
                                    <h3>{user.firstname} {user.lastname}</h3>
                                </div>
                            </td>
                            <td>1, Olaleye Street, Gbagada, La..</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                        </tr>)}
                    </tbody>
                </table>
                <h1 className={classes['loan-detail__heading']}>Loan Details</h1>
                <ul>
                    <li>
                        <strong>Loan Amount</strong>
                        N {beneficiary_amount ? beneficiary_amount : 'N/A'}
                        {/* N {loan ? loan.beneficiary_amount : 'N/A'} */}
                    </li>
                    <li>
                        <strong>Beneficiary</strong>
                        {ben.firstname} {ben.lastname}
                    </li>
                    <li>
                        <strong>School</strong>
                        {ben.school}
                    </li>
                    <li>
                        <strong>Class</strong>
                        {ben.studentClass}
                    </li>
                    <li>
                        <strong>Loan Duration</strong>
                        {beneficiary_duration ? beneficiary_duration : 'N/A'} Months
                    </li>
                    <li>
                        <strong>Loan Status</strong>
                        <span>{status ? status : ''}</span>
                    </li>
                </ul>
                <div>
                    {/* <img src={null} /> */}
                </div>
                <h1 className={classes['loan-detail__heading']}>Cred Rails Report</h1>
                <div className={classes['loan-detail__box']}>
                    <div className={classes['loan-detail__box--item1']}>Credrails Report</div>
                </div>
                <h1 className={classes['loan-detail__heading']}>Admin Comment</h1>
                <div className={classes['loan-detail__box']}>
                    <div className={classes['loan-detail__box--item2']}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
                <div className={classes['loan-detail__btns']}>
                    <button onClick={() => setDeclineModal(true)} type='button'>Decline</button>
                    <button onClick={() => setActivateModal(true)} type='button'>Approve</button>
                </div>
                <LoanDeclineModal
                    onCloseModal={() => setDeclineModal(false)}
                    isModalVisible={showDeclineModal}
                    onConfirmClick={declineLoanHandler}
                    onCancelClick={() => setDeclineModal(false)}
                />
                <LoanApproveModal
                    onCloseModal={() => setActivateModal(false)}
                    isModalVisible={showActivateModal}
                    onConfirmClick={approveLoanHandler}
                    onCancelClick={() => setActivateModal(false)}
                />
            </div>
        </>
    );
}

export default LoanDetail;