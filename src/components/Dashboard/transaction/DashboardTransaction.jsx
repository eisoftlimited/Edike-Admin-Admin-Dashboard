import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { getTransactionsRequest } from '../../../store/transaction/getTransactionsSlice';
import { formatCurr } from '../../../utils/currencyFormater';
import { exportFileToExcel } from '../../../utils/exportToExcel';
import { ExportBtn } from '../DashBoardButtons';
import DashBoardNav from '../DashBoardNav';
import LoanCards from '../loan/loancards/LoanCards';
import classes from './DashTransaction.module.scss';

function DashboardTransaction() {
    const [openSideBarHandler] = useOutletContext();

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const transactions = useSelector(state => state.getAllTransactions.data);

    useEffect(() => {
        dispatch(getTransactionsRequest(token));
    }, [dispatch, token]);

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
        <div className={classes['dashboard']}>


            <DashBoardNav navTitle='Transaction Management'
                // onAddSchool={drawerDisplayHandler} 
                onOpenSidebar={openSideBarHandler}
                btnText='Add User'
                showSearchNav={false}
            />
            <LoanCards />
            <div style={{ marginBottom: '1rem' }}>
                <ExportBtn onExportTable={() => exportFileToExcel(transactions, 'Transactions')} />
            </div>
            <div className={classes.tabcontainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th style={{textAlign: 'center'}}>Customer Id</th>
                            <th style={{textAlign: 'center'}}>Loan Id</th>
                            <th>Tranx Id</th>
                            <th>Amount</th>
                            <th>Channel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions && transactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td className={classes['table-data']}>{transaction.createdAt && formatDate(transaction.createdAt)}</td>
                                <td className={classes['table-data']}>{transaction.cus_name}</td>
                                <td className={classes['table-data']} title={transaction.cus_email}>{transaction.cus_email?.slice(0, 15)}</td>
                                <td style={{textAlign: 'center'}} className={classes['table-data']}>{transaction.cus_ref}</td>
                                <td style={{textAlign: 'center'}} className={classes['table-data']}>{transaction.loan_ref}</td>
                                <td className={classes['table-data']} title={transaction.reference}>{transaction.reference?.slice(0, 10)}...</td>
                                <td className={classes['table-data']}>{transaction.amount && formatCurr(transaction.amount)}</td>
                                <td className={classes['table-data']}>Card</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardTransaction;