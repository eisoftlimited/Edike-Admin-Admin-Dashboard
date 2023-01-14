import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { EDUKE_URL } from '../../../store/url';
import ToastComponent from '../../UI/ToastComponent';
import classes from './RecentLoans.module.scss';

function RecentLoans({ className }) {

    const token = useSelector(state => state.auth.token);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loans, setLoans] = useState(null);


    useEffect(() => {
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

        fetchLoans();
    }, [token]);

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


    return (
        <>
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
                                    <td>EDI 00{index+1}</td>
                                    <td>N {loan.beneficiary_amount}</td>
                                    <td>
                                        {loan.status === 'pending' && <span className={classes.pending}>Pending</span>}
                                        {loan.status === 'ongoing' && <span className={classes.pending}>Ongoing</span>}
                                        {loan.status === 'declined' && <span className={classes.declined}>Declined</span>}
                                        {loan.status === 'active' && <span className={classes.active}>Active</span>}
                                        {loan.status === 'default' && <span className={classes.default}>Default</span>}
                                    </td>
                                    <td><i className={`fas fa-ellipsis-v`} /></td>
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