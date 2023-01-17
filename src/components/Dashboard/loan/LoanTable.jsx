import { useNavigate } from 'react-router-dom';
import Options from '../../UI/Options';
import DashTable from '../DashTable';
import classes from './LoanTable.module.scss';

function LoanTable({
    filteredArray, 
    setLoanStatus, 
    setSelectedId, 
    setActivateModal, 
    showActivateModal, 
    setDeclineModal,
    showDeclineModal,

}) {

    const navigate = useNavigate();

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
    );
}

export default LoanTable;