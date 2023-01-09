import DashBoardNav from '../DashBoardNav';
import classes from './CustomerDetail.module.scss';
import { useOutletContext, useParams } from 'react-router-dom';
import avatar from './../../../img/avatar.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { singleCustomer } from '../../../store/realCustomers/getSingleCustomerSlice';

function CustomerDetail() {
    // getSingleLoan
    const singleLoan = useSelector(state => state.getSingleLoan);
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {customerId} = useParams();


    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    useEffect(()=> {
        dispatch(singleCustomer({token, id: customerId}));
    }, [dispatch, token, customerId]);


    return (
        <>
            <DashBoardNav navTitle='Customers - Customer Name'
                // onAddSchool={drawerDisplayHandler} 
                onOpenSidebar={openSideBarHandler}
                btnText='Add User'
                showSearchNav={false}
            />
            <div className={classes['customer-detail']}>
                <div className={classes['customer-detail__inner']}>

                    <div className={classes['customer-detail__group']}>
                        <h1 className={classes['customer-detail__heading']}>Customer Details</h1>
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
                                <tr>
                                    <td>
                                        <div className={classes['td__fullname']}>
                                            {false ? <img src={avatar} alt={'User Avatar'} /> : <img src={avatar} alt={'User Avatar'} />}
                                            <h3>Abiola Ogunjobi</h3>
                                        </div>
                                    </td>
                                    <td>1, Olaleye Street, Gbagada, La..</td>
                                    <td>+234 812 345 6789</td>
                                    <td>abiola@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={classes['customer-detail__group']}>
                        <h1 className={classes['customer-detail__heading']}>Beneficiaries</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>School</th>
                                    <th>Class</th>
                                    <th>Date Of Birth</th>
                                    <th>Gender</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={classes['td__fullname']}>
                                            {false ? <img src={avatar} alt={'User Avatar'} /> : <img src={avatar} alt={'User Avatar'} />}
                                            <h3>Abiola Ogunjobi</h3>
                                        </div>
                                    </td>
                                    <td>1, Olaleye Street, Gbagada, La..</td>
                                    <td>Basic 2</td>
                                    <td>17th July 2023</td>
                                    <td>Male</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={classes['customer-detail__group']}>
                        <h3 className={classes['customer-detail__heading']}>Loan</h3>
                        <table className={classes.loan__table}>
                            <thead>
                                <tr>
                                    <th>Loan Id</th>
                                    <th>Beneficiary</th>
                                    <th>School</th>
                                    <th>Class</th>
                                    <th>Loan Amount</th>
                                    <th>Loan Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#EDI-123</td>
                                    <td>Tiaraoluwa Ogunjobi</td>
                                    <td>Elbethel Schools</td>
                                    <td>Basic 3</td>
                                    <td>N 100,000</td>
                                    <td><span className={classes['active-loan']}>Active</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={classes['customer-detail__group']}>
                        <h3 className={classes['customer-detail__heading']}>Transactions</h3>
                        <table className={classes.loan__table}>
                            <thead>
                                <tr>
                                    <th>Transaction Id</th>
                                    <th>Transaction Type</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#EDI-123</td>
                                    <td>Loan Repayment</td>
                                    <td>Matured Loan Repayment</td>
                                    <td>N 30,000.00</td>
                                    <td><span className={classes['active-loan']}>Successful</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerDetail;