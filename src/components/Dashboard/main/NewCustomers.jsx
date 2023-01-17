import classes from './NewCustomers.module.scss';
import avatar from './../../../img/avatar.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EDUKE_URL } from '../../../store/url';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ToastComponent from '../../UI/ToastComponent';
import { Link } from 'react-router-dom';

function NewCustomers({ className }) {

    const token = useSelector(state => state.auth.token);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [successMsg, setSuccessMsg] = useState('');
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function fetchCustomers() {

            setLoading(true);

            try {
                const response = await axios({
                    url: `${EDUKE_URL}/edike/api/v1/users/admin/get-all-customers`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-admin-token': token
                    }
                });

                setLoading(false);
                setCustomers(response.data && response.data.users.slice(0, 5));
            } catch (err) {
                setLoading(false);
                setError(err.response && err.response.data);
            }
        }

        fetchCustomers();

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

    function formatEmail(email) {
        if(email && email.length > 15) {
            return `${email.slice(0, 15)}...`;
        } 

        return email;
    }


    return (
        <>
            <ToastComponent />
            <div className={`${classes['new-customers']} ${className ? className : ''}`}>
                <h2>New Customers</h2>
                { (<table>
                    <tbody>
                        {!loading && customers && customers.length > 0 && customers.map(customer => {
                            return (
                                <tr key={customer._id}>
                                    <td>
                                        <div>
                                            {!customer.profileImage && <img src={avatar} alt='Avatar' />}
                                            {customer.profileImage && <img src={customer.profileImage} alt={customer.firstname} />}
                                            <div>
                                                <h3>{customer.firstname} {customer.lastname}</h3>
                                                <p title={customer.email}>{customer.email && formatEmail(customer.email)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>KYC {customer.status}</td>
                                    <td>
                                        <span>
                                            <Link style={{textDecoration: 'none', color: '#47B88F'}} to={`/dashboard/customers/${customer._id}`}>
                                                View
                                            </Link>
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>)}
                {!loading && customers && customers.length === 0 && <h4>No customer found</h4>}
            </div>
        </>
    );
}

export default NewCustomers;