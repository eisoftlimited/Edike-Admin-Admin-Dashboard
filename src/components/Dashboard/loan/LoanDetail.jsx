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
import { formatCurr } from '../../../utils/currencyFormater';
import NotFoundPlaceholder from '../user/NotFoundPlaceholder';
// import avatar from './../../../img/avatar.svg';

// import MyPDF from './LoanPDF';

function LoanDetail() {

    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    const navigate = useNavigate();

    const { loanId, loanmainId } = useParams();
    const { token } = useSelector(state => state.auth);
    const userAdmin = useSelector(state => state.auth.user);
    const { loan, user, transaction } = useSelector(state => state.getSingleLoan);
    const { beneficiaryDetails, beneficiary_amount, status, beneficiary_duration, pdf, beneficiary_file_results, adminComment, riskComment, cComment, nextPayment, paymentDate, totalPayback } = (loan && loan[0]) || [];
    const ben = (beneficiaryDetails && beneficiaryDetails[0]) || [];
    const txtions = transaction || [];
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

        if (userAdmin && userAdmin.role === 'admin') {
            data = {
                adminComment: loanComment,
            }
        } else if (userAdmin && userAdmin.role === 'risk_management') {
            data = {
                riskComment: loanComment,
            }
        } else if (userAdmin && userAdmin.role === 'cfo') {
            data = {
                cComment: loanComment
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
                            <td>{user.residence_address || '-'}</td>
                            <td>{user.phone || '-'}</td>
                            <td>{user.email || '-'}</td>
                        </tr>)}
                    </tbody>
                </table>
                <div className={classes.new}>
                    <div>
                        <h1 className={classes['loan-detail__heading']}>Loan Details</h1>
                        <ul>
                            <li>
                                <strong>Loan Amount</strong>
                                {beneficiary_amount ? formatCurr(beneficiary_amount) : 'N/A'}
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
                                <strong>Loan Tenor</strong>
                                {beneficiary_duration ? beneficiary_duration : 'N/A'} Months
                            </li>
                            <li>
                                <strong>Monthly Repayment</strong>
                                {nextPayment && formatCurr(nextPayment)}
                            </li>
                            <li>
                                <strong>Next Repayment Date</strong>
                                {formatDate && formatDate(paymentDate)}
                            </li>
                            <li>
                                <strong>Total Repayment</strong>
                                {totalPayback && formatCurr(totalPayback)}
                            </li>
                            <li>
                                <strong>Loan Status</strong>
                                <span className={classes[status]}>{status ? status : ''}</span>
                            </li>
                            <li>
                                <button onClick={() => setDetailModal(true)}>Customer Details</button>
                            </li>
                        </ul>
                    </div>
                    <div className={classes['customer-detail__group']}>
                        <h3 className={classes['customer-detail__heading']}>Transactions</h3>
                        {txtions && txtions.length > 0 && (<table className={classes.loan__table}>
                            <thead>
                                <tr>
                                    <th>Transaction Date</th>
                                    <th>Transaction Type</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {txtions.map((transaction, index) => {
                                    return (
                                        <tr key={transaction._id}>
                                            <td>{(transaction.createdAt && new Date(transaction.createdAt).toDateString()) || '-'}</td>
                                            <td>{transaction.channel || '-'}</td>
                                            <td>{transaction.amount === 5000 ? 'Card Tokenization' : 'Matured Loan Repayment'}</td>
                                            <td>{transaction.amount && formatCurr(parseInt(transaction.amount / 100, 10))}</td>
                                            <td>
                                                <span className={classes['active-loan']}
                                                    style={{ backgroundColor: `${transaction.status !== 'success' && 'rgba(255, 52, 54, .1)'}`, color: `${transaction.status !== 'success' && '#FF3436'}` }}
                                                >{transaction.status || '-'}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>)}
                        {txtions && txtions.length === 0 && <NotFoundPlaceholder title='Transactions to Display'>No transaction carried out on this loan.</NotFoundPlaceholder>}
                    </div>
                </div>
                <h1 className={classes['loan-detail__heading']}>Bank statement PDF</h1>
                <div className={classes['loan-detail__box']}>
                    <a href={pdf} target={'_blank'} rel='noreferrer noopener' className={classes['loan-detail__box--item1']}>
                        Click to view bank statement in pdf
                    </a>
                </div>
                <h1 className={classes['loan-detail__heading']}>School bill invoice</h1>
                <div className={classes['loan-detail__box-img']}>
                    <a href={beneficiary_file_results && beneficiary_file_results[0]?.secure_url} download='school-bill'>
                        <img src={beneficiary_file_results && beneficiary_file_results[0]?.secure_url} alt='' />
                    </a>
                </div>
                <div className={classes['admin-comments']}>
                    {userAdmin && userAdmin.role !== 'admin' && (<div className={classes['admin-comments__item']}>
                        <h1 className={classes['loan-detail__heading']}>Admin Comment</h1>
                        {adminComment && <p>{adminComment}</p>}
                    </div>)}
                    {(userAdmin && (userAdmin.role !== 'admin' && userAdmin.role !== 'risk_management')) && (<div className={classes['admin-comments__item']}>
                        <h1 className={classes['loan-detail__heading']}>Risk Manager Comment</h1>
                        {riskComment && <p>{riskComment}</p>}
                    </div>)}
                    {/* This is for cfo */}
                    {userAdmin && (<div className={classes['admin-comments__item']}>
                        <h1 className={classes['loan-detail__heading']}>CFO</h1>
                        {cComment && <p>{cComment}</p>}
                    </div>)}
                </div>

                {/* @RESTRICTED TO ADMIN AND RISK BEFORE */}
                {/* {userAdmin && userAdmin.role !== 'cfo' && ( */}
                {status && status !== 'ongoing' && (
                    <>
                        <h1 className={classes['loan-detail__heading']}>Your Comment</h1>
                        <div className={classes['loan-detail__box']}>
                            <div className={classes['loan-detail__box--item2']}>
                                <textarea rows={10} placeholder='Your comment' className={classes['form-comment']} value={loanComment} onChange={e => setLoanComment(e.target.value)} />
                            </div>
                        </div>
                    </>
                )}
                {/* )} */}
                {/* @END */}

                {status && status !== 'ongoing' && (<div className={classes['loan-detail__btns']}>
                    <button onClick={() => setDeclineModal(true)} type='button'>Decline</button>
                    <button onClick={() => setActivateModal(true)} type='button'>Approve</button>
                </div>)}
                <LoanDeclineModal
                    onCloseModal={() => setDeclineModal(false)}
                    isModalVisible={showDeclineModal}
                    onConfirmClick={declineLoanHandler}
                    onCancelClick={() => setDeclineModal(false)}
                    loanInfo={{
                        user: user && `${user[0].firstname} ${user[0].lastname}`,
                        amount: beneficiary_amount && formatCurr(beneficiary_amount)
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
                        amount: beneficiary_amount && formatCurr(beneficiary_amount)
                    }}
                />

                <ModalDetail onClose={() => setDetailModal(false)} info={user ? user[0] : {}} isModalVisible={showDetailModal} />

            </div>
        </>
    );
}
// user && user.length
export default LoanDetail;