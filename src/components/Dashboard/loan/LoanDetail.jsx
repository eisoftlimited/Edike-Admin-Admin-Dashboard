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
import { completeLoanActions, loanComplete } from '../../../store/loan/completeLoanSlice';
import TextEditor from '../../UI/TextEditor';
import { declineDueCardActions, declineDueToCardRequest } from '../../../store/loan/declineDueToCard';
// import avatar from './../../../img/avatar.svg';
import htmlParse from 'html-react-parser';

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

    // console.log({state});

    const dispatch = useDispatch();

    const [showActivateModal, setActivateModal] = useState(false);
    const [showDeclineModal, setDeclineModal] = useState(false);
    const [showCompleteModal, setCompleteModal] = useState(false);
    const [showDeclineCardModal, setDeclineCardModal] = useState(false);

    const [showDetailModal, setDetailModal] = useState(false);
    const [loanComment, setLoanComment] = useState('');

    const approvedLoan = useSelector(state => state.approveLoan);
    const declinedLoan = useSelector(state => state.declineLoan);
    const completeLoan = useSelector(state => state.completeLoan);
    const declineDueCard = useSelector(state => state.declineDueCard);


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

        if (completeLoan.error && completeLoan.error.length > 0) {
            toast.error(<p>{completeLoan.error}</p>);

            interval = setTimeout(() => {
                dispatch(completeLoanActions.resetCompleteState());
            }, 5000);
        }

        if (completeLoan.loan && completeLoan.loan.length > 0) {
            toast.success(<p>{completeLoan.declineLoanMsg}</p>);

            interval = setTimeout(() => {
                dispatch(completeLoanActions.resetCompleteState());
            }, 5000);
        }

        // FOR DECLINE DUE TO CARD
        if (declineDueCard.data && declineDueCard.data.length > 0) {
            toast.success(<p>{declineDueCard.data}</p>);

            interval = setTimeout(() => {
                dispatch(declineDueCardActions.resetLoanDueCardState());
            }, 5000);
        }
        if (declineDueCard.error && declineDueCard.error.length > 0) {
            toast.error(<p>{declineDueCard.error}</p>);

            interval = setTimeout(() => {
                dispatch(declineDueCardActions.resetLoanDueCardState());
            }, 5000);
        }

        return () => {
            clearTimeout(interval);
        }

    }, [approvedLoan, declinedLoan, completeLoan, declineDueCard, dispatch]);

    // console.log({token});

    useEffect(() => {
        dispatch(singleLoan({ token, id: loanId, idMain: loanmainId }));
    }, [dispatch, token, loanId, loanmainId, status]);


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

    const declineLoanHandler = () => {
        setDeclineModal(false);

        if (!loanComment || loanComment.length === 0) {
            toast.info(<p>Please enter a comment to proceed.</p>)
            return;
        }
        dispatch(loanDecline({ token, id: loanmainId, message: loanComment }));
    };

    const approveLoanHandler = () => {
        setActivateModal(false);

        if (!loanComment || loanComment.length === 0) {
            toast.info(<p>Please enter a comment to proceed.</p>)
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

    const completeLoanHandler = () => {
        setCompleteModal(false);
        dispatch(loanComplete({ id: loanmainId, token })).then(() => {
            navigate('/dashboard/loans');
        });;
    };

    const declineDueCardHandler = () => {
        setDeclineCardModal(false);

        if (!loanComment || loanComment.length === 0) {
            toast.info(<p>Please enter a comment to proceed.</p>)
            return;
        }
        dispatch(declineDueToCardRequest({ token, id: loanmainId, message: loanComment }));
    }

    const actionButtons = <>
        <button className={`${classes.btn__success} ${classes.btnbtn}`} onClick={() => setActivateModal(true)} type='button'>Approve</button>
        <button className={`${classes.btn__danger} ${classes.btnbtn}`} onClick={() => setDeclineModal(true)} type='button'>Decline</button>
    </>;

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
                <Link to='/dashboard/loans' style={{ fontSize: '3rem', display: 'inline-block', marginBottom: '1.5rem', color: '#111' }}>
                    <i className="fas fa-long-arrow-left"></i>
                </Link>
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
                                <button style={{ width: 'auto' }} onClick={() => setDetailModal(true)}>Customer Details</button>
                                <div style={{ flex: 1 }} />
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
                                                <span className={classes[transaction.status]}>{transaction.status || '-'}</span>
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
                <div className={classes['loan-detail__box-img']}>
                    <a href={beneficiary_file_results && beneficiary_file_results[0]?.secure_url} target={'_blank'} rel='noreferrer noopener' >
                        <h1 className={classes['loan-detail__heading']}>Click to view school bill invoice</h1>
                        <img src={beneficiary_file_results && beneficiary_file_results[0]?.secure_url} alt='' />
                    </a>
                </div>
                <div className={classes['admin-comments']}>
                    {userAdmin && userAdmin.role !== 'admin' && (<div className={classes['admin-comments__item']}>
                        <h1 className={classes['loan-detail__heading']}>Admin Comment</h1>
                        {adminComment && <div dangerouslySetInnerHTML={{ __html: htmlParse(adminComment) }}></div>}
                    </div>)}
                    {(userAdmin && (userAdmin.role !== 'admin' && userAdmin.role !== 'risk_management')) && (<div className={classes['admin-comments__item']}>
                        <h1 className={classes['loan-detail__heading']}>Risk Manager Comment</h1>
                        {riskComment && <div dangerouslySetInnerHTML={{ __html: htmlParse(riskComment) }}></div>}
                    </div>)}
                    {/* This is for cfo */}
                    {userAdmin && (<div className={classes['admin-comments__item']}>
                        <h1 className={classes['loan-detail__heading']}>CFO</h1>
                        {cComment && <div dangerouslySetInnerHTML={{ __html: htmlParse(cComment) }}></div>}
                    </div>)}
                </div>
                {/* Fo ongoing, defaulted and completed status, comment box should not show. */}
                {/* APPROVE SECTION */}
                {(status && status !== 'ongoing' && status !== 'defaulted' && status !== 'completed' && status !== 'declinedd') && (
                    <>
                        <h1 className={classes['loan-detail__heading']}>Comment</h1>
                        <div className={classes['loan-detail__box']}>
                            <div className={classes['loan-detail__box--item2']}>
                                <TextEditor onChange={setLoanComment} />
                            </div>
                        </div>
                    </>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/*  */}
                    {(status && (status === 'pending' || status === 'pending_approval' || status === 'pending_disbursement') && status !== 'declined') ? <>
                        {actionButtons}

                    </> : status === 'ongoing' && null}



                    {/* <button className={classes.btn__success} onClick={() => setActivateModal(true)} type='button'>Approve</button> */}



                    {(status && ((status === 'ongoing' || status === 'defaulted') && status !== 'declined') && userAdmin && userAdmin.role === 'cfo') &&
                        <button className={`${classes.btn__info} ${classes.btnbtn}`}
                            onClick={() => setCompleteModal(true)} type='button'>Complete</button>}
                    {(userAdmin && userAdmin.role === 'cfo') && (status && status !== 'declined') &&
                        <button style={{ width: 'auto' }}
                            className={`${classes.btn__danger} ${classes.btnbtn}`}
                            onClick={() => setDeclineCardModal(true)} type='button'>Decline due to card</button>}

                </div>

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
                {/* THIS IS FOR COMPLETED LOANS */}
                <LoanDeclineModal
                    isComplete={true}
                    onCloseModal={() => setCompleteModal(false)}
                    isModalVisible={showCompleteModal}
                    onConfirmClick={completeLoanHandler}
                    onCancelClick={() => setCompleteModal(false)}
                    loanInfo={{
                        user: user && `${user[0].firstname} ${user[0].lastname}`,
                        amount: beneficiary_amount && formatCurr(beneficiary_amount)
                    }}
                />

                {/* THIS IS FOR DECLINE DUE TO CARD. */}
                <LoanDeclineModal
                    onCloseModal={() => setDeclineCardModal(false)}
                    isModalVisible={showDeclineCardModal}
                    onConfirmClick={declineDueCardHandler}
                    onCancelClick={() => setDeclineCardModal(false)}
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