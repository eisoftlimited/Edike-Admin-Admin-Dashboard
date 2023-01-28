import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
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
import ModalDetail from '../ModalDetail';

// import MyPDF from './LoanPDF';

function LoanDetail() {

    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    const navigate = useNavigate();

    const { loanId, loanmainId } = useParams();
    const { token } = useSelector(state => state.auth);
    const userAdmin = useSelector(state => state.auth.user);
    const { loan, user } = useSelector(state => state.getSingleLoan);
    const { beneficiaryDetails, beneficiary_amount, status, beneficiary_duration, pdf, beneficiary_file_results, adminComment, riskComment } = (loan && loan[0]) || [];
    const ben = (beneficiaryDetails && beneficiaryDetails[0]) || [];
    // const secureUrl = beneficiary_file_results;

    // console.log({user});

    const { state } = useLocation();

    const dispatch = useDispatch();

    const [showActivateModal, setActivateModal] = useState(false);
    const [showDeclineModal, setDeclineModal] = useState(false);

    const [showDetailModal, setDetailModal] = useState(false);

    const [loanComment, setLoanComment] = useState('');

    const approvedLoan = useSelector(state => state.approveLoan);
    const declinedLoan = useSelector(state => state.declineLoan);


    useEffect(() => {

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


        return () => {
            clearTimeout(interval);
        }

    }, [approvedLoan, declinedLoan, dispatch]);

    // console.log({token});

    useEffect(() => {
        dispatch(singleLoan({ token, id: loanId, idMain: loanmainId }));
    }, [dispatch, token, loanId, loanmainId, status]);

    const approveLoanHandler = () => {
        setActivateModal(false);

        if (!status) {
            return;
        }

        if (status && status === 'ongoing') {
            return toast('Loan already approved');
        }

        let data = {};

        if(userAdmin && userAdmin.role === 'admin') {
            data = {
                adminComment: loanComment,
            }
        } else if(userAdmin && userAdmin.role === 'risk_management') {
            data = {
                riskComment: loanComment,
            }
        }

        dispatch(loanApproval({ token, id: loanmainId, data })).then(() => {
            navigate('/dashboard/loans');
          });
    };

    const declineLoanHandler = () => {
        setDeclineModal(false);

        // if(!token) {
        //     return;
        // }

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
            {approvedLoan.loanApprovedMsg && <ToastComponent />}
            {approvedLoan.loading && <LoadingScreen />}

            <ToastComponent />




            <DashBoardNav navTitle={`Loan Application - ${state && state.loanId}`}
                // onAddSchool={drawerDisplayHandler} 
                onOpenSidebar={openSideBarHandler}
                // btnText='Add User'
                showSearchNav={false}
            />
            <div className={classes['loan-detail']}>
                <Link to='/dashboard/loans' style={{ fontSize: '3rem', display: 'inline-block', marginBottom: '1.5rem', color: '#111' }}><i className="fas fa-long-arrow-left"></i></Link>
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
                                    <h3>{user.firstname || '-'} {user.lastname || '-'}</h3>
                                </div>
                            </td>
                            <td>1, Olaleye Street, Gbagada, La..</td>
                            <td>{user.phone || '-'}</td>
                            <td>{user.email || '-'}</td>
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
                        <span className={classes[status]}>{status ? status : ''}</span>
                    </li>
                    <li>
                        <button onClick={()=> setDetailModal(true)}>Customer Details</button>
                    </li>
                </ul>
                <h1 className={classes['loan-detail__heading']}>Bank statement PDF</h1>
                <div className={classes['loan-detail__box']}>
                    <a href={pdf} target={'_blank'} rel='noreferrer noopener' className={classes['loan-detail__box--item1']}>
                        Click to view bank statement in pdf
                    </a>
                </div>
                <h1 className={classes['loan-detail__heading']}>School bill invoice</h1>
                <div className={classes['loan-detail__box']}>
                    <img style={{width: '100%'}} src={beneficiary_file_results && beneficiary_file_results[0]?.secure_url}  alt='' />
                </div>
                <div className={classes['admin-comments']}>
                    <div className={classes['admin-comments__item']}>
                        <h1 className={classes['loan-detail__heading']}>Admin Comment</h1>
                        {adminComment && <p>{adminComment}</p>}
                    </div>
                    <div className={classes['admin-comments__item']}>
                        <h1 className={classes['loan-detail__heading']}>Risk Manager Comment</h1>
                        {riskComment && <p>{riskComment}</p>}
                    </div>
                </div>
                <h1 className={classes['loan-detail__heading']}>Admin Comment</h1>
                <div className={classes['loan-detail__box']}>
                    <div className={classes['loan-detail__box--item2']}>
                        <textarea rows={10} placeholder='Your comment' className={classes['form-comment']} value={loanComment} onChange={ e => setLoanComment(e.target.value)}  />
                    </div>
                </div>
                
                {status && status !== 'ongoing' && (<div className={classes['loan-detail__btns']}>
                    <button onClick={() => setDeclineModal(true)} type='button'>Decline</button>
                    <button onClick={() => setActivateModal(true)} type='button'>Approve</button>
                </div>)}
                {/* {userAdmin && userAdmin.role !== 'cfo' && (<div className={classes['loan-detail__btns']}>
                    <button onClick={() => setDeclineModal(true)} type='button'>Decline</button>
                    <button onClick={() => setActivateModal(true)} type='button'>Approve</button>
                </div>)} */}
                <LoanDeclineModal
                    onCloseModal={() => setDeclineModal(false)}
                    isModalVisible={showDeclineModal}
                    onConfirmClick={declineLoanHandler}
                    onCancelClick={() => setDeclineModal(false)}
                    loanInfo={{
                        user: user && `${user[0].firstname} ${user[0].lastname}`,
                        amount: beneficiary_amount
                    }}
                />
                <LoanApproveModal
                    onCloseModal={() => setActivateModal(false)}
                    isModalVisible={showActivateModal}
                    onConfirmClick={() => {
                        approveLoanHandler();
                    }}
                    onCancelClick={() => setActivateModal(false)}
                    loanInfo={{
                        user: user && `${user[0].firstname} ${user[0].lastname}`,
                        amount: beneficiary_amount
                    }}
                />

                <ModalDetail onClose={()=> setDetailModal(false)} info={user ? user[0] : {}} isModalVisible={showDetailModal} />
                
            </div>
        </>
    );
}
// user && user.length
export default LoanDetail;