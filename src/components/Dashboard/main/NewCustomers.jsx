import classes from './NewCustomers.module.scss';
import avatar from './../../../img/avatar.svg';

function NewCustomers({ className }) {
    return (
        <div className={`${classes['new-customers']} ${className ? className : ''}`}>
            <h2>New Customers</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div>
                            <img src={avatar} alt='' />
                            <div>
                                <h3>Abiola Ogunjobi</h3>
                                <p>abiogunjobi@gmail.com</p>
                            </div>
                            </div>
                        </td>
                        <td>KYC Ongoing</td>
                        <td>
                            <span>View</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default NewCustomers;