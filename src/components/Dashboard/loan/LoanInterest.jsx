import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EDUKE_URL } from '../../../store/url';
import ToastComponent from '../../UI/ToastComponent';
import DashBoardNav from '../DashBoardNav';
import classes from './LoanInterest.module.scss'

function LoanInterest() {
    // THE OUTLET CONTEXT STATE
    const [openSideBarHandler] = useOutletContext();

    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState('');
    const [postData, setPostData] = useState(0);

    const [loanRate, setLoanRate] = useState('');


    const token = useSelector(state => state.auth.token);

    async function getLoanRequest() {
        try {
            const response = await axios({
                url: `${EDUKE_URL}/edike/api/v1/percentage/getrate`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-admin-token': token
                }
            });
            // console.log(response.data);
            setPostData(response.data.rate);
        } catch (err) {
            console.log(err.response.data);
        }
    }

    
    const [historyLoading, setHistoryLoading] = useState(false);
    const [historyError, setHistoryError] = useState('');
    const [historyData, setHistoryData] = useState([]);

    async function getLoanHistory() {
        setHistoryLoading(true);
        try {
            const response = await axios({
                url: `${EDUKE_URL}/edike/api/v1/percentage/gethistory`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-admin-token': token
                }
            });

            setHistoryData(response.data.history);

        } catch(err) {

            console.log(err.response.data);
            if(err.response && err.response.data) {
                setHistoryError();
            }
        }
    }

    useEffect(() => {
        getLoanRequest();
        getLoanHistory();
    }, [token]);


    async function postLoanRate() {

        if (!!token === false) {
            return;
        }

        setPostLoading(true);
        try {
            const response = await axios({
                url: `${EDUKE_URL}/edike/api/v1/percentage/saverate`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-admin-token': token
                },
                data: {
                    rate: loanRate
                }
            });
            
            setPostData(response.data.rate);
            setLoanRate('');
            toast.success(<p>Rate updated successfully.</p>);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                // console.log(err.response.data);
                toast.error(<p>{err.response.data.msg}</p>);
            }
        }
    }

    function setLoanRateHandler(e) {
        setLoanRate(e.target.value); // 
    }


    return (
        <>
            <ToastComponent />
            <DashBoardNav
                showSearchNav={false}
                navTitle='Loan Contract'
                onOpenSidebar={openSideBarHandler}
            />
            <div className={classes['loan-interest']}>
                <div className={classes['loan-interest__inner']}>
                    <h2>Loan Interest Rate (Monthly)</h2>
                    <div style={{fontSize: '2rem', marginTop: '2rem'}}>
                                Current Rate: {postData && (postData * 100)}%
                            </div>
                    <form
                        onSubmit={async e => {
                            e.preventDefault();
                            await postLoanRate();
                            await getLoanRequest();
                        }}
                        className={classes['interest-form']}>
                        <div className={classes['interest-control']}>
                            <label htmlFor='loanrate'>Rate</label>
                            <div className={classes['input-div']}>
                                <input autoComplete='off' value={loanRate} onChange={setLoanRateHandler} id='loanrate' type='text' placeholder={`e.g ${postData ? (postData * 100) : 5}`} />
                                <span>%</span>
                            </div>
                        </div>
                        <button className={classes['interest-btn']}>Update</button>
                    </form>

                    <h2>Rate History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Rate</th>
                                <th>Date Set</th>
                                <th>Set By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData &&  historyData.map(history => <tr key={history._id}>
                                <td>{parseInt(history.rate * 100, 10)}%</td>
                                <td>{new Date(history.createdAt).toLocaleString()}</td>
                                <td>{history.setBy}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
// 10th Oct 2022
export default LoanInterest;