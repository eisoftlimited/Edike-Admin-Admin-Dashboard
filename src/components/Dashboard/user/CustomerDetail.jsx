import DashBoardNav from '../DashBoardNav';
import classes from './CustomerDetail.module.scss';
import { useOutletContext, useParams } from 'react-router-dom';
import avatar from './../../../img/avatar.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { singleCustomer } from '../../../store/realCustomers/getSingleCustomerSlice';
import { useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../../UI/LoadingScreen';

function CustomerDetail() {
    // getSingleLoan
    // const singleLoan = useSelector(state => state.getSingleLoan);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // states
    const [all, setAll] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [customer, setCustomer] = useState(null);
    const [loan, setLoan] = useState(null);
    const [beneficiary, setBeneficiary] = useState(null);

    const { customerId } = useParams();

    // console.log({ all, loading, error, loan, customer, beneficiary });


    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    useEffect(() => {
        // dispatch(singleCustomer({token, id: customerId}));

        async function getOneCustomer() {

            setLoading(true);

            try {
                const response = await axios({
                    url: `https://edikeatadmin.onrender.com/edike/api/v1/users/admin/get-a-customer/${customerId}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-admin-token': token
                    }
                });

                setLoading(false);
                setAll(response.data.all);

                setBeneficiary(response.data.all[1].beneficiary);
                setCustomer(response.data.all[0].user);
                setLoan(response.data.all[2].loan);


            } catch (err) {
                setLoading(false);
                setError(err.response.data.msg);
            }
        }

        getOneCustomer();

    }, [token, customerId]);


    return (
        <>
            {loading && <LoadingScreen />}
            <DashBoardNav navTitle={`Customer - ${customer && customer.firstname} ${customer && customer.lastname}`}
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
                                            {customer && customer.profileImage ? <img src={customer.profileImage} alt={'User Avatar'} /> : <img src={avatar} alt={'User Avatar'} />}
                                            <h3>{customer && customer.firstname} {customer && customer.lastname}</h3>
                                        </div>
                                    </td>
                                    <td>{customer && customer.residence_address}</td>
                                    <td>{customer && customer.phone}</td>
                                    <td>{customer && customer.email}</td>
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
                                {beneficiary && beneficiary.map(ben => {
                                    return (
                                        <tr key={ben._id}>
                                            <td>
                                                <div className={classes['td__fullname']}>
                                                    {ben.beneficiaryImage ? <img src={ben.beneficiaryImage} alt={'User Avatar'} /> : <img src={avatar} alt={'User Avatar'} />}
                                                    <h3>{ben.firstname} {ben.lastname}</h3>
                                                </div>
                                            </td>
                                            <td>{ben.school}</td>
                                            <td>{ben.studentClass}</td>
                                            <td>
                                                {/* 17th July 2023  */}
                                                {ben.dob}
                                                {/* {new Date('22/2/2019').toLocaleString()} */}
                                            </td>
                                            <td>Male</td>
                                        </tr>
                                    );
                                })}
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
                                {loan && loan.map(ln => {
                                    return (
                                        <tr key={ln._id}>
                                            <td>#EDI-123</td>
                                            <td>{ln?.beneficiaryDetails[0]?.firstname} {ln?.beneficiaryDetails[0]?.lastname}</td>
                                            <td>{ln?.beneficiaryDetails[0]?.school}</td>
                                            <td>{ln?.beneficiaryDetails[0]?.studentClass}</td>
                                            <td>N {ln.beneficiary_amount}</td>
                                            <td>
                                                {/* <span className={classes['active-loan']}>Active</span> */}
                                                <span className={classes['active-loan']}>{ln.status}</span>

                                            </td>
                                        </tr>
                                    );
                                })}
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