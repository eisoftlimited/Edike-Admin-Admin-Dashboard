import classes from './RecentLoans.module.scss';

function RecentLoans({ className }) {
    return (
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
                    <tr>
                        <td>08/04/2022</td>
                        <td>Abiola Ogunjobi</td>
                        <td>EDI 001</td>
                        <td>N 200,000.00</td>
                        <td>
                            {true && <span className={classes.pending}>Pending</span>}
                            {false &&<span className={classes.declined}>Declined</span>}
                            {false && <span className={classes.active}>Active</span>}
                            {false && <span className={classes.default}>Default</span>}
                        </td>
                        <td><i className={`fas fa-ellipsis-v`} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default RecentLoans;